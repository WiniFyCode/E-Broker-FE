"use client"

import { useState } from "react"
import Link from "next/link"
import { Specialization } from "@/lib/training-types"
import { cn } from "@workspace/ui/lib/utils"
import {
  ChevronDown,
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
  Target,
  Star,
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
    Gavel, Map, TrendingUp, Calculator, Wallet,
    Handshake, Megaphone, Receipt, FileText, MessageSquare,
  ]
  return icons[index % icons.length] ?? Gavel
}

const getAdvancedIcon = (index: number): LucideIcon => {
  const icons: LucideIcon[] = [
    TrendingUp, FileText, Calculator, Wallet, MessageSquare,
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
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
    >
      {/* Số thứ tự */}
      <div className={cn(
        "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors",
        isCompleted
          ? "bg-emerald-500 text-white"
          : isInProgress
            ? "bg-primary text-white"
            : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
      )}>
        {isCompleted ? (
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          index + 1
        )}
      </div>

      {/* Nội dung */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors truncate">
          {lesson.title}
        </h4>
        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {lesson.games?.length || 0} bài tập
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~15 phút
          </span>
        </div>
      </div>

      {/* Trạng thái */}
      <div className="flex items-center gap-2 shrink-0">
        {isCompleted && (
          <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            Hoàn thành
          </span>
        )}
        {isInProgress && (
          <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-primary">
            <RefreshCw className="w-4 h-4" />
            Đang học
          </span>
        )}
        {!isCompleted && !isInProgress && (
          <Play className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-primary transition-colors" />
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
  const IconComponent = variant === "basic"
    ? getIconForSpecialization(index)
    : getAdvancedIcon(index)

  const isCompleted = specialization.progress === 100
  const isInProgress = specialization.progress > 0 && specialization.progress < 100
  const isLocked = specialization.isLocked
  const completedLessons = specialization.lessons.filter((l: any) => l.progress === 100).length

  return (
    <div className={cn(
      "rounded-2xl border-2 overflow-hidden transition-all duration-300",
      isCompleted 
        ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30"
        : isInProgress
        ? "bg-white dark:bg-slate-900 border-primary/20 dark:border-primary/20 shadow-sm"
        : isLocked
        ? "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 opacity-75"
        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/50"
    )}>
      {/* Header */}
      <button
        onClick={() => !isLocked && setIsOpen(!isOpen)}
        disabled={isLocked}
        className={cn(
          "w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left transition-colors",
          isLocked
            ? "cursor-not-allowed"
            : "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
        )}
      >
        {/* Icon */}
        <div className={cn(
          "h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
          isLocked 
            ? "bg-slate-200 dark:bg-slate-700" 
            : isCompleted
            ? "bg-emerald-100 dark:bg-emerald-900/30"
            : "bg-primary/10 dark:bg-primary/20"
        )}>
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400" />
          ) : isLocked ? (
            <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
          ) : (
            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className={cn(
              "font-bold text-sm sm:text-base truncate",
              isLocked ? "text-slate-400" : "text-slate-900 dark:text-white"
            )}>
              {specialization.title}
            </h3>
          </div>
          <p className={cn(
            "text-xs truncate",
            isLocked ? "text-slate-400" : "text-slate-500"
          )}>
            {isLocked 
              ? "Hoàn thành các chuyên đề trước để mở khóa" 
              : `${completedLessons}/${specialization.lessons.length} bài học đã hoàn thành`
            }
          </p>
        </div>

        {/* Progress & Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Progress Ring */}
          {!isLocked && (
            <div className="hidden sm:block">
              <div className="relative h-10 w-10">
                <svg className="h-10 w-10 -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-slate-200 dark:text-slate-700"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 16}`}
                    strokeDashoffset={`${2 * Math.PI * 16 * (1 - specialization.progress / 100)}`}
                    className={cn(
                      "transition-all duration-700",
                      isCompleted ? "text-emerald-500" : "text-primary"
                    )}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn(
                    "text-[10px] font-bold",
                    isCompleted ? "text-emerald-600" : "text-primary"
                  )}>
                    {specialization.progress}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Toggle */}
          {!isLocked && (
            <div className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300",
              isOpen 
                ? "bg-primary text-white rotate-180" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-400"
            )}>
              <ChevronDown className="h-5 w-5" />
            </div>
          )}
        </div>
      </button>

      {/* Lessons List */}
      {isOpen && !isLocked && (
        <div className="border-t border-slate-200 dark:border-slate-700/50 animate-in slide-in-from-top-2 duration-300">
          <div className="p-2 sm:p-3 space-y-1">
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
    <div className="space-y-3 sm:space-y-4">
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
