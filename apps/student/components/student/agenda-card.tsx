"use client"

import Link from "next/link"
import { ClockIcon, VideoIcon, CalendarIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar"
import type { AgendaItem } from "@/lib/types"

interface AgendaCardProps {
  item: AgendaItem
}

export function AgendaCard({ item }: AgendaCardProps) {
  const isModule = item.type === "module"
  const isWebinar = item.type === "webinar"

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-5 transition-shadow duration-300 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900">
      {/* Dấu streak nóng cho webinar */}
      {isWebinar && (
        <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-amber-500" />
      )}

      {/* Header */}
      <div className={`flex items-start justify-between ${isWebinar ? "pl-2" : ""}`}>
        {isModule && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Tiếp Theo
          </span>
        )}

        {isWebinar && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
            <VideoIcon className="h-3.5 w-3.5" />
            Webinar Trực Tiếp
          </span>
        )}

        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          {isModule && <ClockIcon className="h-3.5 w-3.5" />}
          {isWebinar && <CalendarIcon className="h-3.5 w-3.5" />}
          {isModule && item.duration}
          {isWebinar && item.startsIn && (
            <span className="font-bold text-amber-600 dark:text-amber-400">
              Bắt đầu sau {item.startsIn}
            </span>
          )}
        </span>
      </div>

      {/* Nội dung */}
      <div className={isWebinar ? "pl-2" : ""}>
        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500 line-clamp-2 dark:text-slate-400">
          {item.subtitle}
        </p>
      </div>

      {/* Giảng viên & người tham dự webinar */}
      {isWebinar && item.instructors && (
        <div className={`flex items-center gap-3 pt-2 ${isWebinar ? "pl-2" : ""}`}>
          <div className="flex -space-x-2">
            {item.instructors.map((instructor, index) => (
              <Avatar key={index} className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900">
                <AvatarImage src={instructor.avatar} alt={instructor.name} />
              </Avatar>
            ))}
          </div>
          {item.attendeeCount && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              +{item.attendeeCount} đang tham dự
            </span>
          )}
        </div>
      )}

      {/* Tiến độ module */}
      {isModule && item.progress !== undefined && (
        <div className="mt-auto pt-2">
          <div className="mb-1.5 flex justify-between text-xs font-medium">
            <span className="text-slate-500">Tiến độ</span>
            <span className="font-bold text-blue-600">{item.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Nút hành động */}
      <button
        className={`mt-2 w-full rounded-full py-2.5 text-sm font-bold transition-all duration-200 ${
          isModule
            ? "bg-slate-100 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
            : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
      >
        {isModule ? "Tiếp Tục Bài Học" : "Vào Phòng"}
      </button>
    </div>
  )
}

interface AgendaSectionProps {
  title?: string
  viewAllLabel?: string
  viewAllHref?: string
  items: AgendaItem[]
}

export function AgendaSection({
  title = "Lịch Hôm Nay",
  viewAllLabel = "Xem Lịch",
  viewAllHref = "#",
  items,
}: AgendaSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="mb-2 flex items-end justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {viewAllLabel}
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <AgendaCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
