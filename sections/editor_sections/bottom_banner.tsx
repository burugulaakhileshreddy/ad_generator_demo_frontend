"use client"

import { ChangeEvent } from "react"

interface Banner {
  logo: string | null
  companyName: string
  address: string
  phone: string
  website: string
  enabled?: boolean
}

interface Props {
  banner: Banner
  setBanner: (banner: Banner) => void
}

export default function BottomBannerSection({
  banner,
  setBanner
}: Props) {

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)

    setBanner({
      ...banner,
      logo: url
    })
  }

  const updateField = (key: keyof Banner, value: string) => {
    setBanner({
      ...banner,
      [key]: value
    })
  }

  return (

    <div className="p-6 text-white h-full overflow-y-auto">

      <h2 className="text-xl font-semibold mb-6">
        Bottom banner
      </h2>


      {/* ✅ TOGGLE */}

      <div className="mb-6 flex items-center justify-between">

  <span className="text-sm text-gray-300">
    Enable Bottom Banner
  </span>

  <button
    onClick={() =>
      setBanner({ ...banner, enabled: !(banner.enabled ?? true) })
    }
    className={`relative w-12 h-6 rounded-full transition ${
      banner.enabled ? "bg-green-500" : "bg-gray-600"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
        banner.enabled ? "translate-x-6" : ""
      }`}
    />
  </button>

</div>


      {/* 🔒 HIDE IF DISABLED */}

      {!banner.enabled ? null : (

        <>
          {/* LOGO */}

          <div className="mb-8">

            <p className="text-sm text-gray-300 mb-2">
              Logo
            </p>

            <div className="flex items-center gap-4">

              {banner?.logo && (
                <img
                  src={banner.logo}
                  className="h-10 w-10 object-contain bg-white p-1 rounded"
                />
              )}

              <div className="flex flex-col text-sm">
                <span className="text-gray-300">
                  Logo detected
                </span>
                <span className="text-gray-500 text-xs">
                  You can upload your own logo.
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
                  Upload logo
                </div>

              </label>

            </div>

          </div>


          {/* COMPANY NAME */}

          <div className="mb-6">

            <label className="text-sm text-gray-300 mb-2 block">
              Company name
            </label>

            <input
              value={banner.companyName}
              onChange={(e)=>updateField("companyName",e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm"
            />

          </div>


          {/* ADDRESS */}

          <div className="mb-6">

            <label className="text-sm text-gray-300 mb-2 block">
              Address
            </label>

            <input
              value={banner.address}
              onChange={(e)=>updateField("address",e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm"
            />

          </div>


          {/* PHONE */}

          <div className="mb-6">

            <label className="text-sm text-gray-300 mb-2 block">
              Phone
            </label>

            <input
              value={banner.phone}
              onChange={(e)=>updateField("phone",e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm"
            />

          </div>


          {/* WEBSITE */}

          <div>

            <label className="text-sm text-gray-300 mb-2 block">
              Website
            </label>

            <input
              value={banner.website}
              onChange={(e)=>updateField("website",e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm"
            />

          </div>

        </>
      )}

    </div>
  )
}