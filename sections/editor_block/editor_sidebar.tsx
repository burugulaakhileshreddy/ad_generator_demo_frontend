"use client"

export default function Sidebar({
  setActivePanel,
  activePanel
}: {
  setActivePanel: (panel: string) => void
  activePanel: string
}) {

  const items = [
    { id: "slideshow", icon: "🎞️", label: "Slides" },
    { id: "banner", icon: "🏷️", label: "Banner" },
    { id: "end", icon: "🏁", label: "End Screen" },
    { id: "qr", icon: "📱", label: "QR Code" },
    { id: "music", icon: "🎵", label: "Music" },
    { id: "voice", icon: "🎙", label: "Voice" },
    { id: "ai", icon: "➕", label: "More Ads" }
  ]

  return (

    <div className="w-[160px] bg-[#020617] border-r border-[#1e293b] flex flex-col items-center py-6 space-y-6">

      {items.map((item, index) => {

        const active = activePanel === item.id

        return (

          <button
            key={`sidebar-${item.id}-${index}`}
            onClick={() => setActivePanel(item.id)}
            className={`flex flex-col items-center w-full py-3 transition
              ${active ? "text-indigo-400" : "text-gray-400 hover:text-white"}
            `}
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span className="text-xs mt-1">
              {item.label}
            </span>

          </button>

        )

      })}

    </div>

  )

}