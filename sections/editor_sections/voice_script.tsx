"use client"

import { useState, useEffect } from "react"

interface Props {
  taskId: number
  variantId: number
  voices: any[]
  setVoices: (voices: any[]) => void
  selectedVoice: any
  setSelectedVoice: (v: any) => void
  voiceVolume: number
  setVoiceVolume: (v: number) => void
  voiceScript: string
  setVoiceScript: (v: string) => void
  voiceEnabled: boolean
  setVoiceEnabled: (v: boolean) => void
}

export default function VoiceScriptSection({
  taskId,
  variantId,
  voices,
  setVoices,
  selectedVoice,
  setSelectedVoice,
  voiceVolume,
  setVoiceVolume,
  voiceScript,
  setVoiceScript,
  voiceEnabled,
  setVoiceEnabled
}: Props) {
  const [open, setOpen] = useState(false)
  const [localScript, setLocalScript] = useState(voiceScript)
  const [regenerating, setRegenerating] = useState(false)

  useEffect(() => {
    setLocalScript(voiceScript)
  }, [voiceScript])

  const isChanged = localScript.trim() !== voiceScript.trim()

  const getVoiceDisplayName = (voiceName?: string) => {
    const aliases: Record<string, string> = {
  v1: "Atlas: Male, Bold",
  v2: "Soren: Male, Smooth",
  v3: "Elara: Female, Soft",
  v4: "Zion: Male, Fast",
  v5: "Orion: Male, Deep"
}

    if (!voiceName) return "None"
    return aliases[voiceName] || voiceName
  }

  const handleUpdateScript = async () => {
    if (!localScript.trim() || !isChanged) return

    try {
      setRegenerating(true)

      const previousVoiceName = selectedVoice?.voice_name || null

      const res = await fetch(
        `http://127.0.0.1:8000/regenerate-voices/${taskId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            variant_id: variantId,
            script: localScript.trim()
          })
        }
      )

      const data = await res.json()

      if (!res.ok || data.error) {
        console.error("Voice regeneration failed:", data)
        alert(data.error || "Failed to update voices")
        setRegenerating(false)
        return
      }

      const updatedVoices = data.voices || []

      setVoiceScript(data.script || localScript.trim())
      setVoices(updatedVoices)

      if (updatedVoices.length > 0) {
        const matchedVoice =
          updatedVoices.find((v: any) => v.voice_name === previousVoiceName) ||
          updatedVoices[0]

        setSelectedVoice(matchedVoice)
      } else {
        setSelectedVoice(null)
      }

      setOpen(false)
      setRegenerating(false)

    } catch (err) {
      console.error("Voice regeneration request failed:", err)
      setRegenerating(false)
      alert("Something went wrong while regenerating voices")
    }
  }

  return (
    <div className="p-6 text-white h-full overflow-y-auto relative">

      {/* LOADER OVERLAY */}
      {regenerating && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 rounded">
          <div className="bg-[#020617] border border-[#1e293b] px-8 py-7 rounded-lg text-center shadow-xl w-[260px]">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-300">
              Updating script and regenerating voices...
            </p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-6">Voice</h2>

      {/* TOGGLE */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-300">Enable Voice</span>

        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`relative w-12 h-6 rounded-full transition ${
            voiceEnabled ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              voiceEnabled ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {!voiceEnabled ? null : (
        <>
          {/* CURRENT VOICE */}
          <div className="mb-4 text-sm text-gray-300">
            Current Voice:{" "}
            <span className="text-white font-semibold">
              {selectedVoice
                ? getVoiceDisplayName(selectedVoice.voice_name)
                : "None"}
            </span>
          </div>

          {/* CHANGE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="mb-4 w-full flex justify-between items-center px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 text-sm transition"
          >
            Change Voice
            <span>{open ? "▲" : "▼"}</span>
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="border border-[#1e293b] rounded mb-6 overflow-hidden">
              {voices.map((voice, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedVoice(voice)
                    setOpen(false)
                  }}
                  className="px-4 py-3 hover:bg-[#1e293b] cursor-pointer text-sm transition"
                >
                  {getVoiceDisplayName(voice.voice_name)}
                </div>
              ))}
            </div>
          )}

          {/* VOLUME */}
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-300">Volume</span>
            <span className="text-sm text-gray-400">
              {(voiceVolume * 100).toFixed(0)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={voiceVolume}
            onChange={(e) => setVoiceVolume(Number(e.target.value))}
            className="w-full mb-4"
          />

          {/* SCRIPT */}
          <textarea
            value={localScript}
            onChange={(e) => setLocalScript(e.target.value)}
            rows={8}
            className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 text-sm mb-4 rounded outline-none"
          />

          {/* UPDATE BUTTON */}
          <button
            disabled={!isChanged || regenerating}
            onClick={handleUpdateScript}
            className={`px-6 py-2 rounded text-sm transition ${
              isChanged && !regenerating
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {regenerating ? "Updating..." : "Update Script"}
          </button>
        </>
      )}
    </div>
  )
}