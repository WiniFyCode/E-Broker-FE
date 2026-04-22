"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, Camera, Save } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import type { User as UserType } from "@/lib/types"

interface ProfilePersonalInfoProps {
  user: UserType
}

export function ProfilePersonalInfo({ user }: ProfilePersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "+84 912 345 678",
    birthday: "1990-05-15",
    address: "123 Nguyễn Văn A, Quận 1, TP.HCM",
  })

  const handleSave = () => {
    setIsEditing(false)
    // TODO: API call to save
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Thông tin cá nhân
        </h3>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
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
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-slate-400" />
            Họ và tên
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
            className="rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-slate-400" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className="rounded-lg"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-slate-400" />
            Số điện thoại
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEditing}
            className="rounded-lg"
          />
        </div>

        {/* Birthday */}
        <div className="space-y-2">
          <Label htmlFor="birthday" className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            Ngày sinh
          </Label>
          <Input
            id="birthday"
            type="date"
            value={formData.birthday}
            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
            disabled={!isEditing}
            className="rounded-lg"
          />
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            Địa chỉ
          </Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={!isEditing}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
