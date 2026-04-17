"use client"

import Link from "next/link"
import {
  Search,
  Bell,
  Settings,
  School,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { currentUser } from "@/lib/mock-data"

interface HeaderProps {
  currentPath?: string
}

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/courses", label: "Courses" },
  { href: "/library", label: "Library" },
  { href: "/achievements", label: "Achievements" },
]

export function Header({ currentPath = "/" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <School className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-blue-900 dark:text-blue-100">
            E-Broker
          </span>
        </div>

        {/* Navigation Links - Hidden on Mobile */}
        <nav className="hidden items-center gap-8 md:flex">
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
        <div className="flex items-center gap-4">
          {/* Search Bar - Hidden on Small Screens */}
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-slate-500 transition-all focus-within:ring-2 focus-within:ring-primary dark:bg-slate-800 lg:flex">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
          </button>

          {/* Settings - Hidden on Small Screens */}
          <button className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 sm:flex dark:text-slate-400 dark:hover:bg-slate-800">
            <Settings className="h-5 w-5" />
          </button>

          {/* User Avatar */}
          <Avatar className="h-10 w-10 cursor-pointer border-2 border-transparent transition-all hover:ring-2 hover:ring-primary">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>EV</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
