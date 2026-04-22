"use client"

import {
  PlayCircleIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import type { Course } from "@/lib/types"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter()
  const buttonText = course.isNearComplete
    ? "Hoàn thành khóa học"
    : "Tiếp tục học"

  return (
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/80 dark:bg-slate-900">
      {/* Course Thumbnail */}
      <div
        className={`relative h-48 overflow-hidden bg-gradient-to-br ${course.gradientFrom} ${course.gradientTo}`}
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Progress Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
          <div className="relative h-8 w-8">
            <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#0056d2"
                strokeWidth="3"
                strokeDasharray={`${course.progress}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-600">
              {course.progress}%
            </span>
          </div>
        </div>

        {/* Near Complete Badge */}
        {course.isNearComplete && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
            <StarIcon className="h-3.5 w-3.5 fill-current" />
            Sắp hoàn thành
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="flex flex-grow flex-col gap-3 p-5">
        <div>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
            {course.title}
          </h3>
          <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
            {course.descriptionVi}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <PlayCircleIcon className="h-3.5 w-3.5" />
            {course.completedLessons}/{course.totalLessons} bài
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" />
            {course.remainingHours}h còn lại
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-auto pt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${course.gradientFrom} ${course.gradientTo} transition-all duration-500`}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push(`/training/program/${course.id}`)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-md active:scale-[0.98] dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <span>{buttonText}</span>
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface CourseGridProps {
  title?: string
  viewAllLabel?: string
  viewAllHref?: string
  courses: Course[]
}

export function CourseGrid({
  title = "Khóa học của tôi",
  viewAllLabel = "Xem tất cả",
  viewAllHref = "#",
  courses,
}: CourseGridProps) {
  return (
    <section className="mt-8 flex flex-col gap-6">
      <div className="mb-2 flex items-end justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <a
          href={viewAllHref}
          className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {viewAllLabel}
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
