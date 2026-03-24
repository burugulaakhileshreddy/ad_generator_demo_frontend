"use client"

import { useState } from "react"

interface Props {
  musics: any[]
  selectedMusic: any
  setSelectedMusic: (m: any) => void
  musicVolume: number
  setMusicVolume: (v: number) => void
  musicEnabled: boolean
  setMusicEnabled: (v: boolean) => void
}

export default function MusicSection({
  musics,
  selectedMusic,
  setSelectedMusic,
  musicVolume,
  setMusicVolume,
  musicEnabled,
  setMusicEnabled
}: Props) {
  const [open, setOpen] = useState(false)

  const getMusicDisplayName = (musicName?: string) => {
    const aliases: Record<string, string> = {
      music_1: "Just Relax",
      music_2: "Old Manhattan",
      music_3: "Tranquil Melody",
      music_4: "Meyham Beats",
      music_5: "The Papi"
    }

    if (!musicName) return "None"
    return aliases[musicName] || musicName
  }

  return (
    <div className="p-6 text-white h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Music</h2>

      {/* TOGGLE */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-300">Enable Music</span>

        <button
          onClick={() => setMusicEnabled(!musicEnabled)}
          className={`relative w-12 h-6 rounded-full ${
            musicEnabled ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              musicEnabled ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {!musicEnabled ? null : (
        <>
          {/* CURRENT MUSIC */}
          <div className="mb-4 text-sm text-gray-300">
            Current Music:{" "}
            <span className="text-white font-semibold">
              {selectedMusic
                ? getMusicDisplayName(selectedMusic.music_name)
                : "None"}
            </span>
          </div>

          {/* CHANGE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="mb-4 w-full flex justify-between items-center px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 text-sm"
          >
            Change Music
            <span>{open ? "▲" : "▼"}</span>
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="border border-[#1e293b] rounded mb-6 overflow-hidden">
              {musics.map((music, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedMusic(music)
                    setOpen(false)
                  }}
                  className="px-4 py-3 hover:bg-[#1e293b] cursor-pointer text-sm"
                >
                  {getMusicDisplayName(music.music_name)}
                </div>
              ))}
            </div>
          )}

          {/* VOLUME */}
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-300">Volume</span>
            <span className="text-sm text-gray-400">
              {(musicVolume * 100).toFixed(0)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={musicVolume}
            onChange={(e) => setMusicVolume(Number(e.target.value))}
            className="w-full"
          />
        </>
      )}
    </div>
  )
}