"use client"

import { useState, useEffect, useRef } from "react"
import EditorBlock from "@/sections/editor_block/editor_block"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function Hero() {

  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const [editorStatus, setEditorStatus] =
    useState<"processing" | "ready" | "error">("processing")

  const [taskData, setTaskData] = useState<any>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)


  // ---------------- PARTICLES ----------------

  useEffect(() => {

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles:any[] = []

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      particles = []

      for (let i = 0; i < 220; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          alpha: Math.random(),
          flicker: Math.random() * 0.02
        })
      }
    }

    const animate = () => {

      ctx.clearRect(0,0,canvas.width,canvas.height)

      particles.forEach(p => {

        p.alpha += p.flicker

        if (p.alpha > 1 || p.alpha < 0.2) {
          p.flicker *= -1
        }

        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 4
        )

        gradient.addColorStop(0, `rgba(255,255,255,${p.alpha})`)
        gradient.addColorStop(1, "rgba(255,255,255,0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

      })

      requestAnimationFrame(animate)

    }

    init()
    animate()

  }, [])


  // ---------------- GENERATE ----------------

  const handleGenerate = async () => {

    if (!url || !BACKEND_URL) return

    setLoading(true)
    setEditorStatus("processing")
    setShowEditor(true)

    try {

      const response = await fetch(`${BACKEND_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      })

      const data = await response.json()

      setTaskData(data)
      setEditorStatus("ready")

    } catch {
      setEditorStatus("error")
    }

    setLoading(false)
  }


  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-90"
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">

          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Turn Your Website Into
            <br />
            Ready-to-Run Video Ads
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Paste a link, generate multiple ads, and customize each one effortlessly.
          </p>


          {/* SEARCH BAR */}

          <div className="mt-14 flex justify-center">

            <div className="relative w-full max-w-xl">

              {/* BORDER LIGHT */}

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none">

                <rect x="1" y="1" width="98" height="28" rx="6" fill="none" stroke="#222"/>

                <rect
  x="1"
  y="1"
  width="98"
  height="28"
  rx="6"
  fill="none"
  stroke="url(#grad)"
  strokeWidth="2.5"
  strokeDasharray="12 10"
  className="borderRun"
/>

                <defs>
                  <linearGradient id="grad">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="50%" stopColor="#a855f7"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>

              </svg>


              <div className="relative flex items-center bg-black/60 backdrop-blur-md rounded-xl bg-black/60 backdrop-blur-md rounded-xl overflow-hidden overflow-hidden">

                <input
                  id="hero-input"
                  type="text"
                  placeholder="Enter your website URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 px-6 py-4 bg-transparent text-white outline-none placeholder-gray-400"
                />

                <button
                  onClick={handleGenerate}
                  className="px-8 py-4 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-all duration-300"
                >
                  {loading ? "Generating..." : "Generate Ad"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {showEditor && (
        <EditorBlock
          onClose={() => setShowEditor(false)}
          status={editorStatus}
          data={taskData}
        />
      )}


      <style jsx>{`

        .borderRun {
          animation: move 3s linear infinite;
        }

        @keyframes move {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -100; }
}

        /* INPUT FOCUS ANIMATION */
        .focus-animate {
          animation: glowFocus 1.2s ease;
        }

        @keyframes glowFocus {
          0% { box-shadow: 0 0 0px rgba(59,130,246,0); }
          50% { box-shadow: 0 0 25px rgba(59,130,246,0.8); }
          100% { box-shadow: 0 0 0px rgba(59,130,246,0); }
        }

        input:focus {
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(168,85,247,0.6);
        }

      `}</style>

    </>
  )
}