"use client"

import { useEffect, useState } from "react"

export default function ProcessingState() {

  const messages = [
    "Analyzing website structure...",
    "Extracting brand assets...",
    "Selecting best images...",
    "Generating ad script...",
    "Creating voice narration...",
    "Rendering cinematic video...",
    "Finalizing your video ad..."
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prev) => (prev + 1) % messages.length)

    }, 2500)

    return () => clearInterval(interval)

  }, [])

  return (

    <div className="w-full h-full flex flex-col items-center justify-center text-center">

      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-8"></div>

      <h2 className="text-2xl font-semibold mb-4">
        Creating Your AI Video Ad
      </h2>

      <p className="text-gray-500 text-lg">
        {messages[index]}
      </p>

      <p className="text-sm text-gray-400 mt-6">
        Please do not close this page
      </p>

    </div>

  )
}