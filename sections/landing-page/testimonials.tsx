"use client"

import { useState, useEffect } from "react"

const testimonials = [
  { name: "Sarah Johnson", stars: 5, review: "This platform transformed how we create ads. In seconds we had a professional campaign ready." },
  { name: "Michael Lee", stars: 5, review: "Our marketing team saves hours every week using this AI ad generator." },
  { name: "Priya Sharma", stars: 4, review: "Very intuitive and the results look professional." },
  { name: "David Brown", stars: 5, review: "The best AI marketing tool we've used so far." },
  { name: "Anna Martinez", stars: 5, review: "The automatic voiceover feature is incredible." },
  { name: "James Wilson", stars: 4, review: "Simple, fast, and extremely effective for small businesses." },

  { name: "Olivia Carter", stars: 5, review: "Amazing results with very little effort." },
  { name: "Daniel Garcia", stars: 5, review: "Our social ads improved dramatically." },
  { name: "Sophia Patel", stars: 4, review: "The AI script generation is surprisingly good." },
  { name: "Liam Thompson", stars: 5, review: "A must-have tool for marketing teams." },
  { name: "Noah Davis", stars: 5, review: "Incredibly easy to use." },
  { name: "Emma Rodriguez", stars: 4, review: "Great value for the price." },

  { name: "Ava Kim", stars: 5, review: "Our agency uses this for multiple clients." },
  { name: "Ethan Walker", stars: 4, review: "The automation saves so much time." },
  { name: "Mia Anderson", stars: 5, review: "Professional ads in seconds." },
  { name: "Lucas White", stars: 5, review: "The QR code slide is genius." },
  { name: "Isabella Hall", stars: 4, review: "Really helpful for quick campaigns." },
  { name: "Logan Young", stars: 5, review: "Great design and great results." },

  { name: "Amelia King", stars: 5, review: "Our team loves using it daily." },
  { name: "Benjamin Scott", stars: 4, review: "Very polished product." },
  { name: "Charlotte Green", stars: 5, review: "We saw immediate marketing improvements." },
  { name: "Henry Baker", stars: 5, review: "Best AI tool for ad creation." },
  { name: "Ella Nelson", stars: 4, review: "Very user friendly." },
  { name: "Jack Carter", stars: 5, review: "Highly recommend for startups." }
]

export default function Testimonials() {
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  const slides = []
  for (let i = 0; i < testimonials.length; i += 6) {
    slides.push(testimonials.slice(i, i + 6))
  }

  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [paused, slides.length])

  return (
    <section className="w-full py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <p className="mt-4 text-gray-600">
            Trusted by marketers, founders, and agencies worldwide.
          </p>
        </div>

        <div
          className="mt-16 grid md:grid-cols-3 gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {slides[slide].map((t, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white text-sm font-bold shadow-sm">
                {t.name.charAt(0)}
              </div>

              <p className="mt-4 text-lg font-semibold text-slate-900">
                {t.name}
              </p>

              <div className="mt-2 text-yellow-400 text-lg tracking-wide">
                {"★".repeat(t.stars)}
              </div>

              <div className="mt-5 rounded-xl border border-white/80 bg-white/70 px-4 py-4 backdrop-blur-sm">
                <p className="text-slate-600 leading-7">
                  {t.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}