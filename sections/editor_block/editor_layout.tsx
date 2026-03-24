"use client"

import { useState, useEffect } from "react"

import Sidebar from "./editor_sidebar"

import SlideshowSection from "../editor_sections/slideshow"
import BottomBannerSection from "../editor_sections/bottom_banner"
import MusicSection from "../editor_sections/music"
import VoiceScriptSection from "../editor_sections/voice_script"
import AIInputSection from "../editor_sections/ai_input"
import EndScreenSection from "../editor_sections/end_screen"
import QRCodeSection from "../editor_sections/qr_code"

import Timeline from "./editor_timeline"
import Player from "./editor_player"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const isAbsoluteUrl = (value: string | null | undefined) => {
  if (!value) return false
  return value.startsWith("http://") || value.startsWith("https://")
}

const resolveAssetUrl = (value: string | null | undefined) => {
  if (!value) return null

  if (isAbsoluteUrl(value)) {
    return value
  }

  const clean = value.replaceAll("\\", "/").replace(/^\/+/, "")
  return BACKEND_URL ? `${BACKEND_URL}/${clean}` : null
}

type BannerState = {
  logo: string | null
  companyName: string
  address: string
  phone: string
  website: string
  enabled: boolean
}

type EndScreenState = {
  logo: string | null
  offer: string
  companyName: string
  address: string
  phone: string
  website: string
  socialLinks: string[]
  enabled: boolean
}

