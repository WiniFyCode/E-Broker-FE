"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {
  Search,
  Bell,
  Settings,
  School,
  BookOpen,
  Calendar,
  Megaphone,
  LogOut,
  User,
  Moon,
  Sun,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { currentUser, announcements } from "@/lib/mock-data"

interface HeaderProps {
  currentPath?: string
}

const navLinks = [
  { href: "/", label: "Trung tâm" },
  { href: "/timeline", label: "Dòng thời gian" },
  { href: "/search", label: "Tìm kiếm" },
  { href: "/training", label: "Đào tạo" },
  { href: "/online-classes", label: "Lớp học trực tuyến" },
]

// Fake search results dựa trên courses
const searchResults = [
  { id: "1", type: "course", title: "Cấu trúc thuật toán nâng cao", href: "/courses/1" },
  { id: "2", type: "course", title: "Mật mã ứng dụng", href: "/courses/2" },
  { id: "3", type: "course", title: "Triết học khoa học", href: "/courses/3" },
  { id: "4", type: "course", title: "Tâm lý học nhận thức", href: "/courses/4" },
  { id: "5", type: "course", title: "Trực quan hóa dữ liệu", href: "/courses/5" },
  { id: "6", type: "course", title: "Nhập môn thị giác máy tính", href: "/courses/6" },
  { id: "7", type: "course", title: "Phân tích dữ liệu với Python", href: "/courses/7" },
]

const getAnnouncementIcon = (type: string) => {
  switch (type) {
    case "event":
      return <Calendar className="h-4 w-4 text-purple-500" />
    case "system":
      return <Megaphone className="h-4 w-4 text-blue-500" />
    default:
      return <Bell className="h-4 w-4 text-slate-500" />
  }
}

export function Header({ currentPath = "/" }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Đóng popup khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredResults = searchQuery.length > 0
    ? searchResults.filter((result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Logo & Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-600 dark:text-blue-400">
            <School className="h-6 w-6 flex-shrink-0" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            E-Broker
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "border-b-2 border-blue-700 pb-1 text-blue-700 dark:border-blue-400 dark:text-blue-400"
                    : "text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-slate-500 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 dark:bg-slate-800 dark:text-slate-400 lg:flex">
              <Search className="h-4.5 w-4.5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                {searchQuery.length === 0 ? (
                  <div className="px-5 py-5 text-center text-sm text-slate-500 dark:text-slate-400">
                    Nhập từ khóa để tìm kiếm
                  </div>
                ) : filteredResults.length === 0 ? (
                  <div className="px-5 py-5 text-center text-sm text-slate-500 dark:text-slate-400">
                    Không tìm thấy kết quả
                  </div>
                ) : (
                  <>
                    <div className="px-5 py-3">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Khóa học
                      </h3>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto">
                      {filteredResults.map((result) => (
                        <Link
                          key={result.id}
                          href={result.href}
                          onClick={() => {
                            setIsSearchOpen(false)
                            setSearchQuery("")
                          }}
                          className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <BookOpen className="h-4.5 w-4.5 flex-shrink-0 text-blue-500 dark:text-blue-400" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {result.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-700/50">
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => {
                          setIsSearchOpen(false)
                          setSearchQuery("")
                        }}
                        className="block px-5 py-3 text-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Xem tất cả kết quả
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen)
                setIsSettingsOpen(false)
                setIsProfileOpen(false)
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Bell className="h-5 w-5 flex-shrink-0" />
              {announcements.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white ring-2 ring-slate-50 dark:ring-slate-900">
                  {announcements.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center justify-between px-5 py-3">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Thông báo
                  </h3>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Đánh dấu đã đọc
                  </button>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {announcements.slice(0, 4).map((announcement) => (
                    <div
                      key={announcement.id}
                      className="flex gap-3.5 px-5 py-3.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <div className="mt-0.5 flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center">
                        {getAnnouncementIcon(announcement.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                          {announcement.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                          {announcement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 dark:border-slate-700/50">
                  <Link
                    href="/notifications"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="block px-5 py-3 text-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Xem tất cả thông báo
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen)
                setIsNotificationsOpen(false)
                setIsProfileOpen(false)
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
            </button>

            {/* Settings Dropdown */}
            {isSettingsOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <div className="px-5 py-3">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Cài đặt
                  </h3>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-700/50">
                  {/* Theme Toggle */}
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex w-full items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    {isDarkMode ? (
                      <Sun className="h-4.5 w-4.5 flex-shrink-0 text-amber-500" />
                    ) : (
                      <Moon className="h-4.5 w-4.5 flex-shrink-0 text-slate-500" />
                    )}
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {isDarkMode ? "Chế độ sáng" : "Chế độ tối"}
                    </span>
                  </button>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setIsSettingsOpen(false)}
                  className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                >
                  <Settings className="h-4.5 w-4.5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Cài đặt tài khoản
                  </span>
                </Link>

                <Link
                  href="/help"
                  onClick={() => setIsSettingsOpen(false)}
                  className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                >
                  <HelpCircle className="h-4.5 w-4.5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Trung tâm hỗ trợ
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen)
                setIsNotificationsOpen(false)
                setIsSettingsOpen(false)
              }}
              className="flex items-center gap-2 rounded-full px-1 py-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Avatar className="h-10 w-10 cursor-pointer border-2 border-transparent transition-all hover:ring-2 hover:ring-blue-500/50">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>EV</AvatarFallback>
              </Avatar>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                {/* User Info */}
                <div className="flex items-center gap-3.5 px-5 py-4">
                  <Avatar className="h-11 w-11 flex-shrink-0">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>EV</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {currentUser.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <div className="border-b border-slate-100 dark:border-slate-700/50">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                  >
                    <User className="h-4.5 w-4.5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Hồ sơ cá nhân
                    </span>
                  </Link>

                  <Link
                    href="/my-courses"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                  >
                    <BookOpen className="h-4.5 w-4.5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Khóa học của tôi
                    </span>
                  </Link>
                </div>

                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-3.5 px-5 py-3.5 text-red-600 transition-colors hover:bg-slate-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-slate-800/50 dark:hover:text-red-300"
                >
                  <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
                  <span className="text-sm font-semibold">Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 md:hidden">
          <nav className="mx-auto max-w-screen-2xl px-4 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
