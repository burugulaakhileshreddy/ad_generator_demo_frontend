"use client"

export default function AIInputSection({
  onOpenGenerateModal
}: {
  onOpenGenerateModal?: () => void
}) {
  return (
    <div className="p-6 text-white h-full overflow-y-auto">
      <div className="rounded-2xl border border-[#1e293b] bg-[#020617] p-6 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-4">
          ✨
        </div>

        <h2 className="text-xl font-semibold mb-3">
          Generate More Ads
        </h2>

        <p className="text-gray-400 text-sm leading-6 mb-6">
          You can create multiple ads for your website with just one more click!
        </p>

        <button
          onClick={() => onOpenGenerateModal?.()}
          className="w-full px-5 py-3 rounded-lg text-sm font-medium transition shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          + Generate More Ads
        </button>

        <div className="mt-5 rounded-xl bg-[#0f172a] border border-[#1e293b] p-4">
          <p className="text-xs text-gray-400 leading-6">
            You can create following Ads:
            <br />
            1. Generate new system ad
            <br />
            2. Enter a custom ad prompt
          </p>
        </div>
      </div>
    </div>
  )
}