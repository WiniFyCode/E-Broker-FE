"use client"

import { useState } from "react"
import { X, CheckCircle2, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import type { OnlineClass } from "./online-class-card"

interface RegistrationModalProps {
  classItem: OnlineClass
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  fullName: string
  email: string
  phone: string
  company: string
  note: string
}

export function RegistrationModal({ classItem, open, onOpenChange }: RegistrationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    note: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false)
      // Reset after close animation
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          note: "",
        })
      }, 300)
    }
  }

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center py-6 text-center">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-xl mb-2">Đăng ký thành công!</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400 mb-6">
              Bạn đã đăng ký tham gia lớp học <strong>{classItem.title}</strong>. 
              Thông tin chi tiết sẽ được gửi qua email.
            </DialogDescription>
            <Button onClick={handleClose} className="rounded-full px-8">
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Đăng ký tham gia lớp học</DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Vui lòng điền thông tin để đăng ký <strong>{classItem.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Họ tên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nguyenvana@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="rounded-lg"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0912345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="rounded-lg"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">
              Công ty/Tổ chức
            </Label>
            <Input
              id="company"
              placeholder="Tên công ty (tùy chọn)"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="rounded-lg"
            />
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note">
              Ghi chú/Lý do tham gia
            </Label>
            <Textarea
              id="note"
              placeholder="Mong muốn học được gì từ khóa học này..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              rows={3}
              className="rounded-lg resize-none"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 rounded-full"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-full bg-primary hover:bg-primary-container"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                "Xác nhận đăng ký"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
