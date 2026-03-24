"use client"

import { useEffect, useState } from "react"

export default function VisualDemo() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const slides = [
    {
      eyebrow: "Fast Workflow",
      sectionBg: "from-white via-slate-50 to-blue-50",
      eyebrowClass:
        "border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-blue-800 to-sky-600 bg-clip-text text-transparent",
      title: (
        <>
          Turn Your Website into an Ad in Minutes{" "}
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            ⚡
          </span>
        </>
      ),
      description:
        "A clean workflow that takes you from website link to downloadable ads in no time.",
      content: (
        <div className="grid md:grid-cols-4 gap-5">
          <StepCard
            emoji="🌐"
            title="Enter Website"
            text="Paste your business URL and let the system start instantly."
          />
          <StepCard
            emoji="✨"
            title="Get Ad"
            text="The system creates a structured ad draft from your website."
          />
          <StepCard
            emoji="🎨"
            title="Edit"
            text="Customize visuals, script, voice, music, and branding."
          />
          <StepCard
            emoji="⬇️"
            title="Download Ad"
            text="Export a polished final ad ready to use for your business."
          />
        </div>
      )
    },
    {
      eyebrow: "Multiple Ads",
      sectionBg: "from-white via-violet-50 to-fuchsia-50",
      eyebrowClass:
        "border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50 text-violet-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-violet-800 to-fuchsia-600 bg-clip-text text-transparent",
      title: (
        <>
          One Website, Multiple Ads in Minutes{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            🚀
          </span>
        </>
      ),
      description:
        "Generate multiple creative content quickly so you can compare, test, and launch faster.",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            emoji="🧠"
            title="Different Concepts"
            text="Generate multiple ad styles and messaging ideas from the same site."
          />
          <FeatureCard
            emoji="⚙️"
            title="Faster Output"
            text="Skip repetitive manual work and move from idea to ad much faster."
          />
          <FeatureCard
            emoji="📈"
            title="Ready to Pushlish"
            text="Choose the strongest creative and use it for campaigns immediately."
          />
        </div>
      )
    },
    {
      eyebrow: "Creative Flexibility",
      sectionBg: "from-white via-emerald-50 to-teal-50",
      eyebrowClass:
        "border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-600 bg-clip-text text-transparent",
      title: (
        <>
          One Click Can Power Many Ads{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            🎬
          </span>
        </>
      ),
      description:
        "Use the same website to generate ad variations for offers, products, promotions, and brand storytelling.",
      content: (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MiniCard
            emoji="🏷️"
            title="Offer Ads"
            text="Promotions and limited-time campaigns."
          />
          <MiniCard
            emoji="🛍️"
            title="Product Ads"
            text="Highlight products with sharper visual focus."
          />
          <MiniCard
            emoji="🏢"
            title="Brand Ads"
            text="Showcase business identity and trust."
          />
          <MiniCard
            emoji="🎉"
            title="Seasonal Ads"
            text="Refresh creatives for events and occasions."
          />
        </div>
      )
    },
    {
      eyebrow: "Full Customization",
      sectionBg: "from-white via-amber-50 to-orange-50",
      eyebrowClass:
        "border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700",
      titleClass:
        "bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent",
      title: (
        <>
          Every Important Ad Element Is Customizable{" "}
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            🛠️
          </span>
        </>
      ),
      description:
        "The ad is system-generated, but you still control the important pieces before export.",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CustomCard emoji="🔳" title="Website QR" />
          <CustomCard emoji="🏷️" title="Branding" />
          <CustomCard emoji="🖼️" title="End Card" />
          <CustomCard emoji="🎵" title="Music" />
          <CustomCard emoji="🎙️" title="Voice" />
          <CustomCard emoji="✍️" title="Slides" />
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
              WHY CHOOSE US
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