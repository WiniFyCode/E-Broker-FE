"use client"

import { useState } from "react"
import { BranchingContent, BranchingState } from "./types"
import { ArrowRight, Lightbulb } from "lucide-react"

interface BranchingProps {
  content: BranchingContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function Branching({ content, onComplete }: BranchingProps) {
  const [state, setState] = useState<BranchingState>({
    currentNodeId: content.startNodeId,
    visitedNodes: [content.startNodeId],
    choicesMade: [],
    score: 0,
  })

  const currentNode = content.nodes[state.currentNodeId]

  if (!currentNode) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <h2 className="text-3xl font-bold text-[#0040a1] mb-4">
          Lỗi: Không tìm thấy nút kịch bản
        </h2>
      </div>
    )
  }

  const handleChoice = (choiceId: string) => {
    const choice = currentNode.choices.find((c) => c.id === choiceId)
    if (!choice) return

    const newScore = state.score + (choice.isOptimal ? 20 : 10)

    setState((prev) => ({
      ...prev,
      choicesMade: [...prev.choicesMade, { nodeId: state.currentNodeId, choiceId }],
      score: newScore,
    }))

    // Move to next node or complete
    if (choice.nextNodeId) {
      setState((prev) => ({
        ...prev,
        currentNodeId: choice.nextNodeId!,
        visitedNodes: [...prev.visitedNodes, choice.nextNodeId!],
      }))
    } else {
      // End of scenario
      const finalScore = Math.round((newScore / (state.choicesMade.length + 1) / 20) * 100)
      onComplete(true, finalScore)
    }
  }

  if (currentNode.isEndNode) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <h2 className="text-4xl font-bold text-[#0040a1] mb-4">
          Kết thúc kịch bản
        </h2>
        <p className="text-slate-600 mb-6 text-base">{currentNode.description}</p>
        <div className="text-5xl font-bold text-[#006b5e]">
          Điểm: {state.score}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left: Context */}
        <section className="col-span-12 lg:col-span-5 relative">
          <div className="sticky top-32">
            <span className="inline-block px-3 py-1 bg-[#ffdcc3] text-[#542a00] font-bold text-xs mb-6 uppercase tracking-wider rounded-lg">
              Tình huống {state.visitedNodes.length}
            </span>
            <h2 className="font-extrabold text-4xl text-slate-900 leading-[1.1] tracking-[-0.03em] mb-8">
              {currentNode.title}
            </h2>

            <div className="bg-slate-50 p-8 relative overflow-hidden rounded-lg">
              <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                <Lightbulb className="w-32 h-32" />
              </div>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {currentNode.description}
              </p>

              {currentNode.imageUrl && (
                <div className="flex items-center gap-4 mt-6">
                  <div className="w-12 h-12 overflow-hidden bg-slate-200 rounded-lg">
                    <img
                      alt="Scenario"
                      className="w-full h-full object-cover"
                      src={currentNode.imageUrl}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900">
                      Bối cảnh đàm phán
                    </h4>
                    <p className="text-xs text-slate-500">
                      {currentNode.context || "Tình huống thực tế"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right: Choices */}
        <section className="col-span-12 lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-600 text-base uppercase tracking-widest">
              Quyết định của bạn
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#006b5e]" />
              <span className="text-base text-[#006b5e] font-bold">
                Điểm: {state.score}
              </span>
            </div>
          </div>

          {currentNode.choices.map((choice, idx) => (
            <div
              key={choice.id}
              onClick={() => handleChoice(choice.id)}
              className="group cursor-pointer bg-white p-6 border border-slate-200 hover:shadow-2xl transition-all duration-300 active:scale-[0.98] rounded-lg"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 flex items-center justify-center font-black text-[#0040a1] text-xl rounded-lg">
                  {choice.label}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-base mb-2 text-slate-900">
                    {choice.text.split(":")[0]}
                  </h4>
                  <p className="text-base text-slate-600 leading-snug">
                    {choice.text.split(":")[1] || choice.text}
                  </p>
                </div>
                <div className="flex-shrink-0 self-center">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#0040a1] transition-colors" />
                </div>
              </div>
            </div>
          ))}

          {/* Progress indicator */}
          <div className="mt-6 p-8 bg-gradient-to-r from-[#00346f] to-[#004a99] text-white relative overflow-hidden shadow-2xl rounded-lg">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="font-extrabold text-2xl mb-4 leading-tight">
                  Phân tích Chuyên sâu
                </h3>
                <p className="text-slate-200 text-base leading-relaxed mb-6">
                  Trong các cuộc đàm phán bất động sản cao cấp, khả năng giữ bình
                  tĩnh quyết định 80% thành công.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md p-6 border border-white/20">
                <div className="text-4xl font-black mb-2">{state.score}</div>
                <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  Điểm hiện tại
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
