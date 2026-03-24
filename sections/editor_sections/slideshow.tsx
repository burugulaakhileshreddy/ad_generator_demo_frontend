"use client"

import { useState, useEffect } from "react"

interface Props {
  taskId: number
  variantId: number
  slides?: (string | null)[]
  setSlides: (slides: (string | null)[]) => void
  websiteImages?: string[]
}

export default function SlideshowSection({
  taskId,
  variantId,
  slides,
  setSlides,
  websiteImages
}: Props) {
  const [showModal, setShowModal] = useState(false)
  const [activeSlide, setActiveSlide] = useState<number | null>(null)
  const [showDiscover, setShowDiscover] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const [audioDuration, setAudioDuration] = useState(30)

  const safeSlides = slides || []
  const safeWebsiteImages = websiteImages || []

  useEffect(() => {
    const audio = (window as any).editorVoice as HTMLAudioElement
    if (!audio) return

    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setAudioDuration(audio.duration)
      }
    }

    audio.addEventListener("loadedmetadata", updateDuration)
    updateDuration()

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const slideDuration = safeSlides.length ? audioDuration / safeSlides.length : 0

  const freeImageSites = [
    { name: "Unsplash", url: "https://unsplash.com" },
    { name: "Pexels", url: "https://pexels.com" },
    { name: "Pixabay", url: "https://pixabay.com" },
    { name: "Freepik", url: "https://freepik.com" },
    { name: "Burst (Shopify)", url: "https://burst.shopify.com" }
  ]

  return (
    <div className="p-6 text-white h-full overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <h2 className="text-xl font-semibold mb-6">
        Slideshow
      </h2>

      {/* SLIDES LIST */}
      <div className="flex flex-col gap-3">
        {safeSlides.map((image, index) => {
          const start = Math.round(index * slideDuration)

          const end =
            index === safeSlides.length - 1
              ? Math.round(audioDuration)
              : Math.round((index + 1) * slideDuration)

          return (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e293b] transition"
            >
              <div className="relative w-[72px] h-[46px] rounded-md overflow-hidden flex-shrink-0">
                {image ? (
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                    Upload
                  </div>
                )}

                <button
                  onClick={() => {
                    setActiveSlide(index)
                    setShowModal(true)
                  }}
                  className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-sm transition"
                >
                  Change
                </button>
              </div>

              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">
                  Image #{index + 1}
                </span>

                <span className="text-gray-400 text-xs">
                  from {start} to {end} seconds
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* DISCOVER */}
      <div className="mt-8 border-t border-[#1e293b] pt-4">
        <p className="text-sm text-gray-400 mb-2">
          Need more images or videos?
        </p>

        <div className="relative">
          <button
            onClick={() => setShowDiscover(!showDiscover)}
            className="text-blue-400 text-sm flex items-center gap-1 hover:text-blue-300"
          >
            Discover
            <span className={`transition ${showDiscover ? "rotate-180" : ""}`}>
              ▲
            </span>
          </button>

          {showDiscover && (
            <div className="absolute bottom-full mb-2 w-[220px] bg-[#020617] border border-[#1e293b] rounded-lg shadow-lg max-h-[180px] overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {freeImageSites.map((site) => (
                <button
                  key={site.name}
                  onClick={() => window.open(site.url, "_blank")}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[#1e293b] transition"
                >
                  {site.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#020617] w-[600px] rounded-xl border border-[#1e293b] p-6">
            <h3 className="text-lg font-semibold mb-6">
              Change Slide Image
            </h3>

            {/* SCRAPED WEBSITE IMAGES */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">
                Select images from website
              </p>

              <div className="grid grid-cols-4 gap-3">
                {safeWebsiteImages.map((img, i) => {
                  const fullUrl = `http://127.0.0.1:8000/${img
                    .replace(/^\/+/, "")
                    .replaceAll("\\", "/")}`

                  return (
                    <img
                      key={i}
                      src={fullUrl}
                      onClick={() => {
                        setSelectedImage(fullUrl)
                        setUploadedImage(null)
                      }}
                      className={`h-[70px] w-full object-cover rounded-md cursor-pointer border-2 transition ${
                        selectedImage === fullUrl ? "border-blue-500" : "border-transparent"
                      }`}
                      alt={`Website image ${i + 1}`}
                    />
                  )
                })}
              </div>
            </div>

            {/* UPLOAD */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">
                Upload from device
              </p>

              <div className="border border-dashed border-[#1e293b] rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    const form = new FormData()
                    form.append("file", file)

                    try {
                      const res = await fetch(
                        `http://127.0.0.1:8000/upload-image/${taskId}/${variantId}`,
                        {
                          method: "POST",
                          body: form
                        }
                      )

                      const data = await res.json()

                      if (data.image_url) {
                        const full = `http://127.0.0.1:8000${data.image_url}`
                        setUploadedImage(full)
                        setSelectedImage(null)
                      }
                    } catch (err) {
                      console.error("Upload failed", err)
                    }
                  }}
                  className="text-sm text-gray-300"
                />

                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    className="mt-4 h-[80px] mx-auto rounded-md"
                    alt="Uploaded preview"
                  />
                )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedImage(null)
                  setUploadedImage(null)
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const newImage = uploadedImage || selectedImage

                  if (!newImage || activeSlide === null) return

                  const updatedSlides = [...safeSlides]
                  updatedSlides[activeSlide] = newImage

                  setSlides(updatedSlides)

                  setShowModal(false)
                  setSelectedImage(null)
                  setUploadedImage(null)
                }}
                className="px-4 py-2 bg-blue-600 rounded-md text-sm hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}