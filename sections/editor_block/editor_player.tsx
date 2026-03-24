"use client"

import { useEffect, useMemo, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"

export default function Player({
  slides,
  currentSlide,
  selectedVoice,
  music = [],
  banner,
  endScreen,
  qr,
  musicVolume = 0.12,
  voiceVolume = 0.88,
  voiceEnabled = true,
  playing
}: any) {
  const voiceRef = useRef<HTMLAudioElement | null>(null)
  const musicRef = useRef<HTMLAudioElement | null>(null)

  const slide = slides?.[currentSlide]

  const normalizeUrl = (value?: string | null) => {
    if (!value) return null
    if (
      value.startsWith("blob:") ||
      value.startsWith("data:") ||
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value
    }
    return `http://127.0.0.1:8000${value.startsWith("/") ? value : `/${value}`}`
  }

  const voiceUrl =
    voiceEnabled && selectedVoice?.audio
      ? normalizeUrl(selectedVoice.audio)
      : null

  const musicUrl =
    music.length > 0 && music[0]?.audio
      ? normalizeUrl(music[0].audio)
      : null

  const logoSrc = useMemo(() => normalizeUrl(banner?.logo), [banner?.logo])
  const endLogoSrc = useMemo(() => normalizeUrl(endScreen?.logo), [endScreen?.logo])

  // ---------------- AUDIO CONTROL ----------------
  useEffect(() => {
    if (voiceRef.current) voiceRef.current.volume = voiceVolume
    if (musicRef.current) musicRef.current.volume = musicVolume
  }, [voiceVolume, musicVolume])

  useEffect(() => {
    const voice = voiceRef.current
    const musicEl = musicRef.current

    if (playing) {
      voice?.play().catch(() => {})
      musicEl?.play().catch(() => {})
    } else {
      voice?.pause()
      musicEl?.pause()
    }
  }, [playing, voiceUrl, musicUrl])

  const showEnd = currentSlide === slides.length

  return (
    <div className="w-full flex justify-center">
      <div className="w-[900px] h-[420px] rounded-xl overflow-hidden shadow-xl relative bg-black">
        {/* ---------------- SLIDES ---------------- */}
        {!showEnd && (
          slide ? (
            <img
              key={currentSlide}
              src={slide}
              className="w-full h-full object-cover animate-slideFade"
              alt={`Slide ${currentSlide + 1}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Upload Image
            </div>
          )
        )}

        {/* ---------------- END SCREEN ---------------- */}
        {showEnd && endScreen && (
          <div className="absolute inset-0 bg-white flex flex-col justify-between p-10 animate-fadeIn">
            <div className="text-center">
              {endScreen.offer && (
                <h2 className="text-4xl font-bold text-purple-600 mb-4 animate-pop">
                  {endScreen.offer}
                </h2>
              )}

              {endLogoSrc && (
                <img
                  src={endLogoSrc}
                  className="h-20 mx-auto mb-4 animate-fadeUp delay-100"
                  alt="End screen logo"
                />
              )}

              {endScreen.companyName && (
                <h3 className="text-2xl font-semibold text-gray-900 animate-fadeUp delay-200">
                  {endScreen.companyName}
                </h3>
              )}

              {endScreen.address && (
                <p className="text-gray-500 mt-2 animate-fadeUp delay-300">
                  {endScreen.address}
                </p>
              )}

              {endScreen.phone && (
                <p className="text-lg font-medium text-indigo-600 mt-2 animate-fadeUp delay-400">
                  {endScreen.phone}
                </p>
              )}

              {endScreen.website && (
                <p className="text-gray-400 mt-1 text-sm animate-fadeUp delay-500">
                  {endScreen.website}
                </p>
              )}
            </div>

            {endScreen.socialLinks?.length > 0 && (
              <div className="flex justify-center gap-6 text-sm text-gray-600 animate-fadeUp delay-700">
                {endScreen.socialLinks.map((s: string, i: number) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------- QR ---------------- */}
        {qr && !showEnd && (
          <div className="absolute top-4 right-4 bg-white p-2 rounded-[6px] shadow-[0_8px_22px_rgba(0,0,0,0.22)] animate-fadeIn z-20">
            <QRCodeSVG value={qr} size={80} />
          </div>
        )}

        {/* ---------------- BOTTOM BRANDING ---------------- */}
        {banner?.enabled && !showEnd && (
          <div className="absolute left-4 bottom-4 z-10 animate-fadeIn max-w-[48%]">
            <div className="flex items-end gap-3">
              {logoSrc && (
                <div className="h-[82px] w-[82px] shrink-0 rounded-[4px] overflow-hidden bg-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] ring-1 ring-black/10">
                  <img
                    src={logoSrc}
                    alt="Banner logo"
                    className="h-full w-full object-contain p-[6px]"
                  />
                </div>
              )}

              <div className="min-w-0 h-[82px] flex flex-col justify-start">
                {banner.companyName && (
                  <div className="text-white text-[20px] leading-[1.02] font-semibold tracking-[-0.02em] truncate brandTitleShadow">
                    {banner.companyName}
                  </div>
                )}

                <div className="mt-1.5 flex flex-col gap-[4px] min-w-0">
                  {banner.address && (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[12px] leading-none shrink-0">📍</span>
                      <span className="text-[12px] leading-[1.15] text-white/92 truncate brandMetaShadow">
                        {banner.address}
                      </span>
                    </div>
                  )}

                  {banner.phone && (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[12px] leading-none shrink-0">📞</span>
                      <span className="text-[12px] leading-[1.15] text-white/88 truncate brandMetaShadow">
                        {banner.phone}
                      </span>
                    </div>
                  )}

                  {banner.website && (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[12px] leading-none shrink-0">🌐</span>
                      <span className="text-[12px] leading-[1.15] text-white/84 truncate brandMetaShadow">
                        {banner.website}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- AUDIO ---------------- */}
        {voiceUrl && (
          <audio
            ref={(el) => {
              voiceRef.current = el
              ;(window as any).editorVoice = el
            }}
            src={voiceUrl}
          />
        )}

        {musicUrl && (
          <audio ref={musicRef} src={musicUrl} loop />
        )}
      </div>

      {/* ---------------- ANIMATIONS ---------------- */}
      <style jsx>{`
        .animate-slideFade {
          animation: slideFade 0.6s ease-in-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.45s ease forwards;
        }

        .animate-pop {
          animation: pop 0.5s ease;
        }

        .animate-fadeUp {
          animation: fadeUp 0.5s ease forwards;
        }

        .brandTitleShadow {
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.46),
            0 4px 14px rgba(0, 0, 0, 0.28);
        }

        .brandMetaShadow {
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.38),
            0 3px 10px rgba(0, 0, 0, 0.22);
        }

        .delay-100 { animation-delay: 0.1s }
        .delay-200 { animation-delay: 0.2s }
        .delay-300 { animation-delay: 0.3s }
        .delay-400 { animation-delay: 0.4s }
        .delay-500 { animation-delay: 0.5s }
        .delay-700 { animation-delay: 0.7s }

        @keyframes slideFade {
          from { opacity: 0; transform: scale(1.04) }
          to { opacity: 1; transform: scale(1) }
        }

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        @keyframes pop {
          0% { transform: scale(0.9); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) }
          to { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </div>
  )
}