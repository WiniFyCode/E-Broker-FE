"use client"

import Link from "next/link"
import { MoreHorizontalIcon, MegaphoneIcon } from "lucide-react"
import type { RecommendedCourse, Announcement } from "@/lib/types"

interface RecommendedCourseItemProps {
  course: RecommendedCourse
}

function RecommendedCourseItem({ course }: RecommendedCourseItemProps) {
  return (
    <Link href={`/training/program/${course.id}`} className="group flex cursor-pointer gap-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-semibold leading-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          {course.title}
        </h4>
        <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {course.level} • {course.modules} Modules
        </span>
      </div>
    </Link>
  )
}

interface RecommendedSectionProps {
  title?: string
  courses: RecommendedCourse[]
  exploreLabel?: string
}

export function RecommendedSection({
  title = "Recommended",
  courses,
  exploreLabel = "Explore Catalog",
}: RecommendedSectionProps) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-700/80 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <button className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300">
          <MoreHorizontalIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <RecommendedCourseItem key={course.id} course={course} />
        ))}
      </div>
      <button className="mt-2 w-full rounded-full border border-slate-300 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-blue-400 dark:hover:bg-slate-800">
        {exploreLabel}
      </button>
    </div>
  )
}

interface AnnouncementItemProps {
  announcement: Announcement
}

function AnnouncementItem({ announcement }: AnnouncementItemProps) {
  const isSystem = announcement.type === "system"
  const isEvent = announcement.type === "event"

  return (
    <div className="border-b border-slate-200/20 py-3 last:border-0 last:pb-0 dark:border-slate-700/20">
      <span
        className={`mb-1 block text-[0.6875rem] font-bold uppercase tracking-wider ${
          isSystem
            ? "text-blue-600 dark:text-blue-400"
            : "text-amber-600 dark:text-amber-400"
        }`}
      >
        {isSystem ? "System Update" : "Event"}
      </span>
      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
        {announcement.title}
      </h4>
      <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
        {announcement.description}
      </p>
    </div>
  )
}

interface AnnouncementsSectionProps {
  title?: string
  announcements: Announcement[]
}

export function AnnouncementsSection({
  title = "Announcements",
  announcements,
}: AnnouncementsSectionProps) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-slate-200/80 bg-white p-6 shadow-md dark:border-slate-700/80 dark:bg-slate-900">
      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
        <MegaphoneIcon className="h-5 w-5 text-amber-500" />
        {title}
      </h3>
      <div className="flex flex-col">
        {announcements.map((announcement) => (
          <AnnouncementItem key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  )
}

interface SidebarWidgetsProps {
  recommendedCourses: RecommendedCourse[]
  announcements: Announcement[]
}

export function SidebarWidgets({
  recommendedCourses,
  announcements,
}: SidebarWidgetsProps) {
  return (
    <aside className="flex w-full flex-col gap-6 lg:w-1/3 xl:w-1/4">
      <RecommendedSection courses={recommendedCourses} />
      <AnnouncementsSection announcements={announcements} />
    </aside>
  )
}
