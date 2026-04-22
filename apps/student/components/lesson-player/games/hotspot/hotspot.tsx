"use client"

import { useState } from "react"
import { HotspotContent, HotspotState } from "./types"
import { Droplet, Zap, Building2, Timer, CheckCircle } from "lucide-react"

interface HotspotProps {
  content: HotspotContent
  onComplete: (isCorrect: boolean, score: number) => void
}

export function Hotspot({ content, onComplete }: HotspotProps) {
  const [state, setState] = useState<HotspotState>({
    foundHotspots: new Set(),
    isCompleted: false,
  })

  const handleHotspotClick = (hotspotId: string) => {
    if (state.isCompleted) return

    const newFound = new Set(state.foundHotspots)
    newFound.add(hotspotId)

    const isCompleted = newFound.size === content.hotspots.length

    setState({
      foundHotspots: newFound,
      isCompleted,
    })

    if (isCompleted) {
      const score = 100
      onComplete(true, score)
    }
  }

  const getIconComponent = (icon?: string) => {
    switch (icon) {
      case "water_drop":
        return <Droplet className="w-3.5 h-3.5" />
      case "electric_bolt":
        return <Zap className="w-3.5 h-3.5" />
      case "architecture":
        return <Building2 className="w-3.5 h-3.5" />
      default:
        return <Droplet className="w-3.5 h-3.5" />
    }
  }

  const getColorClass = (type?: string) => {
    switch (type) {
      case "error":
        return {
          pulse: "bg-red-500/30",
          dot: "bg-red-500",
          text: "text-red-500",
        }
      case "tertiary":
        return {
          pulse: "bg-[#542a00]/30",
          dot: "bg-[#542a00]",
          text: "text-[#542a00]",
        }
      default:
        return {
          pulse: "bg-[#004A99]/30",
          dot: "bg-[#004A99]",
          text: "text-[#004A99]",
        }
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Main Inspection Canvas */}
      <div className="flex-grow relative group overflow-hidden rounded-lg bg-[#f0f4f8] shadow-[0px_24px_48px_rgba(23,28,31,0.06)]">
        {/* Title Overlay */}
        <div className="absolute top-8 left-8 z-10 max-w-md pointer-events-none">
          <h2 className="text-4xl font-bold text-[#004A99] leading-tight mb-4">
            {content.title}
          </h2>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-sm pointer-events-auto">
            <p className="text-[#424751] text-base font-medium leading-relaxed">
              {content.instruction || content.description}
            </p>
          </div>
        </div>

        {/* Main Image */}
        <div className="w-full h-full min-h-[600px] relative">
          <img
            alt={content.subtitle}
            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
            src={content.imageUrl}
          />

          {/* Hotspots */}
          {content.hotspots.map((hotspot) => {
            const isFound = state.foundHotspots.has(hotspot.id)
            const colors = getColorClass(hotspot.type)

            return (
              <div
                key={hotspot.id}
                className={`absolute group/hotspot ${isFound ? "cursor-default" : "cursor-pointer"}`}
                style={{
                  top: `${hotspot.y}%`,
                  left: `${hotspot.x}%`,
                }}
                onClick={() => !isFound && handleHotspotClick(hotspot.id)}
              >
                <div className="relative flex items-center justify-center">
                  {/* Pulse Ring */}
                  {!isFound && (
                    <div
                      className={`absolute w-12 h-12 rounded-full ${colors.pulse} animate-ping`}
                    ></div>
                  )}

                  {/* Dot */}
                  <div
                    className={`relative w-6 h-6 rounded-full ${colors.dot} border-2 border-white flex items-center justify-center shadow-lg transition-transform ${
                      isFound
                        ? "scale-110"
                        : "group-hover/hotspot:scale-125"
                    }`}
                  >
                    {isFound ? (
                      <CheckCircle className="w-3.5 h-3.5 text-white" fill="currentColor" />
                    ) : (
                      <span className="text-white">
                        {getIconComponent(hotspot.icon)}
                      </span>
                    )}
                  </div>

                  {/* Label Tooltip */}
                  <div
                    className={`absolute left-full ml-4 opacity-0 group-hover/hotspot:opacity-100 transition-all duration-300 translate-x-2 group-hover/hotspot:translate-x-0 ${
                      isFound ? "opacity-100 translate-x-0" : ""
                    }`}
                  >
                    <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap shadow-xl">
                      <span className={`font-bold text-xs ${colors.text}`}>
                        {hotspot.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Feedback */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-4 rounded-full flex items-center gap-6 shadow-2xl border border-white/40">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#006b5e]"></div>
            <span className="text-base font-bold text-[#171c1f]">
              Đã phát hiện: {state.foundHotspots.size}/{content.hotspots.length}
            </span>
          </div>
          <div className="h-4 w-[1px] bg-[#c2c6d3]/40"></div>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-[#737783]" />
            <span className="text-base font-medium text-[#737783]">01:45</span>
          </div>
        </div>
      </div>

      {/* Side Panel: Inspection Logs */}
      <aside className="w-full md:w-80 flex flex-col gap-4">
        <div className="bg-white rounded-lg p-6 shadow-[0px_24px_48px_rgba(23,28,31,0.06)] border border-[#c2c6d3]/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#004A99] tracking-tight text-xl">
              Nhật ký kiểm tra
            </h3>
            <CheckCircle className="w-5 h-5 text-[#737783]" />
          </div>

          <div className="space-y-4">
            {state.foundHotspots.size === 0 ? (
              <div className="p-6 rounded-lg bg-[#eaeef2] border border-dashed border-[#c2c6d3]/50 flex flex-col items-center text-center">
                <p className="text-xs font-medium text-[#424751] uppercase tracking-wider">
                  Chưa có dữ liệu
                </p>
                <p className="text-base text-[#737783] mt-1 italic">
                  Hãy nhấp vào các điểm đỏ trên màn hình
                </p>
              </div>
            ) : (
              Array.from(state.foundHotspots).map((hotspotId) => {
                const hotspot = content.hotspots.find((h) => h.id === hotspotId)
                if (!hotspot) return null

                const colors = getColorClass(hotspot.type)

                return (
                  <div
                    key={hotspotId}
                    className={`p-6 rounded-lg bg-white shadow-sm border-l-4 ${colors.dot.replace("bg-", "border-")} flex gap-3`}
                  >
                    <div className="flex-shrink-0">
                      <span className={colors.text}>
                        {getIconComponent(hotspot.icon)}
                      </span>
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#171c1f]">
                        {hotspot.label}
                      </p>
                      <p className="text-xs text-[#737783] leading-snug mt-1">
                        Đã phát hiện và ghi nhận
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Score Gauge */}
        <div className="bg-white rounded-lg p-6 shadow-[0px_24px_48px_rgba(23,28,31,0.06)] border border-[#c2c6d3]/10 flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                className="text-[#e4e9ed]"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
              ></circle>
              <circle
                className="text-[#542a00] transition-all duration-500"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                stroke="currentColor"
                strokeDasharray="364"
                strokeDashoffset={
                  364 - (364 * state.foundHotspots.size) / content.hotspots.length
                }
                strokeLinecap="round"
                strokeWidth="8"
              ></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-[#171c1f] tracking-tighter">
                {Math.round(
                  (state.foundHotspots.size / content.hotspots.length) * 100
                )}
                %
              </span>
              <span className="text-xs font-bold text-[#737783] uppercase tracking-widest">
                Độ chính xác
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
