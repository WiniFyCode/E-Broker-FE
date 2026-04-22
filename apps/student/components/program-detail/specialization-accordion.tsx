"use client"

import { useState } from "react"
import Link from "next/link"
import { Specialization } from "@/lib/training-types"
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Lock,
  Gavel,
  TrendingUp,
  Handshake,
  Map,
  FileText,
  Calculator,
  Wallet,
  MessageSquare,
  Megaphone,
  Receipt,
  Play,
  Clock,
  type LucideIcon,
} from "lucide-react"

interface SpecializationAccordionProps {
  specializations: Specialization[]
  programId: string
  variant: "basic" | "advanced"
}

// Map icon theo index
const getIconForSpecialization = (index: number): LucideIcon => {
  const icons: LucideIcon[] = [
    Gavel,
    Map,
    TrendingUp,
    Calculator,
    Wallet,
    Handshake,
    Megaphone,
    Receipt,
    FileText,
    MessageSquare,
  ]
  return icons[index % icons.length] ?? Gavel
}

const getAdvancedIcon = (index: number): LucideIcon => {
  const icons: LucideIcon[] = [
    TrendingUp,
    FileText,
    Calculator,
    Wallet,
    MessageSquare,
  ]
  return icons[index % icons.length] ?? TrendingUp
}

// Component Lesson Item
function LessonItem({
  lesson,
  specializationId,
  programId,
  index,
}: {
  lesson: any
  specializationId: string
  programId: string
  index: number
}) {
  const isCompleted = lesson.progress === 100
  const isInProgress = lesson.progress > 0 && lesson.progress < 100

  return (
    <Link
      href={`/training/program/${programId}/specialization/${specializationId}/lesson/${lesson.id}`}
      className="group flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-[#f0f4ff]"
    >
      {/* Số thứ tự */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
          isCompleted
            ? "bg-[#0040a1] text-white"
            : isInProgress
              ? "bg-[#ff9800] text-white"
              : "bg-[#e7e8e9] text-[#737785]"
        }`}
      >
        {index + 1}
      </div>

      {/* Nội dung */}
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-semibold text-[#1a1d23] transition-colors group-hover:text-[#0040a1]">
          {lesson.title}
        </h4>
        <div className="mt-1 flex items-center gap-4 text-xs text-[#737785]">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {lesson.games?.length || 0} bài tập
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            ~15 phút
          </span>
        </div>
      </div>

      {/* Trạng thái */}
      <div className="flex shrink-0 items-center gap-2">
        {isCompleted && (
          <span className="flex items-center gap-1 text-xs font-semibold text-[#0040a1]">
            <CheckCircle2 className="h-4 w-4" />
            Hoàn thành
          </span>
        )}
        {isInProgress && (
          <span className="flex items-center gap-1 text-xs font-semibold text-[#ff9800]">
            <RefreshCw className="h-4 w-4" />
            Đang học
          </span>
        )}
        {!isCompleted && !isInProgress && (
          <Play className="h-5 w-5 text-[#737785] transition-colors group-hover:text-[#0040a1]" />
        )}
      </div>
    </Link>
  )
}

// Component Accordion Item
function AccordionItem({
  specialization,
  programId,
  variant,
  index,
  defaultOpen = false,
}: {
  specialization: Specialization
  programId: string
  variant: "basic" | "advanced"
  index: number
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const IconComponent =
    variant === "basic"
      ? getIconForSpecialization(index)
      : getAdvancedIcon(index)

  const isCompleted = specialization.progress === 100
  const isInProgress =
    specialization.progress > 0 && specialization.progress < 100
  const isLocked = specialization.isLocked

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e7e8e9]/50 bg-white shadow-sm">
      {/* Header */}
      <button
        onClick={() => !isLocked && setIsOpen(!isOpen)}
        disabled={isLocked}
        className={`flex w-full items-center gap-4 p-5 text-left transition-colors ${
          isLocked
            ? "cursor-not-allowed bg-[#f8f9fa]"
            : "cursor-pointer hover:bg-[#f0f4ff]"
        }`}
      >
        {/* Icon */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            isLocked ? "bg-[#e7e8e9] opacity-50 grayscale" : "bg-[#dae2ff]"
          }`}
        >
          <IconComponent
            className={`h-6 w-6 ${isLocked ? "text-[#737785]" : "text-[#0040a1]"}`}
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3
              className={`truncate text-lg font-bold ${isLocked ? "text-[#737785]" : "text-[#1a1d23]"}`}
            >
              {specialization.title}
            </h3>
            {isLocked && <Lock className="h-4 w-4 text-[#737785]" />}
          </div>
          <p
            className={`truncate text-sm ${isLocked ? "text-[#a0a3a8]" : "text-[#737785]"}`}
          >
            {specialization.description}
          </p>
        </div>

        {/* Progress & Toggle */}
        <div className="flex shrink-0 items-center gap-4">
          {/* Progress bar */}
          <div className="hidden flex-col items-end gap-1 sm:flex">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span
                className={
                  isCompleted
                    ? "text-[#0040a1]"
                    : isInProgress
                      ? "text-[#ff9800]"
                      : "text-[#737785]"
                }
              >
                {specialization.progress}%
              </span>
              <span className="text-[#a0a3a8]">
                {specialization.lessons.length} bài
              </span>
            </div>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#e7e8e9]">
              <div
                className={`h-full rounded-full transition-all ${
                  isCompleted
                    ? "bg-[#0040a1]"
                    : isInProgress
                      ? "bg-[#ff9800]"
                      : "bg-[#c3c6d6]"
                }`}
                style={{ width: `${specialization.progress}%` }}
              />
            </div>
          </div>

          {/* Toggle */}
          {!isLocked && (
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                isOpen
                  ? "rotate-180 bg-[#0040a1] text-white"
                  : "bg-[#e7e8e9] text-[#737785]"
              }`}
            >
              <ChevronDown className="h-5 w-5" />
            </div>
          )}
        </div>
      </button>

      {/* Lessons List */}
      {isOpen && !isLocked && (
        <div className="border-t border-[#e7e8e9]/50">
          <div className="space-y-2 p-4">
            {specialization.lessons.map((lesson, idx) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                specializationId={specialization.id}
                programId={programId}
                index={idx}
              />
            ))}
          </div>
        </div>
      )}

      {/* Locked overlay */}
      {isLocked && (
        <div className="px-5 pb-4">
          <div className="rounded-xl bg-[#f8f9fa] p-4 text-center text-sm text-[#737785]">
            <Lock className="mr-2 inline h-4 w-4" />
            Hoàn thành các chuyên đề trước để mở khóa
          </div>
        </div>
      )}
    </div>
  )
}

// Component chính
export function SpecializationAccordion({
  specializations,
  programId,
  variant,
}: SpecializationAccordionProps) {
  return (
    <div className="space-y-4">
      {specializations.map((spec, index) => (
        <AccordionItem
          key={spec.id}
          specialization={spec}
          programId={programId}
          variant={variant}
          index={index}
          defaultOpen={variant === "basic" && index === 0}
        />
      ))}
    </div>
  )
}
