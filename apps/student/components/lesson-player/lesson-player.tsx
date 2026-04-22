"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Lesson, Game } from "@/lib/training-types"
import { GameResult } from "./games/framework/types"
import { X, ArrowLeft, ArrowRight, Award, Trophy, Zap } from "lucide-react"
import {
  Quiz,
  FillBlank,
  Match,
  Sequence,
  Hotspot,
  LabelImage,
  MemoryFlip,
  WordScramble,
  Crossword,
  Swipe,
  Branching,
  TimedSprint,
} from "./games"

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

  if (!currentGame) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-slate-600">Không tìm thấy game</p>
      </div>
    )
  }

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
    const gameProps = {
      content: currentGame.content,
      onComplete: (isCorrect: boolean, score: number) => {
        handleGameComplete({
          gameId: currentGame.id,
          score,
          maxScore: 100,
          isPassed: isCorrect,
          attempts: 1,
          timeSpent: 0,
        })
      },
    }

    switch (currentGame.type) {
      case "quiz":
        return <Quiz {...gameProps} />
      case "fill-blank":
        return <FillBlank {...gameProps} />
      case "match":
        return <Match {...gameProps} />
      case "sequence":
        return <Sequence {...gameProps} />
      case "hotspot":
        return <Hotspot {...gameProps} />
      case "label":
        return <LabelImage {...gameProps} />
      case "memory":
        return <MemoryFlip {...gameProps} />
      case "word-scramble":
        return <WordScramble {...gameProps} />
      case "crossword":
        return <Crossword {...gameProps} />
      case "swipe":
        return <Swipe {...gameProps} />
      case "branching":
        return <Branching {...gameProps} />
      case "timed-sprint":
        return <TimedSprint {...gameProps} />
      default:
        return (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">
              Game type "{currentGame.type}" not yet implemented
            </p>
          </div>
        )
    }
  }

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
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200">
        <div className="flex justify-between items-center w-full px-4 md:px-6 py-3 max-w-7xl mx-auto">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Link
              href="/training/program/prog-1"
              className="p-2 hover:bg-slate-100 transition-colors rounded-lg flex items-center justify-center shrink-0"
            >
              <X className="w-5 h-5 text-slate-600" />
            </Link>
            <div className="flex flex-col min-w-0">
              <h1 className="font-bold text-slate-900 text-sm md:text-base truncate">
                {lesson.title}
              </h1>
              <span className="text-[10px] font-medium text-slate-500 hidden sm:block">
                {specializationTitle}
              </span>
            </div>
          </div>

          {/* Right: Progress + Score */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
              <span className="text-xs font-bold text-slate-600">
                {currentGameIndex + 1}/{lesson.games.length}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-amber-500" fill="#f59e0b" />
              <span className="text-xs font-bold text-amber-600">{gameScore}</span>
            </div>

            {/* Streak - hidden on mobile */}
            {streak > 1 && (
              <div className="hidden md:flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-amber-600">{streak}x</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 md:px-6 pt-20 pb-24">
        {renderGame()}
      </main>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          {/* Progress Bar - Full width on mobile, centered on desktop */}
          <div className="mb-3 md:hidden">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-medium text-slate-500">
                Tiến độ
              </span>
              <span className="text-[10px] font-bold text-blue-600">
                {progress}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentGameIndex === 0}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-bold text-sm transition-all ${
                currentGameIndex === 0
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>

            {/* Progress Bar - Desktop only */}
            <div className="flex-grow max-w-md hidden md:block">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-medium text-slate-500">
                  Tiến độ bài học
                </span>
                <span className="text-[10px] font-bold text-blue-600">
                  {progress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!showResult}
              className={`flex items-center gap-2 px-6 md:px-10 py-2.5 md:py-3 rounded-lg font-bold text-sm transition-all ${
                showResult
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>
                {currentGameIndex === lesson.games.length - 1
                  ? "Hoàn thành"
                  : "Tiếp theo"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Achievement Toast */}
      {streak >= 2 && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg shadow-lg border border-amber-200">
          <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-amber-900 text-sm">
            {streak}x Streak!
          </span>
        </div>
      )}
    </div>
  )
}
