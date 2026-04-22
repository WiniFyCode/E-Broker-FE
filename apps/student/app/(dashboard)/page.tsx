"use client"

import {
  HeroGreeting,
  AgendaSection,
  CourseGrid,
  SidebarWidgets,
  BlogSection,
} from "@/components/student"
import {
  agendaItems,
  recommendedCourses,
  announcements,
  blogPosts,
} from "@/lib/mock-data"
import { usePrograms } from "@workspace/ui/hooks/use-api"
import type { Course } from "@/lib/types"
import type { Program, PaginatedResponse } from "@workspace/sdk"

export default function DashboardPage() {
  const {
    data: programs,
    isLoading,
    error,
  } = usePrograms({ page: 1, limit: 10 })

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
      </div>
    )
  }

  // Handle both array and paginated object responses
  const programsList = Array.isArray(programs)
    ? programs
    : (programs as unknown as PaginatedResponse<Program>)?.data || []

  // Map SDK Program to FE Course
  const mappedCourses: Course[] = programsList.map((p: Program) => ({
    id: p._id,
    title: p.title,
    titleVi: p.title, // Default to title if no translation
    description: p.description || "",
    descriptionVi: p.description || "",
    thumbnail:
      p.thumbnail ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    remainingHours: 0,
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
  }))
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Content Row */}
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        {/* Left Column: Primary Content */}
        <div className="flex flex-col gap-8 lg:w-2/3 xl:w-3/4">
          {/* Hero Greeting */}
          <HeroGreeting pendingModules={2} />

          {/* Today's Agenda */}
          <AgendaSection items={agendaItems} />

          {/* Courses Grid */}
          <CourseGrid courses={mappedCourses} />
        </div>

        {/* Right Column: Sidebar Widgets */}
        <SidebarWidgets
          recommendedCourses={recommendedCourses}
          announcements={announcements}
        />
      </div>

      {/* Blog Section - Full Width */}
      <BlogSection posts={blogPosts} />
    </div>
  )
}
