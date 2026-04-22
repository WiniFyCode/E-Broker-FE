"use client"

import { useState } from "react"
import { FillBlankContent, FillBlankState } from "./types"
import { Info, Lightbulb, CheckCircle, XCircle } from "lucide-react"

interface FillBlankProps {
  content: FillBlankContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function FillBlank({ content, onComplete }: FillBlankProps) {
  const [state, setState] = useState<FillBlankState>({
    answers: content.blanks.map(() => ""),
    isSubmitted: false,
    results: [],
  })

  const handleAnswerChange = (index: number, value: string) => {
    if (!state.isSubmitted) {
      const newAnswers = [...state.answers]
      newAnswers[index] = value
      setState((prev) => ({ ...prev, answers: newAnswers }))
    }
  }

  const handleSubmit = () => {
    const results = content.blanks.map((blank, idx) => {
      const userAnswer = (state.answers[idx] || "").trim().toLowerCase()
      const correctAnswer = blank.correctAnswer.toLowerCase()
      return userAnswer === correctAnswer
    })

    setState((prev) => ({
      ...prev,
      isSubmitted: true,
      results,
    }))

    const correctCount = results.filter((r) => r).length
    const score = Math.round((correctCount / content.blanks.length) * 100)
    const isCorrect = correctCount === content.blanks.length

    onComplete(isCorrect, score)
  }

  const renderTextWithBlanks = () => {
    const parts = content.text.split("___")
    return (
      <div className="text-xl md:text-xl font-medium text-[#1E293B] leading-[2.5]">
        {parts.map((part, idx) => (
          <span key={idx}>
            {part}
            {idx < content.blanks.length && (
              <span className="inline-flex flex-col mx-1 relative">
                <input
                  type="text"
                  value={state.answers[idx]}
                  onChange={(e) => handleAnswerChange(idx, e.target.value)}
                  disabled={state.isSubmitted}
                  className={`inline-block border-b-2 min-w-[140px] px-2 py-1 text-center bg-transparent transition-all ${
                    state.isSubmitted
                      ? state.results[idx]
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-[#CBD5E1] hover:border-[#004A99] focus:border-[#004A99] focus:outline-none"
                  }`}
                  placeholder="..."
                />
                {state.isSubmitted && (
                  <span className="absolute -top-6 left-0 text-xs font-bold">
                    {state.results[idx] ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>
    )
  }

  const allFilled = state.answers.every((a) => a.trim().length > 0)

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#006b5e] mb-3 block">
            Cấp độ 02 — Hiểu biết Hợp đồng
          </span>
          <h1 className="font-bold text-4xl md:text-4xl tracking-tight text-[#004A99]">
            {content.title}
          </h1>
        </div>
        <div className="flex items-center gap-8 bg-white border border-[#E2E8F0] p-6 rounded-lg shadow-sm">
          <div className="pr-8 border-r border-[#E2E8F0]">
            <span className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold block mb-1">
              Điểm hiện tại
            </span>
            <span className="text-2xl font-bold text-[#004A99]">20</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold block mb-1">
              Tiến trình
            </span>
            <span className="text-lg font-bold text-[#1E293B]">2 / 10</span>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Context */}
        <div className="lg:col-span-4 space-y-6">
          {content.context && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-lg relative overflow-hidden">
              <div className="absolute -top-6 -right-6 opacity-[0.03] pointer-events-none">
                <Info className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-1 bg-[#004A99] mb-6"></div>
                <h2 className="font-bold text-2xl text-[#004A99] mb-4 uppercase tracking-tight">
                  {content.context.title}
                </h2>
                <p className="text-[#1E293B] font-medium leading-relaxed mb-8 text-base">
                  {content.context.description}
                </p>
                <div className="flex items-center gap-3 pt-6 border-t border-[#E2E8F0]">
                  <Info className="w-5 h-5 text-[#006b5e]" />
                  <span className="text-xs font-bold text-[#006b5e] uppercase tracking-wider">
                    Chủ đề: Công khai thông tin
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Hint */}
          {content.hint && (
            <div className="bg-amber-50/50 border-l-4 border-[#8B6E30] p-6 flex gap-4 rounded-lg">
              <Lightbulb className="w-5 h-5 text-[#8B6E30] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#8B6E30] uppercase tracking-widest mb-1">
                  Gợi ý
                </h4>
                <p className="text-base text-[#64748B] leading-snug font-medium">
                  {content.hint}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Interactive */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-[#E2E8F0] p-8 md:p-12 rounded-lg shadow-xl min-h-[400px]">
            <div className="mb-12">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-[0.3em] block mb-4">
                Nhiệm vụ: Hoàn thành văn bản hợp đồng
              </span>
              <h3 className="text-2xl font-bold text-[#00346f]">
                Điền các thuật ngữ còn thiếu để hoàn thiện đoạn văn
              </h3>
            </div>

            {renderTextWithBlanks()}

            {/* Submit Button */}
            {!state.isSubmitted && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!allFilled}
                  className={`px-14 py-4 rounded-lg font-bold shadow-md transition-all uppercase text-base tracking-widest ${
                    allFilled
                      ? "text-white bg-[#004A99] hover:bg-[#00346f] active:scale-[0.98]"
                      : "text-[#64748B] bg-[#E2E8F0] cursor-not-allowed"
                  }`}
                >
                  Xác nhận câu trả lời
                </button>
              </div>
            )}

            {/* Results */}
            {state.isSubmitted && (
              <div className="mt-6 space-y-4">
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
                      ? "✓ Hoàn hảo!"
                      : "Một số câu trả lời chưa chính xác"}
                  </h4>
                  {!state.results.every((r) => r) && (
                    <div className="mt-4 space-y-2">
                      <p className="text-base font-bold text-amber-900">
                        Đáp án đúng:
                      </p>
                      {content.blanks.map((blank, idx) => (
                        <div key={idx} className="text-base text-amber-800">
                          Ô {idx + 1}: <strong>{blank.correctAnswer}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
