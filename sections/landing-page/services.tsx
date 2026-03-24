"use client"

import { useEffect, useState } from "react"

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 8)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const slides = [
    {
      eyebrow: "How It Works",
      sectionBg: "from-white via-slate-50 to-blue-50",
      eyebrowClass:
        "border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-blue-800 to-sky-600 bg-clip-text text-transparent",
      title: (
        <>
          A Complete AI Ad Workflow{" "}
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            ⚙️
          </span>
        </>
      ),
      description:
        "From website input to final export, the platform handles every important step in a structured and scalable workflow.",
      content: (
        <div className="grid md:grid-cols-4 gap-5">
          <StepCard emoji="🌐" title="Website Input" text="Start with your business website." />
          <StepCard emoji="🧠" title="AI Processing" text="Extract, understand, and generate content." />
          <StepCard emoji="🎨" title="Customize" text="Adjust visuals, voice, music, and structure." />
          <StepCard emoji="🎬" title="Export Video" text="Download a polished final ad." />
        </div>
      )
    },
    {
      eyebrow: "Web Scraping",
      sectionBg: "from-white via-cyan-50 to-sky-50",
      eyebrowClass:
        "border-cyan-200 bg-gradient-to-r from-cyan-50 to-sky-50 text-cyan-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-cyan-800 to-sky-600 bg-clip-text text-transparent",
      title: (
        <>
          Smart Website Scraping{" "}
          <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
            🌐
          </span>
        </>
      ),
      description:
        "The system scans your website and pulls the most useful visual and brand information needed to build ad creatives automatically.",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            emoji="🖼️"
            title="Image Extraction"
            text="Collects useful product and business visuals from your site."
          />
          <FeatureCard
            emoji="📝"
            title="Text Detection"
            text="Understands headlines, descriptions, and important brand text."
          />
          <FeatureCard
            emoji="🏷️"
            title="Brand Capture"
            text="Finds logo, colors, and identity elements for ad creation."
          />
        </div>
      )
    },
    {
      eyebrow: "Ad Script Generation",
      sectionBg: "from-white via-violet-50 to-fuchsia-50",
      eyebrowClass:
        "border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50 text-violet-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-violet-800 to-fuchsia-600 bg-clip-text text-transparent",
      title: (
        <>
          AI Ad Script Generation{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            🧠
          </span>
        </>
      ),
      description:
        "Based on your website content, the system creates ad-ready messaging that is short, structured, and suitable for video narration.",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            emoji="✍️"
            title="Smart Copy"
            text="Creates concise and relevant ad copy from website content."
          />
          <FeatureCard
            emoji="🎯"
            title="Focused Messaging"
            text="Highlights core offers, value, and business positioning."
          />
          <FeatureCard
            emoji="📣"
            title="Ad-Ready Tone"
            text="Generates script lines designed for promotional storytelling."
          />
        </div>
      )
    },
    {
      eyebrow: "Human Voice Creation",
      sectionBg: "from-white via-emerald-50 to-teal-50",
      eyebrowClass:
        "border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-600 bg-clip-text text-transparent",
      title: (
        <>
          Human-Like Voice Creation{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            🎙️
          </span>
        </>
      ),
      description:
        "The generated script is converted into natural-sounding voiceovers so the ad feels polished and presentation-ready.",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            emoji="🗣️"
            title="Natural Delivery"
            text="Voices sound smooth and suitable for real ad narration."
          />
          <FeatureCard
            emoji="🎚️"
            title="Brand Fit"
            text="Voice style can align with the brand’s presentation tone."
          />
          <FeatureCard
            emoji="⚡"
            title="Fast Generation"
            text="Voiceovers are created quickly for multiple ad variations."
          />
        </div>
      )
    },
    {
      eyebrow: "Music",
      sectionBg: "from-white via-pink-50 to-rose-50",
      eyebrowClass:
        "border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-pink-800 to-rose-600 bg-clip-text text-transparent",
      title: (
        <>
          Background Music for Ads{" "}
          <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            🎵
          </span>
        </>
      ),
      description:
        "Music helps shape the final feel of the creative and gives the video a more complete advertising presence.",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            emoji="🎼"
            title="Mood Building"
            text="Adds the right energy and emotional tone to the ad."
          />
          <FeatureCard
            emoji="🔊"
            title="Balanced Audio"
            text="Works alongside voiceover without overpowering it."
          />
          <FeatureCard
            emoji="✨"
            title="Professional Finish"
            text="Makes the final creative feel more polished and complete."
          />
        </div>
      )
    },
    {
      eyebrow: "Video Creation",
      sectionBg: "from-white via-amber-50 to-orange-50",
      eyebrowClass:
        "border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent",
      title: (
        <>
          Automatic Video Creation{" "}
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            🎬
          </span>
        </>
      ),
      description:
        "The system combines visuals, script, voice, music, and structure into a complete ad-ready video draft automatically.",
      content: (
        <div className="grid md:grid-cols-4 gap-5">
          <MiniCard emoji="🖼️" title="Slides" text="Visual scenes are arranged automatically." />
          <MiniCard emoji="🎙️" title="Voice" text="Narration is synchronized with content." />
          <MiniCard emoji="🎵" title="Music" text="Audio is layered for stronger presentation." />
          <MiniCard emoji="📹" title="Video Draft" text="A ready-to-edit ad is produced." />
        </div>
      )
    },
    {
      eyebrow: "User Edits",
      sectionBg: "from-white via-lime-50 to-green-50",
      eyebrowClass:
        "border-lime-200 bg-gradient-to-r from-lime-50 to-green-50 text-lime-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-lime-800 to-green-600 bg-clip-text text-transparent",
      title: (
        <>
          User Controls the Final Touches{" "}
          <span className="bg-gradient-to-r from-lime-600 to-green-500 bg-clip-text text-transparent">
            🎨
          </span>
        </>
      ),
      description:
        "After the system creates the draft, users can refine the important parts to better match the brand and campaign goal.",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CustomCard emoji="🖼️" title="Slides" />
          <CustomCard emoji="✍️" title="Script" />
          <CustomCard emoji="🎙️" title="Voice" />
          <CustomCard emoji="🎵" title="Music" />
          <CustomCard emoji="🏷️" title="Branding" />
          <CustomCard emoji="🔳" title="QR Code" />
        </div>
      )
    },
    {
      eyebrow: "Final Video Creation",
      sectionBg: "from-white via-indigo-50 to-blue-50",
      eyebrowClass:
        "border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-indigo-800 to-blue-600 bg-clip-text text-transparent",
      title: (
        <>
          Final Video Ready for Download{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            🚀
          </span>
        </>
      ),
      description:
        "Once edits are complete, the system renders the final polished ad video so it is ready to use, share, or publish.",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            emoji="✅"
            title="Final Render"
            text="All selected edits are combined into the final output."
          />
          <FeatureCard
            emoji="📦"
            title="Ready to Use"
            text="The ad is export-ready for campaigns, sharing, and publishing."
          />
          <FeatureCard
            emoji="⚡"
            title="Fast Delivery"
            text="Move from website to final ad with a streamlined workflow."
          />
        </div>
      )
    }
  ]

  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-sky-600 bg-clip-text text-transparent">
              WHAT WE DO
            </span>
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 shadow-[0_20px_80px_rgba(15,23,42,0.08)] min-h-[560px]">
          <div
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`min-w-full px-6 md:px-10 lg:px-14 py-12 md:py-14 flex items-center bg-gradient-to-br ${slide.sectionBg}`}
              >
                <div className="w-full">
                  <div className="max-w-3xl">
                    <div
                      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] shadow-sm ${slide.eyebrowClass}`}
                    >
                      {slide.eyebrow}
                    </div>

                    <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                      <span className={slide.titleClass}>{slide.title}</span>
                    </h2>

                    <p className="mt-5 text-lg md:text-xl leading-8 text-slate-600 max-w-2xl">
                      {slide.description}
                    </p>
                  </div>

                  <div className="mt-12 rounded-[28px] border border-white/70 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-sm">
                    {slide.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-70" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-sky-100 blur-3xl opacity-70" />
        </div>
      </div>
    </section>
  )
}

function StepCard({
  emoji,
  title,
  text
}: {
  emoji: string
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
        {emoji}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  )
}

function FeatureCard({
  emoji,
  title,
  text
}: {
  emoji: string
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
        {emoji}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  )
}

function MiniCard({
  emoji,
  title,
  text
}: {
  emoji: string
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="text-3xl">{emoji}</div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  )
}

function CustomCard({
  emoji,
  title
}: {
  emoji: string
  title: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
        {emoji}
      </div>
      <p className="mt-3 text-sm font-medium text-slate-800">{title}</p>
    </div>
  )
}