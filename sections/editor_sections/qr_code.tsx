"use client"

interface QRProps {
  qrEnabled: boolean
  setQrEnabled: (v: boolean) => void
  qrUrl: string
  setQrUrl: (v: string) => void
}

export default function QRCodeSection({
  qrEnabled,
  setQrEnabled,
  qrUrl,
  setQrUrl
}: QRProps) {

  return (

    <div className="h-full overflow-y-auto scroll-smooth p-6 text-white
                    [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

      <h2 className="text-xl font-semibold mb-6">
        QR Code
      </h2>

      {/* TOGGLE */}
      <div className="flex items-center justify-between mb-6">

        <span className="text-sm text-gray-300">
          Enable QR Code
        </span>

        <button
          onClick={() => setQrEnabled(!qrEnabled)}
          className={`relative w-12 h-6 rounded-full transition ${
            qrEnabled ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              qrEnabled ? "translate-x-6" : ""
            }`}
          />
        </button>

      </div>

      {/* INPUT */}
      {!qrEnabled ? null : (

        <div className="pb-16">

          <label className="text-sm text-gray-300 mb-2 block">
            Website URL
          </label>

          <input
            value={qrUrl}
            onChange={(e) => setQrUrl(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm"
          />

          {!qrUrl && (
            <p className="text-red-500 text-xs mt-2">
              ● Enter a website URL
            </p>
          )}

        </div>

      )}

    </div>
  )
}