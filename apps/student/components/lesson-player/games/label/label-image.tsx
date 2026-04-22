"use client"

import { useState } from "react"
import { LabelContent, LabelState } from "./types"
import { GripVertical, Info, Image, User, DollarSign, RefreshCw, CheckCircle, Lightbulb } from "lucide-react"

interface LabelImageProps {
  content: LabelContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function LabelImage({ content, onComplete }: LabelImageProps) {
  const [state, setState] = useState<LabelState>({
    placements: {},
    isSubmitted: false,
    results: {},
  })

  const [draggedLabel, setDraggedLabel] = useState<string | null>(null)

  const handleDragStart = (labelId: string) => {
    setDraggedLabel(labelId)
  }

  const handleDrop = (zoneId: string) => {
    if (draggedLabel && !state.isSubmitted) {
      setState((prev) => ({
        ...prev,
        placements: {
          ...prev.placements,
          [zoneId]: draggedLabel,
        },
      }))
      setDraggedLabel(null)
    }
  }

  const handleReset = () => {
    setState({
      placements: {},
      isSubmitted: false,
      results: {},
    })
  }

  const handleSubmit = () => {
    const results: Record<string, boolean> = {}
    let correctCount = 0

    content.zones.forEach((zone) => {
      const placedLabelId = state.placements[zone.id]
      const isCorrect = placedLabelId === zone.correctLabelId
      results[zone.id] = isCorrect
      if (isCorrect) correctCount++
    })

    setState((prev) => ({
      ...prev,
      isSubmitted: true,
      results,
    }))

    const score = Math.round((correctCount / content.zones.length) * 100)
    const isCorrect = correctCount === content.zones.length

    onComplete(isCorrect, score)
  }

  const getIcon = (icon?: string) => {
    switch (icon) {
      case "info":
        return <Info className="w-4 h-4" />
      case "image":
        return <Image className="w-4 h-4" />
      case "person":
        return <User className="w-4 h-4" />
      case "payments":
        return <DollarSign className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const allPlaced = content.zones.every((zone) => state.placements[zone.id])

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Image and Description */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="p-6 bg-white border border-[#E2E8F0] border-l-4 border-l-[#004A99] rounded-lg">
            <h2 className="font-bold text-2xl text-[#004A99] mb-4 leading-tight">
              {content.title}
            </h2>
            <p className="text-[#64748B] leading-relaxed text-base">
              {content.description}
            </p>
          </div>

          {/* Image with Zones */}
          <div className="bg-[#f0f4f8] p-4 border border-[#E2E8F0] rounded-lg">
            <div className="relative overflow-hidden aspect-[16/10] bg-white border border-[#E2E8F0]/20 rounded-lg">
              <img
                className="w-full h-full object-cover opacity-90"
                src={content.imageUrl}
                alt={content.title}
              />

              {/* Grid Overlay with Drop Zones */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
                {content.zones.map((zone) => {
                  const placedLabelId = state.placements[zone.id]
                  const placedLabel = content.labels.find(
                    (l) => l.id === placedLabelId
                  )
                  const isCorrect = state.results[zone.id]

                  return (
                    <div
                      key={zone.id}
                      className={`pointer-events-auto border-2 flex items-center justify-center ${
                        state.isSubmitted
                          ? isCorrect
                            ? "border-green-500/60 bg-green-500/10"
                            : "border-red-500/60 bg-red-500/10"
                          : placedLabel
                            ? "border-[#006b5e]/60 bg-[#006b5e]/10"
                            : "border-[#004A99]/40 bg-[#004A99]/5"
                      }`}
                      style={{
                        gridColumn: `${zone.x} / span ${zone.width}`,
                        gridRow: `${zone.y} / span ${zone.height}`,
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(zone.id)}
                    >
                      <div className="text-[10px] font-bold uppercase bg-white/80 px-2 py-1 border text-center">
                        {placedLabel ? (
                          <span className="text-[#004A99]">{placedLabel.text}</span>
                        ) : (
                          <span className="text-[#004A99]/60">
                            Thả: {zone.label}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="flex justify-between items-center bg-white p-6 border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#006b5e] flex items-center justify-center text-white">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-xl text-[#004A99]">
                  Tiến độ kịch bản
                </div>
                <div className="text-xs text-[#64748B] uppercase tracking-widest font-bold">
                  {Math.round(
                    (Object.keys(state.placements).length / content.zones.length) *
                      100
                  )}
                  % Hoàn thành
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#737783] uppercase font-bold tracking-widest">
                Điểm màn chơi
              </div>
              <div className="text-4xl font-black text-[#006b5e]">
                {state.isSubmitted
                  ? Math.round(
                      (Object.values(state.results).filter((r) => r).length /
                        content.zones.length) *
                        100
                    )
                  : 0}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Labels and Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#dfe3e7] border border-[#E2E8F0] flex flex-col rounded-lg">
            <div className="p-6 bg-[#004A99] text-white flex items-center justify-between rounded-t-lg">
              <h3 className="font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <GripVertical className="w-4 h-4" />
                Danh sách nhãn
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {content.labels.map((label) => {
                const isUsed = Object.values(state.placements).includes(label.id)

                return (
                  <div
                    key={label.id}
                    draggable={!state.isSubmitted && !isUsed}
                    onDragStart={() => handleDragStart(label.id)}
                    className={`group bg-white p-6 flex items-center gap-4 border border-[#E2E8F0] shadow-sm transition-all rounded-lg ${
                      state.isSubmitted || isUsed
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-grab active:cursor-grabbing hover:border-[#004A99] active:scale-[0.98]"
                    }`}
                  >
                    <div className="w-6 h-10 bg-[radial-gradient(circle,#c2c6d3_1px,transparent_1px)] bg-[length:4px_4px] opacity-40"></div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#737783] uppercase tracking-widest mb-1">
                        Thành phần
                      </div>
                      <div className="font-semibold text-base text-[#171c1f]">
                        {label.text}
                      </div>
                    </div>
                    <span className="text-[#c2c6d3] group-hover:text-[#004A99]">
                      {getIcon(label.icon)}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="p-6 bg-[#e4e9ed] border-t border-[#E2E8F0] flex flex-col gap-4 rounded-b-lg">
              <button
                onClick={handleSubmit}
                disabled={!allPlaced || state.isSubmitted}
                className={`w-full py-4 font-bold text-base tracking-wide transition-all flex items-center justify-center gap-2 rounded-lg ${
                  allPlaced && !state.isSubmitted
                    ? "bg-[#004A99] text-white active:scale-[0.98]"
                    : "bg-[#c2c6d3] text-[#737783] cursor-not-allowed"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                KIỂM TRA ĐÁP ÁN
              </button>

              <button
                onClick={handleReset}
                className="w-full bg-transparent border border-[#737783] text-[#171c1f] py-4 font-bold text-base uppercase tracking-widest hover:bg-[#dfe3e7] transition-colors flex items-center justify-center gap-2 rounded-lg"
              >
                <RefreshCw className="w-4 h-4" />
                LÀM LẠI
              </button>
            </div>
          </div>

          {/* Hint */}
          <div className="bg-white p-6 border border-[#E2E8F0] border-r-4 border-r-[#004A99] rounded-lg">
            <div className="flex gap-4">
              <Lightbulb className="w-5 h-5 text-[#004A99]" />
              <div className="text-base text-[#64748B] leading-relaxed">
                <span className="font-bold text-[#004A99] block mb-1">
                  Mẹo chuyên gia:
                </span>
                Giá niêm yết (Listing Price) thường được đặt ở vị trí nổi bật
                nhất bên cạnh tiêu đề hoặc thông tin liên hệ để thu hút sự chú ý
                ngay lập tức.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {state.isSubmitted && (
        <div className="mt-8">
          <div
            className={`p-6 rounded-lg ${
              Object.values(state.results).every((r) => r)
                ? "bg-green-50 border border-green-200"
                : "bg-amber-50 border border-amber-200"
            }`}
          >
            <h4
              className={`font-bold text-lg mb-2 ${
                Object.values(state.results).every((r) => r)
                  ? "text-green-900"
                  : "text-amber-900"
              }`}
            >
              {Object.values(state.results).every((r) => r)
                ? "✓ Hoàn hảo! Tất cả đều đúng"
                : "Một số nhãn chưa chính xác"}
            </h4>
          </div>
        </div>
      )}
    </div>
  )
}
