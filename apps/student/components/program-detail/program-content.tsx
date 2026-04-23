"use client"

import { useState } from "react"
import { Specialization } from "@/lib/training-types"
import { SpecializationAccordion } from "./specialization-accordion"
import { BookOpen, Lock, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface ProgramContentProps {
  basicSpecializations: Specialization[]
  advancedSpecializations: Specialization[]
  programId: string
}

export function ProgramContent({ 
  basicSpecializations, 
  advancedSpecializations,
  programId 
}: ProgramContentProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic")

  return (
    <div className="mt-6 sm:mt-8">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden mb-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-1.5 flex gap-1">
          <TabButton
            active={activeTab === "basic"}
            onClick={() => setActiveTab("basic")}
            icon={BookOpen}
            label="Nền tảng"
            count={basicSpecializations.length}
          />
          <TabButton
            active={activeTab === "advanced"}
            onClick={() => setActiveTab("advanced")}
            icon={Lock}
            label="Nâng cao"
            count={advancedSpecializations.length}
            locked
          />
        </div>

        {/* Mobile Content */}
        <div className="mt-4">
          {activeTab === "basic" ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Chuyên Đề Nền Tảng
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kiến thức cốt lõi cho môi giới
                  </p>
                </div>
                <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                  {basicSpecializations.length} chuyên đề
                </span>
              </div>
              <SpecializationAccordion
                specializations={basicSpecializations}
                programId={programId}
                variant="basic"
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Chuyên Đề Nâng Cao
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Chuyên sâu để nhận chứng chỉ
                  </p>
                </div>
                <span className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  {advancedSpecializations.length} chuyên đề
                </span>
              </div>
              <SpecializationAccordion
                specializations={advancedSpecializations}
                programId={programId}
                variant="advanced"
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Two Column Layout */}
      <div className="hidden lg:grid grid-cols-2 gap-8">
        {/* Basic Specializations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Chuyên Đề Nền Tảng
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Kiến thức cốt lõi cho môi giới
              </p>
            </div>
            <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              {basicSpecializations.length} chuyên đề
            </span>
          </div>
          <SpecializationAccordion
            specializations={basicSpecializations}
            programId={programId}
            variant="basic"
          />
        </section>

        {/* Advanced Specializations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Chuyên Đề Nâng Cao
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Chuyên sâu để nhận chứng chỉ
              </p>
            </div>
            <span className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              {advancedSpecializations.length} chuyên đề
            </span>
          </div>
          <SpecializationAccordion
            specializations={advancedSpecializations}
            programId={programId}
            variant="advanced"
          />
        </section>
      </div>
    </div>
  )
}

// Tab Button Component
interface TabButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  label: string
  count: number
  locked?: boolean
}

function TabButton({ active, onClick, icon: Icon, label, count, locked }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200",
        active 
          ? "bg-primary text-white shadow-md" 
          : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      )}
    >
      <Icon className={cn("h-4 w-4", active ? "text-white" : locked ? "text-slate-400" : "text-primary")} />
      <span className="font-semibold text-sm">{label}</span>
      <span className={cn(
        "px-1.5 py-0.5 rounded text-xs font-bold",
        active ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
      )}>
        {count}
      </span>
    </button>
  )
}
