"use client"

import { useState } from "react"
import { SequenceContent, SequenceState } from "./types"
import { GripVertical, RefreshCw, CheckCircle, XCircle, Lightbulb, Award, Clock } from "lucide-react"

interface SequenceProps {
  content: SequenceContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function Sequence({ content, onComplete }: SequenceProps) {
  const [state, setState] = useState<SequenceState>({
    currentOrder: [...content.items].sort(() => Math.random() - 0.5), // Shuffle initially
    isSubmitted: false,
    results: [],
  })

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newOrder = [...state.currentOrder]
    const draggedItem = newOrder[draggedIndex]
    if (!draggedItem) return

    newOrder.splice(draggedIndex, 1)
    newOrder.splice(index, 0, draggedItem)

    setState((prev) => ({ ...prev, currentOrder: newOrder }))
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleReset = () => {
    setState({
      currentOrder: [...content.items].sort(() => Math.random() - 0.5),
      isSubmitted: false,
      results: [],
    })
  }

  const handleSubmit = () => {
    const results = state.currentOrder.map(
      (item, idx) => item.correctOrder === idx
    )

    setState((prev) => ({
      ...prev,
      isSubmitted: true,
      results,
    }))

    const correctCount = results.filter((r) => r).length
    const score = Math.round((correctCount / content.items.length) * 100)
    const isCorrect = correctCount === content.items.length

    onComplete(isCorrect, score)
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left Column: Editorial Content */}
      <section className="md:w-5/12 flex flex-col space-y-6">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#006b5e]">
            Trò chơi: Sắp xếp trình tự
          </span>
          <h2 className="font-bold text-4xl text-[#171c1f] tracking-tight leading-[1.1]">
            {content.title.split(" ").slice(0, 2).join(" ")} <br />
            <span className="text-[#00346f]">
              {content.title.split(" ").slice(2).join(" ")}
            </span>
          </h2>
          <div className="w-20 h-1.5 bg-[#00346f] rounded-full"></div>
        </div>

        <p className="text-base text-[#424751] leading-relaxed max-w-md">
          {content.description}
        </p>

        {content.hint && (
          <div className="bg-[#f0f4f8] p-6 rounded-lg space-y-4 shadow-sm border-l-4 border-[#006b5e]">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-[#006b5e]" />
              <h3 className="font-bold text-[#006b5e]">Gợi ý nghiệp vụ</h3>
            </div>
            <p className="text-base text-[#424751] leading-normal">
              {content.hint}
            </p>
          </div>
        )}
      </section>

      {/* Right Column: Interactive Sequence Game */}
      <section className="md:w-7/12">
        <div className="bg-white rounded-lg shadow-[0px_24px_48px_rgba(23,28,31,0.06)] p-8 space-y-4 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold text-[#737783] uppercase tracking-wider">
              Kéo và thả để sắp xếp
            </h4>
            <span className="text-xs text-[#00346f] bg-[#d7e2ff] px-3 py-1 rounded-full font-semibold">
              {content.items.length} Bước
            </span>
          </div>

          {/* Sequence List */}
          <div className="space-y-4 relative z-10">
            {state.currentOrder.map((item, idx) => {
              const isCorrect = state.results[idx]
              const showResult = state.isSubmitted

              return (
                <div
                  key={item.id}
                  draggable={!state.isSubmitted}
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  className="flex items-center gap-4 group active:scale-[0.98] transition-all duration-200"
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 font-bold text-xl shadow-md z-10 shrink-0 rounded-lg ${
                      showResult && isCorrect
                        ? "bg-green-500 text-white"
                        : showResult && !isCorrect
                          ? "bg-red-500 text-white"
                          : idx === 0
                            ? "bg-[#00346f] text-white"
                            : "bg-[#dfe3e7] text-[#424751]"
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div
                    className={`flex-1 flex items-center justify-between p-6 transition-colors rounded-lg ${
                      state.isSubmitted
                        ? "bg-[#f0f4f8]"
                        : "bg-[#f0f4f8] hover:bg-[#e4e9ed] cursor-grab active:cursor-grabbing"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-[#00346f] text-base">
                        {item.title}
                      </span>
                      <span className="text-xs text-[#424751] uppercase tracking-tighter">
                        {item.description}
                      </span>
                    </div>

                    {!state.isSubmitted && (
                      <div className="w-6 h-10 bg-[radial-gradient(circle,_#c2c6d3_1.5px,_transparent_1.5px)] bg-[length:6px_6px] opacity-40 group-hover:opacity-100 transition-opacity"></div>
                    )}

                    {showResult && (
                      <>
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-[#c2c6d3]/20">
            {!state.isSubmitted && (
              <>
                <button
                  onClick={handleReset}
                  className="font-bold text-[#737783] hover:text-[#171c1f] transition-colors flex items-center gap-2 px-4 py-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Làm lại
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-br from-[#00346f] to-[#004a99] text-white px-10 py-4 font-bold uppercase tracking-widest text-base shadow-xl active:scale-[0.98] transition-all rounded-lg"
                >
                  Xác nhận thứ tự
                </button>
              </>
            )}
          </div>

          {/* Results */}
          {state.isSubmitted && (
            <div className="mt-6">
              <div
                className={`p-6 rounded-lg ${
                  state.results.every((r) => r)
                    ? "bg-green-50 border border-green-200"
                    : "bg-amber-50 border border-amber-200"
                }`}
              >
                <h4
                  className={`font-bold text-xl mb-2 ${
                    state.results.every((r) => r)
                      ? "text-green-900"
                      : "text-amber-900"
                  }`}
                >
                  {state.results.every((r) => r)
                    ? "✓ Chính xác tuyệt đối!"
                    : "Một số bước chưa đúng thứ tự"}
                </h4>
                <p
                  className={`text-base ${
                    state.results.every((r) => r)
                      ? "text-green-800"
                      : "text-amber-800"
                  }`}
                >
                  {state.results.every((r) => r)
                    ? "Bạn đã hoàn thành trình tự giao dịch một cách xuất sắc."
                    : "Hãy xem lại các bước được đánh dấu đỏ"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-[#9cefde]/30 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-[#006b5e]" />
              <span className="text-xs font-bold uppercase tracking-tighter text-[#006b5e]">
                Điểm tiềm năng
              </span>
            </div>
            <div className="text-3xl font-bold text-[#006b5e]">+250 XP</div>
          </div>

          <div className="bg-[#ffdcc3] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#542a00]" />
              <span className="text-xs font-bold uppercase tracking-tighter text-[#542a00]">
                Thời gian còn lại
              </span>
            </div>
            <div className="text-3xl font-bold text-[#542a00]">01:45</div>
          </div>
        </div>
      </section>
    </div>
  )
}
