"use client"

import { BookOpen, Award, Clock, TrendingUp, Calendar, Star } from "lucide-react"
import type { User } from "@/lib/types"

interface ProfileOverviewProps {
  user: User
}

const stats = [
  { label: "Khóa học", value: 12, icon: BookOpen, color: "bg-blue-100 text-blue-600" },
  { label: "Chứng chỉ", value: 8, icon: Award, color: "bg-amber-100 text-amber-600" },
  { label: "Giờ học", value: 156, icon: Clock, color: "bg-green-100 text-green-600" },
  { label: "Điểm TB", value: 8.5, icon: Star, color: "bg-purple-100 text-purple-600" },
]

const recentActivities = [
  { action: "Hoàn thành khóa học", target: "Kỹ năng tư vấn cơ bản", date: "2 ngày trước" },
  { action: "Đạt chứng chỉ", target: "Sales Professional", date: "1 tuần trước" },
  { action: "Tham gia lớp học", target: "MBA-iClass_25.04.2026", date: "3 ngày trước" },
  { action: "Hoàn thành bài kiểm tra", target: "Quy trình Claim", score: 92, date: "1 tuần trước" },
]

export function ProfileOverview({ user }: ProfileOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-4"
            >
              <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Hoạt động gần đây
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-slate-100">
                  <span className="font-medium">{activity.action}</span>
                  {" "}
                  <span className="text-slate-600 dark:text-slate-400">{activity.target}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
              </div>
              {activity.score && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  {activity.score}đ
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Tiến độ học tập
        </h3>
        <div className="space-y-4">
          {[
            { name: "SBW 3 DAYS", progress: 75, total: 24, completed: 18 },
            { name: "Kỹ năng tư vấn", progress: 100, total: 12, completed: 12 },
            { name: "Quy trình Claim", progress: 30, total: 10, completed: 3 },
          ].map((course) => (
            <div key={course.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {course.name}
                </span>
                <span className="text-sm text-slate-500">
                  {course.completed}/{course.total} bài học
                </span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
