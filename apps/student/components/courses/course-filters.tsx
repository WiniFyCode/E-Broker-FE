"use client"

import { useState } from "react"

interface CourseFiltersProps {
  activeFilter?: string
  onFilterChange?: (filter: string) => void
}

const filters = [
  { id: "all", label: "All Courses" },
  { id: "computer-science", label: "Computer Science" },
  { id: "humanities", label: "Humanities" },
  { id: "business", label: "Business Strategy" },
  { id: "data-science", label: "Data Science" },
  { id: "design", label: "Design Theory" },
]

export function CourseFilters({ 
  activeFilter = "all", 
  onFilterChange 
}: CourseFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState(activeFilter)

  const handleFilterClick = (filterId: string) => {
    setSelectedFilter(filterId)
    onFilterChange?.(filterId)
  }

  return (
    <section className="sticky top-20 z-40 -mx-4 bg-slate-50/90 px-4 py-4 backdrop-blur-md dark:bg-slate-950/90 sm:mx-0 sm:px-0">
      <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pb-2">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter.id
          return (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm dark:bg-blue-500"
                  : "border border-slate-300/50 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-600/50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}