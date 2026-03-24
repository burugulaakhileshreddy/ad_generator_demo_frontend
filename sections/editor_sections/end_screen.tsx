"use client"

import { ChangeEvent } from "react"

interface EndScreen {
  logo: string | null
  offer: string
  companyName: string
  address: string
  phone: string
  website: string
  socialLinks: string[]
  enabled: boolean
}

interface Props {
  endScreen: EndScreen
  setEndScreen: (data: EndScreen) => void
}

export default function EndScreenSection({
  endScreen,
  setEndScreen
}: Props) {

  const updateField = (key: keyof EndScreen, value: any) => {
    setEndScreen({
      ...endScreen,
      [key]: value
    })
  }

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)

    setEndScreen({
      ...endScreen,
      logo: url
    })
  }

  const updateSocial = (index: number, value: string) => {
    const updated = [...endScreen.socialLinks]
    updated[index] = value
    setEndScreen({ ...endScreen, socialLinks: updated })
  }

  const addSocial = () => {
    if (endScreen.socialLinks.length >= 4) return
    setEndScreen({
      ...endScreen,
      socialLinks: [...endScreen.socialLinks, ""]
    })
  }

  const removeSocial = (index: number) => {
    const updated = endScreen.socialLinks.filter((_, i) => i !== index)
    setEndScreen({ ...endScreen, socialLinks: updated })
  }

  return (

    // ✅ SCROLL ENABLED + SCROLLBAR HIDDEN
    <div className="h-full overflow-y-auto scroll-smooth p-6 text-white
                    [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

      <h2 className="text-xl font-semibold mb-6">
        End Screen
      </h2>

      {/* TOGGLE */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-300">
          Enable End Screen
        </span>

        <button
          onClick={() =>
            setEndScreen({ ...endScreen, enabled: !endScreen.enabled })
          }
          className={`relative w-12 h-6 rounded-full transition ${
            endScreen.enabled ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              endScreen.enabled ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {!endScreen.enabled ? null : (
        <>
          {/* OFFER */}
          <div className="mb-6">
            <label className="text-sm text-gray-300 mb-2 block">
              Offer / Headline
            </label>
            <input
              value={endScreen.offer}
              onChange={(e)=>updateField("offer",e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm"
            />
          </div>

          {/* LOGO */}
          <div className="mb-8">
            <p className="text-sm text-gray-300 mb-2">Logo</p>

            <div className="flex items-center gap-4">
              {endScreen.logo && (
                <img
                  src={endScreen.logo}
                  className="h-10 w-10 object-contain bg-white p-1 rounded"
                />
              )}

              <div className="flex flex-col text-sm">
                <span className="text-gray-300">Logo</span>
                <span className="text-gray-500 text-xs">
                  Upload your logo
                </span>
              </div>

              <label className="ml-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="cursor-pointer bg-[#1e293b] hover:bg-[#334155] px-4 py-2 rounded-md text-sm">
                  Upload
                </div>
              </label>
            </div>
          </div>

          {/* COMPANY INFO */}
          {["companyName","address","phone","website"].map((field) => (
            <div className="mb-6" key={field}>
              <label className="text-sm text-gray-300 mb-2 block capitalize">
                {field}
              </label>
              <input
                value={(endScreen as any)[field]}
                onChange={(e)=>updateField(field as any,e.target.value)}
                className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm"
              />
            </div>
          ))}

          {/* SOCIAL LINKS */}
          <div className="pb-16"> {/* ✅ bottom padding for smooth scroll end */}

            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-300">
                Social Links
              </label>

              <button
                onClick={addSocial}
                className="bg-indigo-600 px-2 py-1 text-xs rounded hover:bg-indigo-700"
              >
                + Add
              </button>
            </div>

            {endScreen.socialLinks.map((link, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={link}
                  onChange={(e)=>updateSocial(i,e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm"
                />

                <button
                  onClick={()=>removeSocial(i)}
                  className="text-red-400 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}

          </div>
        </>
      )}
    </div>
  )
}