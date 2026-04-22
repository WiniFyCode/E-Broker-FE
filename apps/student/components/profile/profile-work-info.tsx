"use client"

import { useState } from "react"
import { Briefcase, Building2, Users, Award, GraduationCap, Save } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export function ProfileWorkInfo() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    company: "Công ty Bảo hiểm ABC",
    position: "Chuyên viên tư vấn",
    department: "Kinh doanh",
    experience: "3-5 năm",
    license: "BH-123456",
    education: "Đại học",
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Work Info Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Thông tin công việc
          </h3>
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="rounded-full gap-2"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Lưu thay đổi
              </>
            ) : (
              "Chỉnh sửa"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-400" />
              Công ty/Tổ chức
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              disabled={!isEditing}
              className="rounded-lg"
            />
          </div>

          {/* Position */}
          <div className="space-y-2">
            <Label htmlFor="position" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-slate-400" />
              Chức vụ
            </Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              disabled={!isEditing}
              className="rounded-lg"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              Phòng ban
            </Label>
            <Select
              disabled={!isEditing}
              value={formData.department}
              onValueChange={(value) =>
                setFormData({ ...formData, department: value })
              }
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Chăm sóc khách hàng">
                  Chăm sóc khách hàng
                </SelectItem>
                <SelectItem value="Quản lý">Quản lý</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="flex items-center gap-2">
              <Award className="h-4 w-4 text-slate-400" />
              Kinh nghiệm
            </Label>
            <Select
              disabled={!isEditing}
              value={formData.experience}
              onValueChange={(value) =>
                setFormData({ ...formData, experience: value })
              }
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dưới 1 năm">Dưới 1 năm</SelectItem>
                <SelectItem value="1-3 năm">1-3 năm</SelectItem>
                <SelectItem value="3-5 năm">3-5 năm</SelectItem>
                <SelectItem value="Trên 5 năm">Trên 5 năm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* License */}
          <div className="space-y-2">
            <Label htmlFor="license" className="flex items-center gap-2">
              <Award className="h-4 w-4 text-slate-400" />
              Số chứng chỉ hành nghề
            </Label>
            <Input
              id="license"
              value={formData.license}
              onChange={(e) =>
                setFormData({ ...formData, license: e.target.value })
              }
              disabled={!isEditing}
              className="rounded-lg"
            />
          </div>

          {/* Education */}
          <div className="space-y-2">
            <Label htmlFor="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-slate-400" />
              Trình độ học vấn
            </Label>
            <Select
              disabled={!isEditing}
              value={formData.education}
              onValueChange={(value) =>
                setFormData({ ...formData, education: value })
              }
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Trung cấp">Trung cấp</SelectItem>
                <SelectItem value="Cao đẳng">Cao đẳng</SelectItem>
                <SelectItem value="Đại học">Đại học</SelectItem>
                <SelectItem value="Sau đại học">Sau đại học</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Performance Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Thành tích công việc
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-2xl font-bold text-amber-600">85%</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Chỉ tiêu hoàn thành
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-2xl font-bold text-green-600">128</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Hợp đồng đã ký
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-2xl font-bold text-blue-600">4.8/5</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Đánh giá khách hàng
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
