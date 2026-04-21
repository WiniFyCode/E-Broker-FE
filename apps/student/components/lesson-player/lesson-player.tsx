"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Lesson, Game } from "@/lib/training-types"
import { GameResult } from "./games/framework/types"
import {
  X,
  ArrowLeft,
  ArrowRight,
  Award,
  Trophy,
  Zap,
} from "lucide-react"
// TODO: Re-enable games when ready
// import {
//   Quiz,
//   FillBlank,
//   Match,
//   Sequence,
//   Hotspot,
//   LabelImage,
//   MemoryFlip,
//   WordScramble,
//   Crossword,
//   Swipe,
//   Branching,
//   TimedSprint,
// } from "../games"

interface LessonPlayerProps {
  lesson: Lesson
  specializationTitle: string
  programTitle: string
  onComplete?: () => void
}

export function LessonPlayer({
  lesson,
  specializationTitle,
  programTitle,
  onComplete,
}: LessonPlayerProps) {
  const [currentGameIndex, setCurrentGameIndex] = useState(lesson.lastGameIndex)
  const [showResult, setShowResult] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [streak, setStreak] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [gameResults, setGameResults] = useState<GameResult[]>([])

  const currentGame = lesson.games[currentGameIndex]
  const progress = Math.round(
    ((currentGameIndex + (showResult ? 1 : 0)) / lesson.games.length) * 100
  )

  const handleGameComplete = useCallback(
    (result: GameResult) => {
      setShowResult(true)
      setGameResults((prev) => [...prev, result])

      if (result.isPassed) {
        setGameScore((prev) => prev + result.score * streak)
        setStreak((prev) => prev + 1)
      } else {
        setStreak(1)
      }
    },
    [streak]
  )

  const handleNext = useCallback(() => {
    if (currentGameIndex < lesson.games.length - 1) {
      setCurrentGameIndex((prev) => prev + 1)
      setShowResult(false)
    } else {
      setIsCompleted(true)
      onComplete?.()
    }
  }, [currentGameIndex, lesson.games.length, onComplete])

  const handlePrevious = useCallback(() => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex((prev) => prev - 1)
      setShowResult(false)
    }
  }, [currentGameIndex])

  const handleRetry = useCallback(() => {
    setShowResult(false)
  }, [])

  const renderGame = () => {
    // TODO: Re-enable games when ready
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">Game components are temporarily disabled</p>
        <p className="text-sm mt-2">Game type: {currentGame.type}</p>
      </div>
    )
  }

  /* Temporarily disabled game rendering logic
  const renderGameOriginal = () => {
    const config = {
      gameId: currentGame.id,
      title: currentGame.title,
      instruction: `Hoàn thành game này để tiếp tục`,
      passThreshold: currentGame.passThreshold,
      maxRetries: currentGame.maxRetries || 3,
    }

    const state = {
      status: showResult ? ("submitted" as const) : ("playing" as const),
      score: 0,
      maxScore: 100,
      userAnswer: null,
      isCorrect: null,
      feedback: null,
      attempts: 0,
      startTime: Date.now(),
    }

    const actions = {
      setAnswer: (_answer: unknown) => {},
      submit: () => {},
      next: handleNext,
      retry: handleRetry,
      reset: () => {},
    }

    const commonProps = { config, state, actions }

    switch (currentGame.type) {
      case "quiz":
        return <Quiz {...commonProps} content={currentGame.content} />
      case "fill-blank":
        return <FillBlank {...commonProps} content={currentGame.content} />
      case "match":
        return <Match {...commonProps} content={currentGame.content} />
      case "sequence":
        return <Sequence {...commonProps} content={currentGame.content} />
      case "hotspot":
        return <Hotspot {...commonProps} content={currentGame.content} />
      case "label":
        return <LabelImage {...commonProps} content={currentGame.content} />
      case "memory":
        return <MemoryFlip {...commonProps} content={currentGame.content} />
      case "word-scramble":
        return <WordScramble {...commonProps} content={currentGame.content} />
      case "crossword":
        return <Crossword {...commonProps} content={currentGame.content} />
      case "swipe":
        return <Swipe {...commonProps} content={currentGame.content} />
      case "branching":
        return <Branching {...commonProps} content={currentGame.content} />
      case "timed-sprint":
        return <TimedSprint {...commonProps} content={currentGame.content} />
      default:
        return (
          <div className="text-center py-12 text-gray-500">
            Game type "{currentGame.type}" not implemented yet
          </div>
        )
    }
  }
  */

  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] px-6">
        <div className="bg-white p-12 rounded-3xl shadow-lg max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-[#191c1d] mb-4">
            Chúc mừng!
          </h1>

          <p className="text-[#424654] mb-8">
            Bạn đã hoàn thành bài học "{lesson.title}"
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#f8f9fa] p-4 rounded-xl">
              <p className="text-3xl font-bold text-[#0040a1]">{gameScore}</p>
              <p className="text-sm text-[#737785]">Tổng điểm</p>
            </div>
            <div className="bg-[#f8f9fa] p-4 rounded-xl">
              <p className="text-3xl font-bold text-green-600">
                {gameResults.filter((r) => r.isPassed).length}/
                {gameResults.length}
              </p>
              <p className="text-sm text-[#737785]">Game đã qua</p>
            </div>
          </div>

          <Link
            href="/training/program/prog-1"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-[#0040a1] text-white hover:bg-[#0056d2] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay về chương trình
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,64,161,0.04)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/training/program/prog-1"
              className="p-2 hover:bg-blue-50/50 transition-all duration-300 rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6 text-[#0040a1]" />
            </Link>
            <div className="flex flex-col">
              <h1 className="font-bold tracking-tight text-slate-900 text-lg">
                {lesson.title}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {specializationTitle}
              </span>
            </div>
          </div>

          {/* Game Progress & Score */}
          <div className="flex items-center gap-6">
            {/* Progress dots */}
            <div className="flex items-center gap-3 bg-[#edeeef] px-4 py-2 rounded-full">
              <div className="flex -space-x-1">
                {lesson.games.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx < currentGameIndex
                        ? "bg-[#0040a1]"
                        : idx === currentGameIndex
                          ? "bg-[#0056d2]"
                          : "bg-[#c3c6d6]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#0040a1]">
                {currentGameIndex + 1} / {lesson.games.length}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#ff9800]" fill="#ff9800" />
              <span className="font-bold text-[#ff9800]">{gameScore}</span>
            </div>

            {/* Streak */}
            {streak > 1 && (
              <div className="flex items-center gap-1 bg-[#ff9800]/10 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-[#ff9800]" />
                <span className="text-xs font-bold text-[#ff9800]">
                  {streak}x Streak
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-32">
        {renderGame()}
      </main>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-8">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentGameIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all active:scale-95 ${
              currentGameIndex === 0
                ? "bg-[#e7e8e9] text-[#737785] cursor-not-allowed"
                : "bg-[#f3f4f5] text-[#0040a1] hover:bg-[#e7e8e9]"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay Lại</span>
          </button>

          {/* Centered Progress Bar */}
          <div className="flex-grow max-w-xl hidden md:block">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Tiến Độ Bài Học
              </span>
              <span className="text-[10px] font-bold text-[#0040a1] uppercase tracking-widest">
                {progress}% Hoàn Thành
              </span>
            </div>
            <div className="h-2 w-full bg-[#e1e3e4] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0040a1] to-[#0056d2] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!showResult}
            className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold transition-all active:scale-95 ${
              showResult
                ? "bg-[#0040a1] text-white hover:bg-[#0056d2]"
                : "bg-[#c3c6d6]/30 text-[#737785] cursor-not-allowed"
            }`}
          >
            <span>
              {currentGameIndex === lesson.games.length - 1
                ? "Hoàn Thành"
                : "Tiếp Theo"}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Achievement Toast */}
      {streak >= 2 && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-[#ffdcbe] px-5 py-3 rounded-full shadow-lg border border-[#ff9800]/10 animate-bounce">
          <div className="w-8 h-8 rounded-lg bg-[#ff9800] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#653900] text-sm">
            {streak}x Streak Active!
          </span>
        </div>
      )}
    </div>
  )
}
