"use client"

import { useState } from "react"
import { MatchContent, MatchState } from "./types"
import { GripVertical, CheckCircle, XCircle } from "lucide-react"

interface MatchProps {
  content: MatchContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function Match({ content, onComplete }: MatchProps) {
  const [state, setState] = useState<MatchState>({
    leftItems: content.pairs.map((p, idx) => ({ id: idx, text: p.left })),
    rightItems: content.pairs
      .map((p, idx) => ({ id: idx, text: p.right }))
      .sort(() => Math.random() - 0.5), // Shuffle right items
    matches: {},
    isSubmitted: false,
    results: {},
  })

  const [draggedItem, setDraggedItem] = useState<{
    id: number
    text: string
  } | null>(null)

  const handleDragStart = (item: { id: number; text: string }) => {
    setDraggedItem(item)
  }

  const handleDrop = (rightId: number) => {
    if (draggedItem && !state.isSubmitted) {
      setState((prev) => ({
        ...prev,
        matches: {
          ...prev.matches,
          [draggedItem.id]: rightId,
        },
      }))
      setDraggedItem(null)
    }
  }

  const handleSubmit = () => {
    const results: Record<number, boolean> = {}
    let correctCount = 0

    Object.entries(state.matches).forEach(([leftId, rightId]) => {
      const isCorrect = Number(leftId) === Number(rightId)
      results[Number(leftId)] = isCorrect
      if (isCorrect) correctCount++
    })

    setState((prev) => ({
      ...prev,
      isSubmitted: true,
      results,
    }))

    const score = Math.round((correctCount / content.pairs.length) * 100)
    const isCorrect = correctCount === content.pairs.length

    onComplete(isCorrect, score)
  }

  const allMatched = Object.keys(state.matches).length === content.pairs.length

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 relative">
        <h1 className="font-bold text-4xl text-[#00346f] tracking-[-0.02em] leading-tight max-w-2xl relative z-10">
          {content.title}
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-[2px] w-24 bg-[#006b5e]"></div>
          <p className="text-base text-[#424751] max-w-xl">
            {content.description}
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Draggable Items */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#737783] mb-4">
            {content.leftLabel || "Công Cụ Pháp Lý"}
          </h3>

          {state.leftItems.map((item) => {
            const isMatched = state.matches[item.id] !== undefined
            const isCorrect = state.results[item.id]

            return (
              <div
                key={item.id}
                draggable={!state.isSubmitted}
                onDragStart={() => handleDragStart(item)}
                className={`group p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 border-l-4 rounded-lg ${
                  state.isSubmitted
                    ? isCorrect
                      ? "border-green-500"
                      : "border-red-500"
                    : isMatched
                      ? "border-[#006b5e]"
                      : "border-[#00346f]"
                } ${!state.isSubmitted ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xl text-[#00346f]">
                      {item.text}
                    </span>
                    {state.isSubmitted && (
                      <div className="mt-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {!state.isSubmitted && (
                    <GripVertical className="w-5 h-5 text-[#c2c6d3] group-hover:text-[#00346f]" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Drop Zones */}
        <div className="md:col-span-8 grid grid-cols-1 gap-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#737783] mb-2">
            {content.rightLabel || "Định Nghĩa Chi Tiết"}
          </h3>

          {state.rightItems.map((item) => {
            const matchedLeftId = Object.entries(state.matches).find(
              ([_, rightId]) => rightId === item.id
            )?.[0]
            const matchedLeftItem = matchedLeftId
              ? state.leftItems.find((l) => l.id === Number(matchedLeftId))
              : null

            return (
              <div
                key={item.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                className="bg-[#f0f4f8] p-8 min-h-[160px] flex flex-col justify-center relative overflow-hidden"
              >
                <div className="relative z-10">
                  <p className="text-xl leading-relaxed text-[#171c1f] font-medium">
                    {item.text}
                  </p>

                  {matchedLeftItem ? (
                    <div className="mt-6 flex items-center gap-3 bg-white p-6 rounded-lg border-l-4 border-[#006b5e]">
                      <span className="font-bold text-[#00346f]">
                        {matchedLeftItem.text}
                      </span>
                      {state.isSubmitted && (
                        <>
                          {state.results[matchedLeftItem.id] ? (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="mt-6 flex items-center gap-2 text-[#737783]">
                      <span className="text-xs uppercase font-bold tracking-widest">
                        Thả mục vào đây
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 border-2 border-dashed border-[#c2c6d3] opacity-20"></div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Submit Button */}
      {!state.isSubmitted && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allMatched}
            className={`px-14 py-4 rounded-lg font-bold shadow-lg transition-all uppercase text-base tracking-widest ${
              allMatched
                ? "bg-[#00346f] text-white hover:bg-[#004a99] active:scale-[0.98]"
                : "bg-[#c2c6d3] text-[#737783] cursor-not-allowed"
            }`}
          >
            Xác nhận ghép cặp
          </button>
        </div>
      )}

      {/* Results */}
      {state.isSubmitted && (
        <div className="mt-8">
          <div
            className={`p-6 rounded-lg ${
              Object.values(state.results).every((r) => r)
                ? "bg-green-50 border border-green-200"
                : "bg-amber-50 border border-amber-200"
            }`}
          >
            <h4
              className={`font-bold text-xl mb-2 ${
                Object.values(state.results).every((r) => r)
                  ? "text-green-900"
                  : "text-amber-900"
              }`}
            >
              {Object.values(state.results).every((r) => r)
                ? "✓ Hoàn hảo! Tất cả đều đúng"
                : "Một số cặp chưa chính xác"}
            </h4>
            {!Object.values(state.results).every((r) => r) && (
              <p className="text-base text-amber-800">
                Hãy xem lại các cặp được đánh dấu đỏ
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
