"use client"

import { BookOpen, Clock, CheckCircle2, PlayCircle, Award } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Progress } from "@workspace/ui/components/progress"

const courses = [
  {
    id: 1,
    name: "SBW 3 DAYS - Kỹ năng bán hàng chuyên nghiệp",
    status: "in-progress",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    lastAccessed: "2 ngày trước",
    certificate: null,
  },
  {
    id: 2,
    name: "Kỹ năng tư vấn bảo hiểm cơ bản",
    status: "completed",
    progress: 100,
    totalLessons: 12,
    completedLessons: 12,
    completedDate: "15/04/2026",
    certificate: "CERT-2026-001",
  },
  {
    id: 3,
    name: "Quy trình giải quyết Claim bảo hiểm",
    status: "in-progress",
    progress: 30,
    totalLessons: 10,
    completedLessons: 3,
    lastAccessed: "1 tuần trước",
    certificate: null,
  },
  {
    id: 4,
    name: "Chăm sóc khách hàng VIP",
    status: "completed",
    progress: 100,
    totalLessons: 8,
    completedLessons: 8,
    completedDate: "10/04/2026",
    certificate: "CERT-2026-002",
  },
  {
    id: 5,
    name: "Đạo đức nghề nghiệp trong bảo hiểm",
    status: "not-started",
    progress: 0,
    totalLessons: 6,
    completedLessons: 0,
    lastAccessed: "Chưa bắt đầu",
    certificate: null,
  },
]

const statusConfig = {
  "in-progress": {
    label: "Đang học",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: PlayCircle,
  },
  completed: {
    label: "Đã hoàn thành",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  "not-started": {
    label: "Chưa bắt đầu",
    color: "bg-slate-100 text-slate-600 border-slate-200",
    icon: BookOpen,
  },
}

export function ProfileCourses() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Lịch sử khóa học
        </h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Đang học: 2
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Hoàn thành: 2
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course) => {
          const status = statusConfig[course.status as keyof typeof statusConfig]
          const StatusIcon = status.icon

          return (
            <div
              key={course.id}
              className="p-4 rounded-xl border border-outline-variant/15 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      {course.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${status.color}`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        Tiến độ: {course.completedLessons}/{course.totalLessons}{" "}
                        bài học
                      </span>
                      <span className="font-medium text-primary">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="h-4 w-4" />
                      {course.status === "completed"
                        ? `Hoàn thành: ${course.completedDate}`
                        : `Truy cập: ${course.lastAccessed}`}
                    </span>
                    {course.certificate && (
                      <span className="flex items-center gap-1 text-amber-600">
                        <Award className="h-4 w-4" />
                        Chứng chỉ: {course.certificate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  {course.status === "completed" ? (
                    <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      Xem chứng chỉ
                    </button>
                  ) : course.status === "in-progress" ? (
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-container rounded-lg transition-colors">
                      Tiếp tục học
                    </button>
                  ) : (
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      Bắt đầu học
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