export default function EditorLayout({
  assets,
  onOpenGenerateModal
}: any) {
  const [activePanel, setActivePanel] = useState("slideshow")

  const [slides, setSlides] = useState<(string | null)[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [playing, setPlaying] = useState(false)

  const [banner, setBanner] = useState<BannerState>({
    logo: null,
    companyName: "",
    address: "",
    phone: "",
    website: "",
    enabled: true
  })

  const [endScreen, setEndScreen] = useState<EndScreenState>({
    logo: null,
    offer: "",
    companyName: "",
    address: "",
    phone: "",
    website: "",
    socialLinks: [],
    enabled: true
  })

  const [qrEnabled, setQrEnabled] = useState(true)
  const [qrUrl, setQrUrl] = useState("")

  const [availableVoices, setAvailableVoices] = useState<any[]>([])
  const [selectedMusic, setSelectedMusic] = useState<any>(null)
  const [musicVolume, setMusicVolume] = useState(0.12)
  const [musicEnabled, setMusicEnabled] = useState(true)

  const [selectedVoice, setSelectedVoice] = useState<any>(null)
  const [voiceVolume, setVoiceVolume] = useState(0.88)
  const [voiceScript, setVoiceScript] = useState("")
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  const [rendering, setRendering] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    setAvailableVoices(assets?.voices || [])
  }, [assets])

  useEffect(() => {
    if (availableVoices.length) {
      if (!selectedVoice) {
        setSelectedVoice(availableVoices[0])
        return
      }

      const matchedVoice = availableVoices.find(
        (v) => v.voice_name === selectedVoice.voice_name
      )

      if (matchedVoice) {
        setSelectedVoice(matchedVoice)
      } else {
        setSelectedVoice(availableVoices[0])
      }
    } else {
      setSelectedVoice(null)
    }
  }, [availableVoices])

  useEffect(() => {
    if (assets?.music?.length && !selectedMusic) {
      setSelectedMusic(assets.music[0])
    }
  }, [assets])

  useEffect(() => {
    if (assets?.script) {
      setVoiceScript(assets.script)
    }
  }, [assets])

  useEffect(() => {
    if (!assets) return

    const logoUrl = resolveAssetUrl(assets.logo)

    setBanner((prev) => ({
      ...prev,
      logo: logoUrl,
      companyName: assets.business_name || ""
    }))

    setEndScreen((prev) => ({
      ...prev,
      logo: logoUrl,
      companyName: assets.business_name || ""
    }))

    const website =
      assets.website ||
      assets.url ||
      assets.input_url ||
      ""

    if (website) {
      setQrUrl(website)
    }

  }, [assets])

  useEffect(() => {
    if (!assets) return

    const backendImages = assets.images || []

    const imageUrls = backendImages
      .map((img: string) => resolveAssetUrl(img))
      .filter(Boolean) as string[]

    const slideCount = 6

    let preparedSlides: (string | null)[] = imageUrls.slice(0, slideCount)

    while (preparedSlides.length < slideCount) {
      preparedSlides.push(null)
    }

    setSlides(preparedSlides)

  }, [assets])

  const handleDownload = async () => {
    try {
      if (!BACKEND_URL) {
        console.error("Backend URL is not configured")
        return
      }

      setRendering(true)
      setVideoUrl(null)

      const preparedSlides = slides.map((s, i) => ({
        index: i,
        url: s,
        isEmpty: !s
      }))

      const payload = {
        task_id: assets.task_id,
        variant_id: assets.variant_id,
        slides: preparedSlides,

        voice: {
          enabled: voiceEnabled,
          audio: voiceEnabled && selectedVoice
            ? resolveAssetUrl(selectedVoice.audio)
            : null,
          volume: voiceVolume,
          script: voiceScript
        },

        music: {
          enabled: musicEnabled,
          audio: musicEnabled && selectedMusic
            ? resolveAssetUrl(selectedMusic.audio)
            : null,
          volume: musicVolume
        },

        banner: { enabled: banner.enabled, data: banner },
        end_screen: { enabled: endScreen.enabled, data: endScreen },
        qr: { enabled: qrEnabled, url: qrUrl || null }
      }

      const res = await fetch(
        `${BACKEND_URL}/render-video/${assets.task_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )

      const data = await res.json()

      setRendering(false)

      if (data.video_url) {
        setVideoUrl(resolveAssetUrl(data.video_url))
      }

    } catch (err) {
      console.error("Render failed", err)
      setRendering(false)
    }
  }

  const handleDirectDownload = async () => {
    try {
      if (!videoUrl) return

      const response = await fetch(videoUrl)
      const blob = await response.blob()

      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = `ad_video_${assets?.task_id || "final"}.mp4`

      document.body.appendChild(link)
      link.click()
      link.remove()

      window.URL.revokeObjectURL(blobUrl)

    } catch (err) {
      console.error("Download failed", err)
    }
  }

  return (
    <div className="flex h-full bg-[#0f172a] text-white">

      {rendering && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#020617] border border-[#1e293b] px-10 py-8 rounded-lg text-center shadow-xl">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-300">
              Making your video... Please wait
            </p>
          </div>
        </div>
      )}

      {videoUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-4 shadow-xl">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-[800px] rounded"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setVideoUrl(null)}
                className="text-gray-300 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={handleDirectDownload}
                className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />

      <div className="w-[320px] h-full border-r border-[#1e293b] overflow-y-auto">
        {activePanel === "slideshow" && (
          <SlideshowSection
            taskId={assets.task_id}
            variantId={assets.variant_id}
            slides={slides}
            setSlides={setSlides}
            websiteImages={assets?.images || []}
          />
        )}

        {activePanel === "banner" && (
  <BottomBannerSection
    banner={banner}
    setBanner={(updatedBanner) =>
      setBanner({
        logo: updatedBanner.logo ?? null,
        companyName: updatedBanner.companyName ?? "",
        address: updatedBanner.address ?? "",
        phone: updatedBanner.phone ?? "",
        website: updatedBanner.website ?? "",
        enabled: updatedBanner.enabled ?? true
      })
    }
  />
)}


        {activePanel === "end" && (
  <EndScreenSection
    endScreen={endScreen}
    setEndScreen={(updatedEndScreen) =>
      setEndScreen({
        logo: updatedEndScreen.logo ?? null,
        offer: updatedEndScreen.offer ?? "",
        companyName: updatedEndScreen.companyName ?? "",
        address: updatedEndScreen.address ?? "",
        phone: updatedEndScreen.phone ?? "",
        website: updatedEndScreen.website ?? "",
        socialLinks: updatedEndScreen.socialLinks ?? [],
        enabled: updatedEndScreen.enabled ?? true
      })
    }
  />
)}

        {activePanel === "qr" && (
          <QRCodeSection
            qrEnabled={qrEnabled}
            setQrEnabled={setQrEnabled}
            qrUrl={qrUrl}
            setQrUrl={setQrUrl}
          />
        )}

        {activePanel === "music" && (
          <MusicSection
            musics={assets?.music || []}
            selectedMusic={selectedMusic}
            setSelectedMusic={setSelectedMusic}
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
            musicEnabled={musicEnabled}
            setMusicEnabled={setMusicEnabled}
          />
        )}

        {activePanel === "voice" && (
          <VoiceScriptSection
            taskId={assets.task_id}
            variantId={assets.variant_id}
            voices={availableVoices}
            setVoices={setAvailableVoices}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
            voiceVolume={voiceVolume}
            setVoiceVolume={setVoiceVolume}
            voiceScript={voiceScript}
            setVoiceScript={setVoiceScript}
            voiceEnabled={voiceEnabled}
            setVoiceEnabled={setVoiceEnabled}
          />
        )}

        {activePanel === "ai" && (
          <AIInputSection onOpenGenerateModal={onOpenGenerateModal} />
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-start p-8 relative">
        <Player
          slides={slides}
          currentSlide={currentSlide}
          selectedVoice={selectedVoice}
          banner={banner.enabled ? banner : null}
          endScreen={endScreen.enabled ? endScreen : null}
          qr={qrEnabled && qrUrl ? qrUrl : null}
          music={musicEnabled && selectedMusic ? [selectedMusic] : []}
          musicVolume={musicVolume}
          voiceVolume={voiceVolume}
          voiceEnabled={voiceEnabled}
          playing={playing}
        />

        <Timeline
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          playing={playing}
          setPlaying={setPlaying}
        />

        <div className="absolute bottom-8 right-10">
          <button
            onClick={handleDownload}
            className="bg-indigo-600 px-6 py-3 rounded hover:bg-indigo-700 transition shadow-lg"
          >
            Download Video
          </button>
        </div>
      </div>
    </div>
  )
}