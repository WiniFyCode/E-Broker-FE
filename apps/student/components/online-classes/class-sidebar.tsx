"use client"

import { Mail, Phone, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"

interface ClassSidebarProps {
  instructor: string
}

export function ClassSidebar({ instructor }: ClassSidebarProps) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Instructor Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-5">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Thông tin giảng viên
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(instructor)}&background=0040a1&color=fff`} />
            <AvatarFallback>{instructor.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              {instructor}
            </p>
            <p className="text-sm text-slate-500">Giảng viên chính</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="h-4 w-4" />
            <span>giangvien@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="h-4 w-4" />
            <span>+84 123 456 789</span>
          </div>
        </div>
      </div>

      {/* Reminder Card */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-900 dark:text-amber-100">
              Lưu ý quan trọng
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Vui lòng đăng nhập trước 15 phút để kiểm tra thiết bị và kết nối.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
