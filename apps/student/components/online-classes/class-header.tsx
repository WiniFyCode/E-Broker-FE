"use client"

import { Globe, PlayCircle, User, Users } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import type { OnlineClass } from "./online-class-card"

const statusStyles = {
  available: {
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200",
    button: "bg-primary hover:bg-primary-container text-white",
  },
  full: {
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200",
    button: "bg-slate-300 cursor-not-allowed text-slate-500",
  },
  waitlist: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200",
    button: "bg-amber-500 hover:bg-amber-600 text-white",
  },
  ended: {
    badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200",
    button: "bg-slate-300 cursor-not-allowed text-slate-500",
  },
}

interface ClassHeaderProps {
  classItem: OnlineClass
  participantCount: number
  onRegisterClick?: () => void
}

export function ClassHeader({ classItem, participantCount, onRegisterClick }: ClassHeaderProps) {
  const statusStyle = statusStyles[classItem.status]

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Main Info Card */}
      <div className="flex-1 bg-surface-container-lowest rounded-2xl border border-outline-variant/15 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <Badge variant="outline" className="mb-3 text-primary border-primary/30">
              {classItem.courseName}
            </Badge>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {classItem.title}
            </h1>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "px-3 py-1 text-sm font-medium flex-shrink-0",
              statusStyle.badge
            )}
          >
            {classItem.statusText}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-slate-400" />
            {classItem.instructor}
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-slate-400" />
            {classItem.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-slate-400" />
            {participantCount} học viên
          </span>
        </div>
      </div>

      {/* Right: Date & Action Card */}
      <div className="lg:w-72 bg-surface-container-lowest rounded-2xl border border-outline-variant/15 p-6 flex flex-col items-center text-center">
        <div className="flex flex-col items-center justify-center w-24 h-24 bg-primary rounded-2xl mb-4">
          <span className="text-xs text-white/80 font-medium uppercase">
            {classItem.dayOfWeek}
          </span>
          <span className="text-4xl font-bold text-white">
            {classItem.day}
          </span>
          <span className="text-xs text-white/80">
            {classItem.month}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-1">{classItem.timeRange}</p>
        <p className="text-xs text-slate-400 mb-6">
          {new Date(classItem.date).toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <Button
          className={cn(
            "w-full rounded-full",
            statusStyle.button
          )}
          disabled={classItem.status === "full" || classItem.status === "ended"}
          onClick={onRegisterClick}
        >
          <PlayCircle className="h-4 w-4 mr-2" />
          {classItem.status === "available"
            ? "Đăng ký ngay"
            : classItem.status === "waitlist"
            ? "Vào danh sách chờ"
            : classItem.status === "full"
            ? "Hết chỗ"
            : "Đã kết thúc"}
        </Button>
      </div>
    </div>
  )
}
