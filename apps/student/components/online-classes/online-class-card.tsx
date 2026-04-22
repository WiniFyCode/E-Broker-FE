"use client"

import Link from "next/link"
import { Clock, Globe, User, ChevronRight, PlayCircle } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export interface OnlineClass {
  id: string
  title: string
  date: string
  dayOfWeek: string
  day: number
  month: string
  timeRange: string
  language: string
  courseName: string
  instructor: string
  status: "available" | "full" | "waitlist" | "ended"
  statusText: string
  meetingLink?: string | null
}

interface OnlineClassCardProps {
    classItem: OnlineClass
}

const statusStyles = {
    available: {
        badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
        icon: "text-green-600 dark:text-green-400",
    },
    full: {
        badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
        icon: "text-red-600 dark:text-red-400",
    },
    waitlist: {
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
        icon: "text-amber-600 dark:text-amber-400",
    },
    ended: {
        badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700",
        icon: "text-slate-500",
    },
}

export function OnlineClassCard({ classItem }: OnlineClassCardProps) {
    const statusStyle = statusStyles[classItem.status]

    return (
        <Link
            href={`/online-classes/${classItem.id}`}
            className={cn(
                "group flex items-start sm:items-center gap-4 p-4 sm:p-5",
                "bg-surface-container-lowest rounded-xl border border-outline-variant/15",
                "hover:shadow-md hover:border-primary/20 transition-all duration-200"
            )}
        >
            {/* Date Column */}
            <div className="flex flex-col items-center justify-center w-14 sm:w-16 flex-shrink-0 text-center bg-surface-container rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">
                    {classItem.dayOfWeek}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary">
                    {classItem.day}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {classItem.month}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1">
                    {classItem.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs sm:text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {classItem.timeRange}
                    </span>
                    <span className="flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5" />
                        {classItem.language}
                    </span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span className="text-slate-700 dark:text-slate-300 hidden sm:inline">
                        {classItem.courseName}
                    </span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {classItem.instructor}
                    </span>
                </div>
            </div>

            {/* Status & Action */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 flex-shrink-0">
                <span className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full border",
                    statusStyle.badge
                )}>
                    {classItem.statusText}
                </span>
                <div className="flex items-center gap-1 text-primary">
                    <PlayCircle className="h-5 w-5" />
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </Link>
    )
}
