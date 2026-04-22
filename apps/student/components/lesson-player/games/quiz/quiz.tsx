"use client"

import { useState } from "react"
import { QuizContent, QuizState } from "./types"
import { Info, HelpCircle, ArrowRight, CheckCircle, Bolt } from "lucide-react"

interface QuizProps {
  content: QuizContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function Quiz({ content, onComplete }: QuizProps) {
  const [state, setState] = useState<QuizState>({
    selectedOptionId: null,
    isSubmitted: false,
    isCorrect: null,
  })

  const handleOptionSelect = (optionId: string) => {
    if (!state.isSubmitted) {
      setState((prev) => ({ ...prev, selectedOptionId: optionId }))
    }
  }

  const handleSubmit = () => {
    if (!state.selectedOptionId) return

    const isCorrect = state.selectedOptionId === content.correctAnswerId
    setState((prev) => ({
      ...prev,
      isSubmitted: true,
      isCorrect,
    }))

    // Calculate score: 100 for correct, 0 for incorrect
    const score = isCorrect ? 100 : 0
    onComplete(isCorrect, score)
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Panel: Scenario Context */}
      {(content.scenario || content.context) && (
        <section className="lg:col-span-5 flex flex-col gap-6">
          {/* Scenario Card with Image */}
          {content.scenario && (
            <div className="relative bg-white rounded-xl overflow-hidden shadow-sm group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0040a1]/60 to-transparent z-10"></div>
              <img
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                src={content.scenario.imageUrl}
                alt={content.scenario.title}
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                {content.scenario.badge && (
                  <span className="bg-[#006b5e] px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-4 inline-block">
                    {content.scenario.badge}
                  </span>
                )}
                <h1 className="text-4xl font-bold tracking-tight leading-none mb-2">
                  {content.scenario.title}
                </h1>
                <p className="text-white/80 font-medium text-sm">
                  {content.scenario.subtitle}
                </p>
              </div>
            </div>
          )}

          {/* Context Card */}
          {content.context && (
            <div className="bg-white p-8 rounded-lg shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Info className="w-24 h-24" />
              </div>
              <h3 className="font-bold text-[#0040a1] text-xl mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#006b5e]" />
                {content.context.title}
              </h3>
              <p className="text-[#424751] leading-relaxed text-lg">
                {content.context.description}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Right Panel: Quiz Interaction */}
      <section
        className={`${content.scenario || content.context ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col gap-6`}
      >
        {/* Question Header */}
        <div className="flex justify-between items-end mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[#753d00] font-semibold text-xs tracking-widest uppercase">
              Câu hỏi
            </span>
            <h2 className="text-2xl font-bold text-[#171c1f]">
              Đánh giá kiến thức
            </h2>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-[#0040a1] to-[#004a99] p-8 rounded-lg shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <HelpCircle className="w-10 h-10 text-[#abc7ff] mb-4" />
            <p className="text-2xl font-bold text-white leading-snug">
              {content.question.text}
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 opacity-10">
            <HelpCircle className="w-48 h-48 text-white" />
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-4">
          {content.options.map((option) => {
            const isSelected = state.selectedOptionId === option.id
            const isCorrect = option.id === content.correctAnswerId
            const showResult = state.isSubmitted

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={state.isSubmitted}
                className={`flex items-center justify-between p-6 rounded-lg group transition-all duration-200 text-left active:scale-[0.98] ${
                  showResult && isCorrect
                    ? "bg-green-50 border-2 border-green-500"
                    : showResult && isSelected && !isCorrect
                      ? "bg-red-50 border-2 border-red-500"
                      : isSelected
                        ? "bg-white border-2 border-[#0040a1] shadow-md"
                        : "bg-[#eaeef2] hover:bg-[#e4e9ed]"
                } ${state.isSubmitted ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                      showResult && isCorrect
                        ? "bg-green-500 text-white"
                        : showResult && isSelected && !isCorrect
                          ? "bg-red-500 text-white"
                          : isSelected
                            ? "bg-[#0040a1] text-white"
                            : "bg-white border border-[#c2c6d3] text-[#0040a1] group-hover:bg-[#0040a1] group-hover:text-white"
                    }`}
                  >
                    {option.label}
                  </div>
                  <span
                    className={`font-medium text-base ${
                      showResult && isCorrect
                        ? "text-green-900 font-bold"
                        : showResult && isSelected && !isCorrect
                          ? "text-red-900"
                          : isSelected
                            ? "text-[#0040a1] font-bold"
                            : "text-[#171c1f]"
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
                {showResult && isCorrect && (
                  <CheckCircle className="w-6 h-6 text-green-500" fill="currentColor" />
                )}
                {!showResult && !isSelected && (
                  <ArrowRight className="w-5 h-5 text-[#737783] opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            )
          })}
        </div>

        {/* Submit Button */}
        {!state.isSubmitted && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              disabled={!state.selectedOptionId}
              className={`px-10 py-4 rounded-lg font-bold shadow-lg transition-all flex items-center gap-3 ${
                state.selectedOptionId
                  ? "bg-gradient-to-r from-[#0040a1] to-[#004a99] text-white hover:shadow-[#0040a1]/20 active:scale-[0.98]"
                  : "bg-[#c2c6d3] text-[#737783] cursor-not-allowed"
              }`}
            >
              XÁC NHẬN CÂU TRẢ LỜI
              <Bolt className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Result Feedback */}
        {state.isSubmitted && (
          <div
            className={`p-6 rounded-lg ${
              state.isCorrect
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <h4
              className={`font-bold text-xl mb-2 ${
                state.isCorrect ? "text-green-900" : "text-red-900"
              }`}
            >
              {state.isCorrect ? "✓ Chính xác!" : "✗ Chưa chính xác"}
            </h4>
            {content.explanation && (
              <p
                className={`text-base ${state.isCorrect ? "text-green-800" : "text-red-800"}`}
              >
                {content.explanation}
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
