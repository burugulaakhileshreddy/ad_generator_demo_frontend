"use client"

import { useState, useEffect } from "react"

import ProcessingState from "./processing_state"
import ReadyState from "./ready_state"
import EditorLayout from "./editor_layout"

type EditorTab = {
  id: string
  label: string
  status: "loading" | "ready"
  data: any | null
  variantId: number | null
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function EditorBlock({
  onClose,
  status,
  data
}: {
  onClose: () => void
  status: "processing" | "ready" | "error"
  data: any
}) {
  const [state, setState] = useState("processing")

  const [tabs, setTabs] = useState<EditorTab[]>([
    {
      id: "main-editor",
      label: "Ad 1",
      status: "ready",
      data,
      variantId: data?.variant_id || null
    }
  ])

  const [activeTabId, setActiveTabId] = useState("main-editor")

  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [customPrompt, setCustomPrompt] = useState("")
  const [creatingTab, setCreatingTab] = useState(false)

  // NEW: remember which variant tabs user closed in this session
  const [closedVariantIds, setClosedVariantIds] = useState<number[]>([])

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    if (status === "processing") setState("processing")
    if (status === "ready") setState("ready")
    if (status === "error") setState("error")
  }, [status])

  useEffect(() => {
    if (!data) return

    const initialVariantId = data?.variant_id || null

    const initialTab: EditorTab = {
      id: "main-editor",
      label: "Ad 1",
      status: "ready",
      data,
      variantId: initialVariantId
    }

    setTabs([initialTab])
    setActiveTabId("main-editor")
    setClosedVariantIds([]) // reset when a fresh editor session/data loads
  }, [data])

  const fetchVariantAssets = async (taskId: number, variantId: number) => {
    if (!BACKEND_URL) {
    throw new Error("Backend URL is not configured")
  }

  const res = await fetch(
    `${BACKEND_URL}/tasks/${taskId}/variants/${variantId}`
  )

    const responseData = await res.json()

    if (!res.ok || responseData.error) {
      throw new Error(responseData.error || "Failed to fetch variant assets")
    }

    return responseData
  }

  const syncVariantsFromBackend = async (
    taskId: number,
    fallbackData?: any,
    preferredVariantId?: number
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/tasks/${taskId}/variants`)
      const responseData = await res.json()

      if (!res.ok || responseData.error) {
        throw new Error(responseData.error || "Failed to fetch variants")
      }

      const variants = responseData.variants || []

      const existingDataMap = new Map<number, any>()
      tabs.forEach((tab) => {
        if (tab.variantId && tab.data) {
          existingDataMap.set(tab.variantId, tab.data)
        }
      })

      if (fallbackData?.variant_id) {
        existingDataMap.set(fallbackData.variant_id, fallbackData)
      }

      // NEW: hide closed variants, but never hide preferred newly-created one
      const visibleVariants = variants.filter((variant: any) => {
        if (preferredVariantId && variant.variant_id === preferredVariantId) {
          return true
        }
        return !closedVariantIds.includes(variant.variant_id)
      })

      const builtTabs: EditorTab[] = visibleVariants.map((variant: any, index: number) => {
        const variantId = variant.variant_id
        const tabData = existingDataMap.get(variantId) || null

        return {
          id: index === 0 ? "main-editor" : `variant-${variantId}`,
          label: `Ad ${index + 1}`,
          status: "ready",
          data: tabData,
          variantId
        }
      })

      if (builtTabs.length === 0 && fallbackData) {
        builtTabs.push({
          id: "main-editor",
          label: "Ad 1",
          status: "ready",
          data: fallbackData,
          variantId: fallbackData.variant_id || null
        })
      }

      setTabs(builtTabs)

      if (preferredVariantId) {
        const preferredTab = builtTabs.find((tab) => tab.variantId === preferredVariantId)
        if (preferredTab) {
          setActiveTabId(preferredTab.id)
          return
        }
      }

      setActiveTabId((current) => {
        const stillExists = builtTabs.find((tab) => tab.id === current)
        return stillExists ? current : (builtTabs[0]?.id || "main-editor")
      })

    } catch (err) {
      console.error("Failed to sync variants", err)

      if (fallbackData) {
        setTabs([
          {
            id: "main-editor",
            label: "Ad 1",
            status: "ready",
            data: fallbackData,
            variantId: fallbackData?.variant_id || null
          }
        ])
        setActiveTabId("main-editor")
      }
    }
  }

  useEffect(() => {
    if (state !== "editor") return
    if (!data?.task_id) return

    syncVariantsFromBackend(data.task_id, data, data?.variant_id)
  }, [state, data?.task_id])

  const handleOpenEditor = async () => {
    setState("editor")

    if (data?.task_id) {
      await syncVariantsFromBackend(data.task_id, data, data?.variant_id)
    } else {
      setActiveTabId("main-editor")
    }
  }

  const handleCloseTab = (tabId: string) => {
    if (tabId === "main-editor") return

    const tabToClose = tabs.find((tab) => tab.id === tabId)

    if (tabToClose?.variantId) {
      setClosedVariantIds((prev) => {
        if (prev.includes(tabToClose.variantId as number)) return prev
        return [...prev, tabToClose.variantId as number]
      })
    }

    const updatedTabs = tabs.filter((tab) => tab.id !== tabId)
    setTabs(updatedTabs)

    if (activeTabId === tabId) {
      setActiveTabId("main-editor")
    }
  }

  const handleTabClick = async (tab: EditorTab) => {
    setActiveTabId(tab.id)

    if (tab.data || !tab.variantId || !data?.task_id) return

    try {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === tab.id
            ? { ...t, status: "loading" }
            : t
        )
      )

      const variantAssets = await fetchVariantAssets(data.task_id, tab.variantId)

      setTabs((prev) =>
        prev.map((t) =>
          t.id === tab.id
            ? {
                ...t,
                status: "ready",
                data: variantAssets
              }
            : t
        )
      )
    } catch (err) {
      console.error("Failed to load variant assets", err)

      setTabs((prev) =>
        prev.map((t) =>
          t.id === tab.id
            ? { ...t, status: "ready" }
            : t
        )
      )
    }
  }

  const createNewEditorTab = async (mode: "system" | "custom") => {
    const trimmedPrompt = customPrompt.trim()

    if (!data?.task_id) return
    if (mode === "custom" && !trimmedPrompt) return

    try {
      setCreatingTab(true)

      const endpoint =
        mode === "system"
          ? `${BACKEND_URL}/tasks/${data.task_id}/variants/system-generate`
          : `${BACKEND_URL}/tasks/${data.task_id}/variants/custom-generate`

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: mode === "custom"
          ? JSON.stringify({ prompt: trimmedPrompt })
          : undefined
      })

      const responseData = await res.json()

      if (!res.ok || responseData.error) {
        console.error("Failed to create variant", responseData)
        alert(responseData.error || "Failed to generate new ad")
        setCreatingTab(false)
        return
      }

      // NEW: if this variant was somehow previously closed, remove from hidden list
      if (responseData.variant_id) {
        setClosedVariantIds((prev) =>
          prev.filter((id) => id !== responseData.variant_id)
        )
      }

      setShowGenerateModal(false)
      setCustomPrompt("")

      await syncVariantsFromBackend(
        data.task_id,
        responseData,
        responseData.variant_id
      )

      setCreatingTab(false)

    } catch (err) {
      console.error("Failed to create editor tab", err)
      setCreatingTab(false)
      alert("Something went wrong while generating the new ad")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[1400px] h-[750px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white shrink-0 relative z-30">
          <div className="flex items-center gap-4 min-w-0">
            <div className="font-bold text-lg shrink-0">
              Ad Generator | Editor
            </div>

            {state === "editor" && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-[980px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => {
                  const isActive = tab.id === activeTabId
                  const isClosable = tab.id !== "main-editor"

                  return (
                    <div
                      key={tab.id}
                      onClick={() => handleTabClick(tab)}
                      className={`group flex items-center gap-2 px-4 py-2 rounded-t-lg border cursor-pointer whitespace-nowrap transition ${
                        isActive
                          ? "bg-[#0f172a] text-white border-[#0f172a]"
                          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-sm font-medium">{tab.label}</span>

                      {tab.status === "loading" && (
                        <span className={`text-xs ${isActive ? "text-gray-300" : "text-gray-500"}`}>
                          •
                        </span>
                      )}

                      {isClosable && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCloseTab(tab.id)
                          }}
                          className={`text-xs transition ${
                            isActive
                              ? "text-gray-300 hover:text-white"
                              : "text-gray-500 hover:text-black"
                          }`}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl shrink-0"
          >
            ✕
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-hidden relative">
          {state === "processing" && (
            <div className="flex items-center justify-center h-full">
              <ProcessingState />
            </div>
          )}

          {state === "ready" && (
            <div className="flex items-center justify-center h-full">
              <ReadyState onOpenEditor={handleOpenEditor} />
            </div>
          )}

          {state === "editor" && (
            <div className="h-full relative">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTabId

                return (
                  <div
                    key={tab.id}
                    className={`absolute inset-0 ${isActive ? "block" : "hidden"}`}
                  >
                    {tab.status === "loading" || !tab.data ? (
                      <div className="flex items-center justify-center h-full bg-[#0f172a]">
                        <ProcessingState />
                      </div>
                    ) : (
                      <EditorLayout
                        assets={tab.data}
                        onOpenGenerateModal={() => setShowGenerateModal(true)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {state === "error" && (
            <div className="flex items-center justify-center h-full text-red-500">
              System is currently unavailable. Please try again.
            </div>
          )}

          {/* GENERATE MORE ADS MODAL */}
          {showGenerateModal && (
            <div className="absolute inset-0 z-20 flex items-center justify-center px-6 py-6">
              <div
                className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
                onClick={() => {
                  if (!creatingTab) setShowGenerateModal(false)
                }}
              />

              <div className="relative z-10 w-full max-w-[640px] max-h-[calc(100%-40px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-[22px] border border-white/10 bg-[#071224] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
                <div className="flex items-start justify-between px-7 py-6 border-b border-white/10">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-[12px] font-medium text-indigo-300 mb-3">
                      Generate More Ads
                    </div>

                    <h2 className="text-[24px] leading-none font-semibold text-white">
                      Create your next ad
                    </h2>

                    <p className="text-sm text-slate-400 mt-3 leading-6 max-w-[460px]">
                      Pick a system-generated ad or describe your own custom direction. A new editor tab will open with the same workflow.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (creatingTab) return
                      setShowGenerateModal(false)
                    }}
                    className="text-slate-400 hover:text-white text-xl transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="px-7 py-6 space-y-5">

                  <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 shrink-0 rounded-xl bg-indigo-500/12 flex items-center justify-center text-xl">
                        ⚡
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white">
                          Generate New System Ad
                        </h3>

                        <p className="text-sm text-slate-400 leading-6 mt-2 mb-4">
                          Let the system create another polished ad variation using the same business data, content, and creative context already available.
                        </p>

                        <button
                          onClick={() => createNewEditorTab("system")}
                          disabled={creatingTab}
                          className={`w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-medium transition shadow-lg ${
                            creatingTab
                              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
                        >
                          {creatingTab ? "Generating..." : "Generate System Ad"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 shrink-0 rounded-xl bg-fuchsia-500/12 flex items-center justify-center text-xl">
                        ✍️
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white">
                          Create Custom Ad
                        </h3>

                        <p className="text-sm text-slate-400 leading-6 mt-2 mb-4">
                          Enter a short description of the ad you want. Example: premium product focus, festive campaign, discount push, family audience, or luxury brand tone.
                        </p>

                        <textarea
                          value={customPrompt}
                          onChange={(e) => setCustomPrompt(e.target.value)}
                          placeholder="Example: Create a premium ad focused on our signature cold coffee and breakfast combo for young professionals."
                          rows={5}
                          className="w-full rounded-xl bg-[#020817] border border-white/10 px-4 py-3 text-sm text-white outline-none resize-none mb-4 placeholder:text-slate-500"
                        />

                        <button
                          onClick={() => createNewEditorTab("custom")}
                          disabled={creatingTab || !customPrompt.trim()}
                          className={`w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-medium transition shadow-lg ${
                            creatingTab || !customPrompt.trim()
                              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                              : "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                          }`}
                        >
                          {creatingTab ? "Generating..." : "Generate Custom Ad"}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="px-7 pb-6">
                  <div className="rounded-xl border border-dashed border-white/10 px-4 py-3 text-xs text-slate-400 leading-6">
                    A new editor tab opens after selection, so your current ad remains untouched.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}