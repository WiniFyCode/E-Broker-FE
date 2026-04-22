"use client"

import { useState } from "react"
import { WordScrambleContent, WordScrambleState } from "./types"
import { Lightbulb, RefreshCw, CheckCircle, Timer, Award } from "lucide-react"

interface WordScrambleProps {
  content: WordScrambleContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function WordScramble({ content, onComplete }: WordScrambleProps) {
  const [state, setState] = useState<WordScrambleState>({
    userAnswer: "",
    isSubmitted: false,
    isCorrect: null,
  })

  const handleLetterClick = (letter: string) => {
    if (!state.isSubmitted) {
      setState((prev) => ({
        ...prev,
        userAnswer: prev.userAnswer + letter,
      }))
    }
  }

  const handleReset = () => {
    setState({
      userAnswer: "",
      isSubmitted: false,
      isCorrect: null,
    })
  }

  const handleSubmit = () => {
    const isCorrect =
      state.userAnswer.toLowerCase().trim() ===
      content.correctWord.toLowerCase().trim()

    setState((prev) => ({
      ...prev,
      isSubmitted: true,
      isCorrect,
    }))

    const score = isCorrect ? 100 : 0
    onComplete(isCorrect, score)
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Context */}
      <div className="lg:col-span-3 space-y-6">
        {/* Progress */}
        <div className="bg-white p-6 border border-[#E2E8F0] shadow-sm rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#004A99]">
              Tiến trình
            </h3>
            <span className="text-xs font-bold text-[#006b5e]">85%</span>
          </div>
          <div className="w-full h-2 bg-[#e4e9ed] rounded-full overflow-hidden relative mb-4">
            <div className="absolute left-0 top-0 h-full bg-[#006b5e] w-[85%] rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-medium text-[#64748B]">
              <Timer className="w-4 h-4 text-[#006b5e]" />
              <span>08:15 còn lại</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-white border border-[#E2E8F0] border-l-4 border-l-[#004A99] shadow-sm rounded-lg">
          <h2 className="font-bold text-xl text-[#004A99] mb-3 leading-tight">
            {content.title}
          </h2>
          <p className="text-[#64748B] leading-relaxed text-base">
            {content.description}
          </p>
        </div>

        {/* Hint */}
        {content.hint && (
          <div className="bg-white p-6 border border-[#E2E8F0] shadow-sm rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-[#004A99]" />
              <h3 className="font-bold text-xs text-[#004A99] uppercase tracking-[0.1em]">
                Gợi ý chuyên môn
              </h3>
            </div>
            <p className="text-base text-[#64748B] leading-relaxed italic border-l border-[#E2E8F0] pl-3">
              {content.hint}
            </p>
          </div>
        )}

        {/* Visual Asset */}
        {content.imageUrl && (
          <div className="relative overflow-hidden group border border-[#E2E8F0] aspect-video rounded-lg">
            <img
              alt="Context"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              src={content.imageUrl}
            />
          </div>
        )}
      </div>

      {/* Center Column: Scramble Area */}
      <div className="lg:col-span-9 bg-[#f0f4f8] p-6 border border-[#E2E8F0] flex flex-col items-center justify-center rounded-lg">
        <div className="bg-white p-8 shadow-2xl border border-[#E2E8F0]/50 w-full rounded-lg">
          <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-[#737783] mb-6 text-center">
            Các ký tự hiện có
          </h3>

          {/* Letter Cards */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {content.scrambledLetters.map((letter, idx) => (
              <div
                key={idx}
                onClick={() => handleLetterClick(letter)}
                className={`w-12 h-12 bg-white border-2 border-[#E2E8F0] text-base font-bold flex items-center justify-center text-[#004A99] shadow-sm transition-all rounded-lg ${state.isSubmitted
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:border-[#004A99]/60 hover:bg-[#f0f4f8] hover:-translate-y-1"
                  }`}
              >
                {letter}
              </div>
            ))}
          </div>

          {/* Answer Input */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="space-y-3 text-center">
              <label className="text-xs font-bold text-[#737783] uppercase tracking-[0.2em]">
                Câu trả lời của bạn
              </label>
              <div className="relative">
                <input
                  className={`w-full border-b-2 border-t-0 border-x-0 px-4 py-3 text-base font-bold tracking-[0.15em] uppercase placeholder:text-[#c2c6d3]/50 placeholder:font-normal text-center rounded-lg ${state.isSubmitted
                      ? state.isCorrect
                        ? "border-green-500 bg-green-50 text-green-900"
                        : "border-red-500 bg-red-50 text-red-900"
                      : "bg-[#dfe3e7] border-[#c2c6d3]/40 focus:border-[#004A99] focus:ring-0 text-[#004A99]"
                    }`}
                  placeholder="NHẬP THUẬT NGỮ..."
                  type="text"
                  value={state.userAnswer}
                  onChange={(e) =>
                    !state.isSubmitted &&
                    setState((prev) => ({
                      ...prev,
                      userAnswer: e.target.value.toUpperCase(),
                    }))
                  }
                  disabled={state.isSubmitted}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!state.userAnswer || state.isSubmitted}
                className={`w-full py-4 font-bold text-base tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg rounded-lg ${state.userAnswer && !state.isSubmitted
                    ? "bg-[#004A99] text-white hover:bg-[#004a99] active:scale-[0.98]"
                    : "bg-[#c2c6d3] text-[#737783] cursor-not-allowed"
                  }`}
              >
                <CheckCircle className="w-5 h-5" />
                KIỂM TRA KẾT QUẢ
              </button>

              <button
                onClick={handleReset}
                className="w-full bg-transparent border border-[#737783] text-[#171c1f] py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#dfe3e7] transition-colors active:scale-[0.98] rounded-lg"
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                LÀM MỚI
              </button>
            </div>
          </div>

          {/* Results */}
          {state.isSubmitted && (
            <div className="mt-8">
              <div
                className={`p-6 rounded-lg ${state.isCorrect
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                  }`}
              >
                <h4
                  className={`font-bold text-xl mb-2 ${state.isCorrect ? "text-green-900" : "text-red-900"
                    }`}
                >
                  {state.isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 inline mr-2" />
                      Chính Xác! +100 Điểm
                    </>
                  ) : (
                    "✗ Chưa chính xác"
                  )}
                </h4>
                {!state.isCorrect && (
                  <p className="text-base text-red-800">
                    Đáp án đúng: <strong>{content.correctWord}</strong>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
