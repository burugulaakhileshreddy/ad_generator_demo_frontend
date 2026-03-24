"use client"

export default function ReadyState({
  onOpenEditor
}: {
  onOpenEditor: () => void
}) {

  return (

    <div className="w-full h-full flex flex-col items-center justify-center text-center">

      {/* success icon */}
      <div className="text-green-500 text-6xl mb-6">
        ✔
      </div>

      <h2 className="text-3xl font-semibold mb-4">
        Your Ad Is Ready
      </h2>

      <p className="text-gray-500 mb-8">
        Your AI generated video is ready for editing
      </p>

      <button
        onClick={onOpenEditor}
        className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700"
      >
        Open Editor
      </button>

    </div>

  )
}