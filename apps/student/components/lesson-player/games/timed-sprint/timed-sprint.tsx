"use client"

import { useState, useEffect } from "react"
import { TimedSprintContent, TimedSprintState } from "./types"
import { Clock, CheckCircle, XCircle } from "lucide-react"

interface TimedSprintProps {
  content: TimedSprintContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function TimedSprint({ content, onComplete }: TimedSprintProps) {
  const [state, setState] = useState<TimedSprintState>({
    currentQuestionIndex: 0,
    answers: {},
    correctCount: 0,
    incorrectCount: 0,
    timeRemaining: content.timeLimit,
    isCompleted: false,
  })

  // Timer countdown
  useEffect(() => {
    if (state.isCompleted || state.timeRemaining <= 0) {
      if (state.timeRemaining <= 0 && !state.isCompleted) {
        handleComplete()
      }
      return
    }

    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1),
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [state.isCompleted, state.timeRemaining])

  const currentQuestion = content.questions[state.currentQuestionIndex]

  if (!currentQuestion) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <h2 className="text-3xl font-bold text-[#0040a1] mb-4">
          Hoàn thành Sprint!
        </h2>
      </div>
    )
  }

  const progress = Math.round(
    (state.currentQuestionIndex / content.questions.length) * 100
  )

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === currentQuestion.correctAnswer

    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answerIndex,
      },
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      incorrectCount: prev.incorrectCount + (isCorrect ? 0 : 1),
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }))

    // Check if all questions answered
    if (state.currentQuestionIndex + 1 >= content.questions.length) {
      handleComplete()
    }
  }

  const handleComplete = () => {
    const accuracy = (state.correctCount / content.questions.length) * 100
    const timeBonus = Math.round((state.timeRemaining / content.timeLimit) * 20)
    const finalScore = Math.min(100, Math.round(accuracy + timeBonus))

    setState((prev) => ({ ...prev, isCompleted: true }))
    onComplete(accuracy >= content.passingScore, finalScore)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (state.isCompleted || state.currentQuestionIndex >= content.questions.length) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <h2 className="text-3xl font-bold text-[#0040a1] mb-4">
          Hoàn thành Sprint!
        </h2>
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          <div className="bg-[#006b5e]/10 p-6">
            <div className="text-4xl font-bold text-[#006b5e] mb-2">
              {state.correctCount}
            </div>
            <div className="text-sm text-slate-600">Chính xác</div>
          </div>
          <div className="bg-[#ba1a1a]/10 p-6">
            <div className="text-4xl font-bold text-[#ba1a1a] mb-2">
              {state.incorrectCount}
            </div>
            <div className="text-sm text-slate-600">Sai sót</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Main Question Area */}
        <div className="col-span-12 lg:col-span-8">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block px-3 py-1 bg-[#0040a1] text-white font-bold text-xs mb-4 tracking-widest">
              THỬ THÁCH CUỐI CÙNG
            </span>
            <h1 className="font-extrabold text-5xl md:text-6xl tracking-[-0.03em] text-[#0040a1] leading-tight">
              {content.title}
            </h1>
            <div className="w-24 h-2 bg-[#006b5e] mt-6" />
          </div>

          {/* Question Card */}
          <div className="bg-slate-50 p-10 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <span className="font-bold text-sm text-slate-500">
                CÂU HỎI {state.currentQuestionIndex + 1} /{" "}
                {content.questions.length}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-1 ${
                      idx <= Math.floor(progress / 25)
                        ? "bg-[#006b5e]"
                        : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-10 text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full text-left p-6 bg-white hover:bg-slate-50 group transition-all duration-200 border-l-4 border-transparent hover:border-[#0040a1] active:scale-[0.99] flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-black text-xl text-slate-400 group-hover:text-[#0040a1]">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-lg font-medium">{option}</span>
                  </div>
                  <span className="text-slate-400 group-hover:text-[#0040a1]">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 sticky top-24 space-y-8">
          {/* Timer */}
          <div className="bg-[#0040a1] p-8 shadow-2xl text-white overflow-hidden relative">
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#9cefde"
                    strokeWidth="8"
                    strokeLinecap="square"
                    strokeDasharray="283"
                    strokeDashoffset={
                      283 - (state.timeRemaining / content.timeLimit) * 283
                    }
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black tracking-tighter">
                    {formatTime(state.timeRemaining).split(":")[1]}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest opacity-70">
                    GIÂY CÒN LẠI
                  </span>
                </div>
              </div>
              <p className="text-center text-xs opacity-80 leading-relaxed uppercase tracking-widest px-4">
                Thời gian suy nghĩ ảnh hưởng điểm thưởng
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-slate-50 p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#0040a1]">Tiến trình</h3>
              <span className="font-bold text-[#006b5e]">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-[#006b5e] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 border-b-2 border-[#006b5e]">
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                  Chính xác
                </span>
                <span className="text-2xl font-extrabold text-[#006b5e]">
                  {state.correctCount}
                </span>
              </div>
              <div className="bg-white p-4 border-b-2 border-[#ba1a1a]">
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                  Sai sót
                </span>
                <span className="text-2xl font-extrabold text-[#ba1a1a]">
                  {state.incorrectCount}
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden h-48 shadow-xl">
            <img
              alt="Phòng họp sang trọng"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
