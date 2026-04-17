"use client"

import { FlameIcon } from "lucide-react"
import { StreakChart } from "./streak-chart"
import { currentUser } from "@/lib/mock-data"

interface HeroGreetingProps {
  pendingModules?: number
}

export function HeroGreeting({ pendingModules = 2 }: HeroGreetingProps) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-white/60 p-8 backdrop-blur-2xl dark:bg-slate-900/60 lg:p-12">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-slate-400/10 blur-3xl dark:bg-slate-700/20" />
      </div>

      <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between lg:gap-8">
        {/* Left Content */}
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
            Chào Mừng Trở Lại,
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              {currentUser.name}
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-base font-medium text-slate-600 dark:text-slate-300 lg:text-lg">
            Hành trình học tập của bạn vẫn tiếp diễn. Bạn có{" "}
            <strong className="font-bold text-blue-600 dark:text-blue-400">
              {pendingModules} bài học
            </strong>{" "}
            cần hoàn thành hôm nay.
          </p>
        </div>

        {/* Widget Streak */}
        <div className="mt-6 flex flex-col items-start justify-center rounded-2xl p-6 md:mt-0 md:min-w-[320px] md:pl-10">
          <div className="mb-4 flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <FlameIcon className="h-5 w-5 text-amber-500" />
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                Chuỗi 14 Ngày
              </span>
            </div>
          </div>

          {/* Streak Chart */}
          <StreakChart />
        </div>
      </div>
    </section>
  )
}
