"use client"

import { Program } from "@/lib/training-types"
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Trophy,
  Target,
  PlayCircle,
  ChevronLeft
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

interface ProgramHeroProps {
  program: Program
}

export function ProgramHero({ program }: ProgramHeroProps) {
  const totalLessons = program.specializations.reduce((acc, s) => acc + s.lessons.length, 0)
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile Header - Compact */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3 mb-4">
          <Link 
            href="/training"
            className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500">Lộ trình chứng chỉ</p>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate">
              {program.title}
            </h1>
          </div>
        </div>

        {/* Mobile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Thumbnail */}
          <div className="relative aspect-[16/9]">
            <img
              src={program.thumbnail}
              alt={program.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                  <Trophy className="h-3 w-3 inline mr-1" />
                  Chứng chỉ
                </span>
                <span className="px-2.5 py-1 bg-white/90 text-slate-800 rounded-full text-xs font-semibold">
                  {program.progress}% hoàn thành
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Stats Grid */}
          <div className="p-4">
            <div className="grid grid-cols-4 gap-3 mb-4">
              <MobileStat icon={BookOpen} value={totalLessons.toString()} label="Bài học" />
              <MobileStat icon={Clock} value="20h" label="ThờI gian" />
              <MobileStat icon={GraduationCap} value={program.totalSpecializations.toString()} label="Chuyên đề" />
              <MobileStat icon={Trophy} value={program.completedSpecializations.toString()} label="Hoàn thành" />
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tiến độ</span>
                <span className="text-lg font-bold text-primary">{program.progress}%</span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full transition-all duration-1000"
                  style={{ width: `${program.progress}%` }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <Button className="w-full rounded-xl gap-2 text-base h-12">
              <PlayCircle className="h-5 w-5" />
              Tiếp tục học
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="flex">
            {/* Left: Content */}
            <div className="flex-1 p-8 lg:p-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-semibold mb-4">
                <Trophy className="h-4 w-4" />
                Lộ Trình Chứng Chỉ
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                {program.title}
              </h1>
              
              {/* Description */}
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl leading-relaxed">
                {program.description}
              </p>

              {/* Continue Button */}
              <Button size="lg" className="rounded-xl gap-2 text-base px-8 h-12">
                <PlayCircle className="h-5 w-5" />
                Tiếp tục học
              </Button>
            </div>

            {/* Right: Thumbnail & Quick Stats */}
            <div className="w-80 xl:w-96 bg-slate-50 dark:bg-slate-800/50 p-8 border-l border-slate-200 dark:border-slate-700">
              {/* Thumbnail */}
              <div className="aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-sm mb-6">
                <img
                  src={program.thumbnail}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <QuickStat 
                  icon={Target}
                  label="Tiến độ của bạn"
                  value={`${program.progress}%`}
                  color="amber"
                />
                <QuickStat 
                  icon={GraduationCap}
                  label="Chuyên đề"
                  value={`${program.completedSpecializations}/${program.totalSpecializations}`}
                  color="blue"
                />
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 p-6">
            <div className="grid grid-cols-4 gap-6">
              <StatItem
                icon={BookOpen}
                label="Tổng bài học"
                value={totalLessons.toString()}
              />
              <StatItem
                icon={Clock}
                label="ThờI gian học"
                value="~20 giờ"
              />
              <StatItem
                icon={GraduationCap}
                label="Chuyên đề"
                value={program.totalSpecializations.toString()}
              />
              <StatItem
                icon={Trophy}
                label="Chứng chỉ"
                value="Có"
              />
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Tiến độ tổng thể</h3>
            <span className="text-2xl font-bold text-primary">{program.progress}%</span>
          </div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full transition-all duration-1000"
              style={{ width: `${program.progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Bạn đã hoàn thành {program.completedSpecializations} trên {program.totalSpecializations} chuyên đề
          </p>
        </div>
      </div>
    </div>
  )
}

// Mobile Stat Component
interface MobileStatProps {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
}

function MobileStat({ icon: Icon, value, label }: MobileStatProps) {
  return (
    <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
      <Icon className="h-4 w-4 mx-auto mb-1 text-slate-400" />
      <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-[10px] text-slate-500">{label}</p>
    </div>
  )
}

// Desktop Quick Stat
interface QuickStatProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  color: "amber" | "blue" | "emerald"
}

function QuickStat({ icon: Icon, label, value, color }: QuickStatProps) {
  const colorClasses = {
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  )
}

// Desktop Stat Item
interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

function StatItem({ icon: Icon, label, value }: StatItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
      </div>
      <div>
        <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  )
}
