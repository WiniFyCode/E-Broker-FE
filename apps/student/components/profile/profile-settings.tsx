"use client"

import { useState } from "react"
import { Bell, Lock, Moon, Globe, Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export function ProfileSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    courseUpdates: true,
    promotions: false,
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "vi",
  })

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Thông báo
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Email thông báo
              </p>
              <p className="text-sm text-slate-500">
                Nhận thông báo qua email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Push notification
              </p>
              <p className="text-sm text-slate-500">
                Thông báo trên trình duyệt
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, push: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Cập nhật khóa học
              </p>
              <p className="text-sm text-slate-500">
                Thông báo về khóa học đang học
              </p>
            </div>
            <Switch
              checked={notifications.courseUpdates}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, courseUpdates: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Khuyến mãi
              </p>
              <p className="text-sm text-slate-500">
                Nhận thông tin khuyến mãi
              </p>
            </div>
            <Switch
              checked={notifications.promotions}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, promotions: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Tùy chọn
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Chế độ tối
              </p>
              <p className="text-sm text-slate-500">
                Giao diện tối cho website
              </p>
            </div>
            <Switch
              checked={preferences.darkMode}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, darkMode: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          Đổi mật khẩu
        </h3>
        <div className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPassword.current ? "text" : "password"}
                value={passwordData.current}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, current: e.target.value })
                }
                className="rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({ ...showPassword, current: !showPassword.current })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword.new ? "text" : "password"}
                value={passwordData.new}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, new: e.target.value })
                }
                className="rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({ ...showPassword, new: !showPassword.new })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPassword.confirm ? "text" : "password"}
                value={passwordData.confirm}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirm: e.target.value })
                }
                className="rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({ ...showPassword, confirm: !showPassword.confirm })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button className="rounded-full bg-primary hover:bg-primary-container">
            Cập nhật mật khẩu
          </Button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Bảo mật
        </h3>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Xác thực hai yếu tố (2FA)
            </p>
            <p className="text-sm text-slate-500">
              Bảo vệ tài khoản bằng xác thực thêm
            </p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            Bật 2FA
          </Button>
        </div>
      </div>
    </div>
  )
}
