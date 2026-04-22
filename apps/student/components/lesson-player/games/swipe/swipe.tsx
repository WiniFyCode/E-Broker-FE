"use client"

import { useState } from "react"
import { SwipeContent, SwipeState } from "./types"
import { X, Check, Quote } from "lucide-react"

interface SwipeProps {
  content: SwipeContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function Swipe({ content, onComplete }: SwipeProps) {
  const [state, setState] = useState<SwipeState>({
    currentCardIndex: 0,
    decisions: {},
    score: 0,
  })

  const currentCard = content.cards[state.currentCardIndex]

  if (!currentCard) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <h2 className="text-3xl font-bold text-[#0040a1] mb-4">
          Hoàn thành!
        </h2>
        <p className="text-slate-600">
          Bạn đã đưa ra quyết định cho tất cả {content.cards.length} tình huống.
        </p>
      </div>
    )
  }

  const progress = Math.round(
    (state.currentCardIndex / content.cards.length) * 100
  )

  const handleDecision = (direction: "left" | "right") => {
    const newDecisions = {
      ...state.decisions,
      [currentCard.id]: direction,
    }

    setState((prev) => ({
      ...prev,
      decisions: newDecisions,
      currentCardIndex: prev.currentCardIndex + 1,
      score: prev.score + 10,
    }))

    // Check if all cards are done
    if (state.currentCardIndex + 1 >= content.cards.length) {
      const finalScore = Math.round(
        (Object.keys(newDecisions).length / content.cards.length) * 100
      )
      onComplete(true, finalScore)
    }
  }

  if (state.currentCardIndex >= content.cards.length) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <h2 className="text-3xl font-bold text-[#0040a1] mb-4">
          Hoàn thành!
        </h2>
        <p className="text-slate-600">
          Bạn đã đưa ra quyết định cho tất cả {content.cards.length} tình huống.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Left: Context */}
      <div className="lg:col-span-5 flex flex-col gap-8 text-left">
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 bg-[#ffdcc3] text-[#542a00] font-bold text-xs uppercase tracking-wider">
            Thử thách #{state.currentCardIndex + 1}
          </span>
          <h2 className="font-extrabold text-5xl lg:text-6xl tracking-tight text-[#0040a1] leading-[1.1]">
            {content.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-md">
            {content.description}
          </p>
        </div>

        <div className="p-8 bg-slate-50 border-l-4 border-[#0040a1]">
          <div className="flex items-center gap-2 mb-3">
            <Quote className="w-5 h-5 text-[#0040a1]" />
            <span className="font-bold text-xs text-[#0040a1] uppercase tracking-widest">
              Góc nhìn Chuyên gia
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Card */}
      <div className="lg:col-span-7 perspective-1000 relative">
        <div className="bg-white p-8 lg:p-16 shadow-2xl flex flex-col justify-between min-h-[460px] relative border border-slate-200">
          <div className="flex justify-between items-start mb-12">
            <Quote className="w-12 h-12 text-[#0040a1]/20" />
            {currentCard.recordNumber && (
              <div className="px-3 py-1 bg-slate-100 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
                {currentCard.recordNumber}
              </div>
            )}
          </div>

          <div className="flex-grow flex items-center justify-center px-4">
            <blockquote className="text-2xl lg:text-3xl font-bold text-slate-900 text-center leading-snug italic">
              "{currentCard.quote}"
            </blockquote>
          </div>

          {/* Progress */}
          <div className="mt-12 w-full h-1 bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-[#006b5e] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="lg:col-span-12 flex justify-center gap-8 mt-8">
        <button
          onClick={() => handleDecision("left")}
          className="flex-1 max-w-md group relative overflow-hidden bg-[#ba1a1a] text-white font-extrabold py-6 transition-all active:scale-[0.98] flex items-center justify-center gap-4 shadow-lg"
        >
          <div className="absolute inset-0 bg-black/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          <X className="w-8 h-8" />
          <div className="flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 leading-none mb-1">
              Quyết định
            </span>
            <span className="text-xl">{content.leftLabel}</span>
          </div>
        </button>

        <button
          onClick={() => handleDecision("right")}
          className="flex-1 max-w-md group relative overflow-hidden bg-[#006b5e] text-white font-extrabold py-6 transition-all active:scale-[0.98] flex items-center justify-center gap-4 shadow-lg"
        >
          <div className="absolute inset-0 bg-black/10 translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300" />
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 leading-none mb-1">
              Quyết định
            </span>
            <span className="text-xl">{content.rightLabel}</span>
          </div>
          <Check className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}
