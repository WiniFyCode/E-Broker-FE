"use client"

import { useState, useEffect, useCallback } from "react"
import { CrosswordContent, CrosswordState } from "./types"
import { Clock, Lightbulb, CheckCircle } from "lucide-react"

interface CrosswordProps {
  content: CrosswordContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function Crossword({ content, onComplete }: CrosswordProps) {
  const [state, setState] = useState<CrosswordState>({
    userAnswers: {},
    completedClues: [],
    hintsUsed: 0,
    timeElapsed: 0,
  })
  const [selectedClue, setSelectedClue] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(content.timeLimit || 600)

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1))
      setState((prev) => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }))
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  // Generate grid from clues
  const generateGrid = useCallback(() => {
    const grid: (string | null)[][] = Array(content.gridSize)
      .fill(null)
      .map(() => Array(content.gridSize).fill(null))

    content.clues.forEach((clue) => {
      const chars = clue.answer.split("")
      chars.forEach((char, idx) => {
        if (clue.direction === "across") {
          const row = grid[clue.startRow]
          if (row) {
            row[clue.startCol + idx] = char
          }
        } else {
          const row = grid[clue.startRow + idx]
          if (row) {
            row[clue.startCol] = char
          }
        }
      })
    })

    return grid
  }, [content])

  const grid = generateGrid()

  const handleCellInput = (row: number, col: number, value: string) => {
    const key = `${row}-${col}`
    setState((prev) => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [key]: value.toUpperCase(),
      },
    }))
  }

  const handleCheck = () => {
    let correctCount = 0
    let totalCells = 0

    content.clues.forEach((clue) => {
      const chars = clue.answer.split("")
      let clueCorrect = true

      chars.forEach((char, idx) => {
        totalCells++
        const row = clue.direction === "across" ? clue.startRow : clue.startRow + idx
        const col = clue.direction === "across" ? clue.startCol + idx : clue.startCol
        const key = `${row}-${col}`
        const userAnswer = state.userAnswers[key] || ""

        if (userAnswer.toUpperCase() === char.toUpperCase()) {
          correctCount++
        } else {
          clueCorrect = false
        }
      })

      if (clueCorrect && !state.completedClues.includes(clue.id)) {
        setState((prev) => ({
          ...prev,
          completedClues: [...prev.completedClues, clue.id],
        }))
      }
    })

    const accuracy = (correctCount / totalCells) * 100
    const score = Math.round(accuracy)

    if (accuracy >= 70) {
      onComplete(true, score)
    }
  }

  const handleHint = () => {
    if (!content.hintsAvailable || state.hintsUsed >= content.hintsAvailable) return

    // Find first empty cell in selected clue
    const clue = content.clues.find((c) => c.id === selectedClue)
    if (!clue) return

    const chars = clue.answer.split("")
    for (let idx = 0; idx < chars.length; idx++) {
      const row = clue.direction === "across" ? clue.startRow : clue.startRow + idx
      const col = clue.direction === "across" ? clue.startCol + idx : clue.startCol
      const key = `${row}-${col}`

      if (!state.userAnswers[key] && chars[idx]) {
        setState((prev) => ({
          ...prev,
          userAnswers: {
            ...prev.userAnswers,
            [key]: chars[idx]!.toUpperCase(),
          },
          hintsUsed: prev.hintsUsed + 1,
        }))
        break
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Context */}
      <div className="lg:col-span-3 space-y-6">
        <div className="p-6 bg-white border border-slate-200 border-l-4 border-l-[#0040a1] rounded-lg">
          <h2 className="font-bold text-2xl text-[#0040a1] mb-4">{content.title}</h2>
          <p className="text-slate-600 text-base leading-relaxed">{content.description}</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-base font-medium">
              <Clock className="w-5 h-5 text-[#006b5e]" />
              <span>{formatTime(timeRemaining)} còn lại</span>
            </div>
            <div className="flex items-center gap-3 text-base font-medium">
              <CheckCircle className="w-5 h-5 text-[#006b5e]" />
              <span>
                {state.completedClues.length}/{content.clues.length} từ hoàn thành
              </span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden group border border-slate-200 aspect-square rounded-lg">
          <img
            alt="Bất động sản"
            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0040a1]/90 to-transparent flex items-end p-6">
            <p className="text-white font-bold text-base tracking-widest uppercase">
              Pháp Lý Nhà Đất
            </p>
          </div>
        </div>
      </div>

      {/* Center: Crossword Grid */}
      <div className="lg:col-span-6 bg-slate-50 p-6 border border-slate-200 flex justify-center items-start pt-8 rounded-lg">
        <div className="bg-white p-6 shadow-xl border border-slate-300 w-full max-w-[600px] aspect-square rounded-lg">
          <div
            className="grid gap-0.5 bg-slate-200 border border-slate-300"
            style={{
              gridTemplateColumns: `repeat(${content.gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${content.gridSize}, 1fr)`,
            }}
          >
            {grid.map((row, rowIdx) =>
              row.map((cell, colIdx) => {
                const key = `${rowIdx}-${colIdx}`
                const clueNumber = content.clues.find(
                  (c) => c.startRow === rowIdx && c.startCol === colIdx
                )?.number

                if (cell === null) {
                  return (
                    <div
                      key={key}
                      className="aspect-square bg-slate-800/5"
                    />
                  )
                }

                return (
                  <div
                    key={key}
                    className="aspect-square bg-white border border-slate-300 relative focus-within:ring-2 ring-[#0040a1]/40"
                  >
                    {clueNumber && (
                      <span className="absolute top-0.5 left-0.5 text-[8px] font-bold text-slate-500">
                        {clueNumber}
                      </span>
                    )}
                    <input
                      type="text"
                      maxLength={1}
                      value={state.userAnswers[key] || ""}
                      onChange={(e) =>
                        handleCellInput(rowIdx, colIdx, e.target.value)
                      }
                      className="w-full h-full text-center bg-transparent border-none text-lg font-extrabold uppercase focus:outline-none"
                    />
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Right: Clues */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="flex-1 bg-slate-100 border border-slate-200 flex flex-col rounded-lg">
          <div className="p-6 bg-[#0040a1] text-white flex items-center justify-between rounded-t-lg">
            <h3 className="font-bold uppercase tracking-widest text-xs">
              Danh Sách Gợi Ý
            </h3>
            <Lightbulb className="w-4 h-4" />
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {content.clues.map((clue) => (
              <div
                key={clue.id}
                onClick={() => setSelectedClue(clue.id)}
                className={`p-4 border-l-2 shadow-sm cursor-pointer transition-all rounded-lg ${
                  state.completedClues.includes(clue.id)
                    ? "bg-[#006b5e]/10 border-[#006b5e]"
                    : selectedClue === clue.id
                      ? "bg-[#0040a1]/10 border-[#0040a1]"
                      : "bg-white border-slate-300 hover:bg-[#0040a1]/5"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-extrabold text-xs text-[#0040a1] uppercase">
                    {clue.number}. {clue.answer.replace(/./g, "•")} (
                    {clue.direction === "across" ? "Ngang" : "Dọc"})
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {clue.length} Chữ
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  {clue.clue}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-200 border-t border-slate-300 flex flex-col gap-4 rounded-b-lg">
            <button
              onClick={handleCheck}
              className="w-full bg-[#0040a1] text-white py-4 font-bold text-base tracking-wide active:scale-[0.98] transition-all rounded-lg"
            >
              Kiểm Tra Đáp Án
            </button>
            <button
              onClick={handleHint}
              disabled={
                !content.hintsAvailable ||
                state.hintsUsed >= content.hintsAvailable
              }
              className="w-full bg-transparent border border-slate-400 text-slate-700 py-4 font-bold text-base uppercase tracking-widest hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              Gợi Ý ({(content.hintsAvailable || 0) - state.hintsUsed} lần còn lại)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
