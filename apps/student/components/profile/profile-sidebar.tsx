"use client"

import { User, BookOpen, Award, Settings, Briefcase, Activity, LogOut } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import type { User as UserType } from "@/lib/types"

interface ProfileSidebarProps {
  user: UserType
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: "overview", label: "Tổng quan", icon: Activity },
  { id: "personal", label: "Thông tin cá nhân", icon: User },
  { id: "work", label: "Thông tin công việc", icon: Briefcase },
  { id: "courses", label: "Lịch sử khóa học", icon: BookOpen },
  { id: "certificates", label: "Chứng chỉ", icon: Award },
  { id: "settings", label: "Cài đặt", icon: Settings },
]

export function ProfileSidebar({ user, activeTab, onTabChange }: ProfileSidebarProps) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* User Card */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/15 p-6 text-center">
        <div className="relative inline-block">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl bg-primary text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-container transition-colors">
            <User className="h-4 w-4" />
          </button>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {user.name}
        </h2>
        <p className="text-sm text-slate-500">{user.email}</p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            Học viên
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Đang hoạt động
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/15 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                activeTab === item.id
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-surface-container-high dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full rounded-xl gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut className="h-4 w-4" />
        Đăng xuất
      </Button>
    </div>
  )
}
