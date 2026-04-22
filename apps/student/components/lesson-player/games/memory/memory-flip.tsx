"use client"

import { useState, useEffect } from "react"
import { MemoryContent, MemoryState, MemoryCard } from "./types"
import { Lock, FileText, Gavel, FileCheck } from "lucide-react"

interface MemoryFlipProps {
  content: MemoryContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function MemoryFlip({ content, onComplete }: MemoryFlipProps) {
  const [state, setState] = useState<MemoryState>(() => {
    // Create cards from pairs
    const cards: MemoryCard[] = []
    content.pairs.forEach((pair, idx) => {
      const pairId = `pair-${idx}`
      cards.push({
        id: `${pairId}-icon`,
        pairId,
        type: "icon",
        content: pair.icon,
        isFlipped: false,
        isMatched: false,
      })
      cards.push({
        id: `${pairId}-text`,
        pairId,
        type: "text",
        content: pair.text,
        isFlipped: false,
        isMatched: false,
      })
    })

    // Shuffle cards
    return {
      cards: cards.sort(() => Math.random() - 0.5),
      flippedCards: [],
      matchedPairs: new Set(),
      moves: 0,
      isCompleted: false,
    }
  })

  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const [first, second] = state.flippedCards
      const firstCard = state.cards.find((c) => c.id === first)
      const secondCard = state.cards.find((c) => c.id === second)

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        setTimeout(() => {
          setState((prev) => {
            const newMatchedPairs = new Set(prev.matchedPairs)
            newMatchedPairs.add(firstCard.pairId)

            const newCards = prev.cards.map((card) =>
              card.pairId === firstCard.pairId
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            )

            const isCompleted = newMatchedPairs.size === content.pairs.length

            if (isCompleted) {
              const score = Math.max(100 - prev.moves * 2, 50)
              onComplete(true, score)
            }

            return {
              ...prev,
              cards: newCards,
              matchedPairs: newMatchedPairs,
              flippedCards: [],
              isCompleted,
            }
          })
        }, 600)
      } else {
        // No match
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            cards: prev.cards.map((card) =>
              prev.flippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            ),
            flippedCards: [],
          }))
        }, 1000)
      }
    }
  }, [state.flippedCards, state.cards, content.pairs.length, onComplete])

  const handleCardClick = (cardId: string) => {
    const card = state.cards.find((c) => c.id === cardId)
    if (
      !card ||
      card.isMatched ||
      card.isFlipped ||
      state.flippedCards.length >= 2
    ) {
      return
    }

    setState((prev) => ({
      ...prev,
      cards: prev.cards.map((c) =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      ),
      flippedCards: [...prev.flippedCards, cardId],
      moves: prev.flippedCards.length === 1 ? prev.moves + 1 : prev.moves,
    }))
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "description":
        return <FileText className="w-12 h-12" />
      case "gavel":
        return <Gavel className="w-12 h-12" />
      case "assignment":
        return <FileCheck className="w-12 h-12" />
      default:
        return <FileText className="w-12 h-12" />
    }
  }

  const progress = Math.round(
    (state.matchedPairs.size / content.pairs.length) * 100
  )

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 relative">
        <h2 className="text-4xl font-bold tracking-tight text-[#171c1f] mb-4">
          {content.title}
        </h2>
        <p className="text-base text-[#424751] max-w-2xl leading-relaxed">
          {content.description}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 mb-8">
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-[#737783] uppercase tracking-widest mb-1">
            Số lượt đi
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[#004A99]">
              {state.moves}
            </span>
            <span className="text-base text-[#737783]">/ 20</span>
          </div>
        </div>

        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              className="text-[#e4e9ed]"
              cx="32"
              cy="32"
              fill="transparent"
              r="28"
              stroke="currentColor"
              strokeWidth="6"
            ></circle>
            <circle
              className="text-[#006b5e] transition-all duration-500"
              cx="32"
              cy="32"
              fill="transparent"
              r="28"
              stroke="currentColor"
              strokeDasharray="176"
              strokeDashoffset={176 - (176 * progress) / 100}
              strokeWidth="6"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[#171c1f]">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Memory Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {state.cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-[3/4] rounded-lg shadow-sm flex flex-col items-center justify-center p-6 transition-all cursor-pointer ${
              card.isMatched
                ? "bg-green-100 border-b-4 border-green-500"
                : card.isFlipped
                  ? "bg-[#004a99] border-b-4 border-[#004A99]/30"
                  : "bg-[#f0f4f8] hover:bg-[#e4e9ed]"
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <>
                {card.type === "icon" ? (
                  <span className="text-white mb-4">
                    {getIcon(card.content)}
                  </span>
                ) : (
                  <p className="font-bold text-white text-base leading-tight text-center">
                    {card.content}
                  </p>
                )}
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">
                  {card.type === "icon" ? "Biểu tượng" : "Văn bản"}
                </span>
              </>
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#737783]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {state.isCompleted && (
        <div className="mt-8 p-6 rounded-lg bg-green-50 border border-green-200">
          <h4 className="font-bold text-xl text-green-900 mb-2">
            ✓ Hoàn thành!
          </h4>
          <p className="text-base text-green-800">
            Bạn đã hoàn thành trong {state.moves} lượt đi
          </p>
        </div>
      )}
    </div>
  )
}
