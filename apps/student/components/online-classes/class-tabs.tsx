"use client"

import { cn } from "@workspace/ui/lib/utils"

interface Tab {
  id: string
  label: string
}

interface ClassTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function ClassTabs({ tabs, activeTab, onTabChange }: ClassTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-3 text-sm font-medium transition-colors relative",
            activeTab === tab.id
              ? "text-primary"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  )
}
