"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Grid3X3, List, ChevronRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { CategoryCard } from "@/components/explore"
import { exploreCategories } from "@/lib/mock-data"

const tabs = [
  { id: "all", label: "Tất cả" },
  { id: "articles", label: "Bài viết" },
  { id: "topics", label: "Chủ đề" },
  { id: "paths", label: "Lộ trình" },
]

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Filter categories based on search
  const filteredCategories = exploreCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-headline font-bold text-slate-900 dark:text-slate-100">
          Mục khám phá
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Khám phá các tài liệu, bài viết và khóa học hữu ích
        </p>
      </div>

      {/* Search Bar */}
      <div
        className={`flex items-center gap-3 rounded-xl border bg-surface-container-lowest px-4 py-3 transition-all duration-200 ${
          isSearchFocused
            ? "border-primary ring-2 ring-primary/20"
            : "border-outline-variant/30 hover:border-outline-variant/50"
        }`}
      >
        <Search className="h-5 w-5 flex-shrink-0 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm kiếm chủ đề, bài viết..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-slate-100"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-primary"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Browse Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Duyệt Thư mục
          </h2>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-2"
          >
            Xem tất cả thư mục
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
            <p className="text-slate-500">Không tìm thấy thư mục nào</p>
          </div>
        )}
      </div>

      {/* Featured Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
          Nổi bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Card 1 */}
          <Link
            href="/explore/m-talk"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container p-6 text-white"
          >
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3">
                M-Talk
              </span>
              <h3 className="text-xl font-bold mb-2">
                Chia sẻ kinh nghiệm từ các chuyên gia
              </h3>
              <p className="text-white/80 text-sm">
                265+ bài viết về kinh nghiệm bán hàng và chăm sóc khách hàng
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/4 translate-x-1/4" />
          </Link>

          {/* Featured Card 2 */}
          <Link
            href="/explore/m-share"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white"
          >
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3">
                M-SHARE
              </span>
              <h3 className="text-xl font-bold mb-2">
                Cộng đồng chia sẻ kiến thức
              </h3>
              <p className="text-white/80 text-sm">
                187+ bài viết từ các thành viên trong cộng đồng
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/4 translate-x-1/4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
