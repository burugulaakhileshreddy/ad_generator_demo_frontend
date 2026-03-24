"use client"

import { useState, useRef, useEffect } from "react"

export default function EditorTimeline({
  slides,
  currentSlide,
  setCurrentSlide,
  playing,
  setPlaying
}: any) {

  const [progress, setProgress] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const slideCount = slides.length
  const total = slideCount + 1

  useEffect(() => {

    const audio = (window as any).editorVoice

    let raf: number
    let startTime: number | null = null

    const duration = audio?.duration || 30 // ✅ fallback duration

    const update = (time?: number) => {

      if (!playing) return

      // ---------------- AUDIO MODE ----------------
      if (audio) {

        const current = audio.currentTime
        const p = current / duration

        setProgress(p)

        const slideDuration = duration / slideCount
        const index = Math.floor(current / slideDuration)

        setCurrentSlide(Math.min(index, slideCount))

        if (!audio.paused) {
          raf = requestAnimationFrame(update)
        }

      }

      // ---------------- TIMER MODE ----------------
      else {

        if (!startTime) startTime = time || performance.now()

        const elapsed = ((time || performance.now()) - startTime) / 1000

        const p = elapsed / duration
        setProgress(p)

        const slideDuration = duration / slideCount
        const index = Math.floor(elapsed / slideDuration)

        setCurrentSlide(Math.min(index, slideCount))

        if (elapsed < duration) {
          raf = requestAnimationFrame(update)
        } else {
          setPlaying(false)
        }
      }
    }

    if (playing) {
      raf = requestAnimationFrame(update)
    }

    return () => cancelAnimationFrame(raf)

  }, [playing, slideCount, setCurrentSlide, setPlaying])


  // ---------------- CLICK JUMP ----------------
  const jumpTo = (index: number) => {

    const audio = (window as any).editorVoice
    const duration = audio?.duration || 30

    const slideDuration = duration / slideCount

    if (audio) {
      if (index === slideCount) {
        audio.currentTime = duration * 0.95
      } else {
        audio.currentTime = slideDuration * index
      }
    }

    setCurrentSlide(index)
    setProgress(index / slideCount)
  }

  return (

    <div className="w-[900px] mt-6">

      <div className="flex items-center gap-4">

        {/* PLAY BUTTON */}
        <button
          onClick={() => setPlaying(!playing)}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow"
        >
          {playing ? (
            <div className="flex gap-[3px]">
              <div className="w-[4px] h-4 bg-black"></div>
              <div className="w-[4px] h-4 bg-black"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-l-[10px] border-l-black border-y-[6px] border-y-transparent ml-1"></div>
          )}
        </button>

        {/* STRIP */}
        <div className="flex-1 relative" ref={trackRef}>

          <div className="flex h-[70px] rounded overflow-hidden">

            {Array.from({ length: total }).map((_, i) => {

              const isEnd = i === slideCount
              const slide = slides[i]

              return (
                <div
                  key={i}
                  onClick={() => jumpTo(i)}
                  className={`flex-1 cursor-pointer ${
                    currentSlide === i ? "ring-2 ring-red-500" : ""
                  }`}
                >

                  {isEnd ? (
                    <div className="w-full h-full bg-white flex items-center justify-center text-black font-semibold">
                      END
                    </div>
                  ) : slide ? (
                    <img src={slide} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                      Upload
                    </div>
                  )}

                </div>
              )
            })}

          </div>

          {/* RED LINE */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500"
            style={{ left: `${Math.min(progress * 100, 100)}%` }}
          />

        </div>

      </div>

    </div>
  )
}