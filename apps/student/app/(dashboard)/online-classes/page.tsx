"use client"

import { useState, useMemo } from "react"
import { Search, Calendar, Clock, BookOpen } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { OnlineClassCard } from "@/components/online-classes"
import { onlineClasses } from "@/lib/mock-data"

const tabs = [
    { id: "upcoming", label: "Sắp tới" },
    { id: "scheduled", label: "Đã lên lịch" },
    { id: "history", label: "Lịch sử" },
]

// Group classes by month
function groupClassesByMonth(classes: typeof onlineClasses) {
    const grouped: Record<string, typeof onlineClasses> = {}

    classes.forEach((classItem) => {
        const date = new Date(classItem.date)
        const monthYear = `tháng ${date.getMonth() + 1}, ${date.getFullYear()}`

        if (!grouped[monthYear]) {
            grouped[monthYear] = []
        }
        grouped[monthYear].push(classItem)
    })

    return grouped
}

export default function OnlineClassesPage() {
    const [activeTab, setActiveTab] = useState("upcoming")
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    // Filter classes based on tab and search
    const filteredClasses = useMemo(() => {
        let classes = [...onlineClasses]

        // Filter by tab
        const now = new Date("2026-04-20") // Mock current date
        classes = classes.filter((classItem) => {
            const classDate = new Date(classItem.date)

            switch (activeTab) {
                case "upcoming":
                    return classDate >= now && classItem.status !== "ended"
                case "scheduled":
                    return classDate >= now && classItem.status !== "ended"
                case "history":
                    return classDate < now || classItem.status === "ended"
                default:
                    return true
            }
        })

        // Filter by search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            classes = classes.filter(
                (classItem) =>
                    classItem.title.toLowerCase().includes(query) ||
                    classItem.courseName.toLowerCase().includes(query) ||
                    classItem.instructor.toLowerCase().includes(query)
            )
        }

        // Sort by date
        classes.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        return classes
    }, [activeTab, searchQuery])

    // Group by month
    const groupedClasses = groupClassesByMonth(filteredClasses)

    // Calculate stats
    const upcomingCount = onlineClasses.filter(c => c.status === "available").length
    const scheduledCount = onlineClasses.filter(c => c.status === "full" || c.status === "waitlist").length
    const completedCount = onlineClasses.filter(c => c.status === "ended").length

    return (
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-headline font-bold text-slate-900 dark:text-slate-100">
                        Lớp học trực tuyến
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Quản lý và tham gia các lớp học trực tuyến của bạn
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar */}
                <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        {/* Search */}
                        <div
                            className={cn(
                                "flex items-center gap-3 rounded-xl border bg-surface-container-lowest px-4 py-3 transition-all duration-200",
                                isSearchFocused
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-outline-variant/30 hover:border-outline-variant/50"
                            )}
                        >
                            <Search className="h-5 w-5 flex-shrink-0 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm lớp học..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-slate-100"
                            />
                        </div>

                        {/* Tabs */}
                        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all",
                                        activeTab === tab.id
                                            ? "bg-primary text-white"
                                            : "text-slate-600 hover:bg-surface-container-high dark:text-slate-400 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <span>{tab.label}</span>
                                    <span className={cn(
                                        "text-xs px-2 py-0.5 rounded-full",
                                        activeTab === tab.id
                                            ? "bg-white/20 text-white"
                                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                    )}>
                                        {tab.id === "upcoming" ? upcomingCount : tab.id === "scheduled" ? scheduledCount : completedCount}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-4">
                            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">
                                Thống kê nhanh
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Sắp diễn ra</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{upcomingCount} lớp</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Đã đăng ký</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{scheduledCount} lớp</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Đã hoàn thành</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{completedCount} lớp</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 min-w-0">
                    {filteredClasses.length > 0 ? (
                        <div className="space-y-8">
                            {Object.entries(groupedClasses).map(([monthYear, classes]) => (
                                <div key={monthYear}>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        {monthYear}
                                    </h2>
                                    <div className="flex flex-col gap-3">
                                        {classes.map((classItem) => (
                                            <OnlineClassCard key={classItem.id} classItem={classItem} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
                            <Calendar className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                            <p className="text-slate-500 dark:text-slate-400">
                                {searchQuery
                                    ? "Không tìm thấy lớp học nào"
                                    : "Không có lớp học nào trong mục này"}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="mt-4 text-primary hover:text-primary/80 font-medium"
                                >
                                    Xóa tìm kiếm
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
