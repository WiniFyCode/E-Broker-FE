import {
  HeroGreeting,
  AgendaSection,
  CourseGrid,
  SidebarWidgets,
  BlogSection,
} from "@/components/student"
import {
  agendaItems,
  courses,
  recommendedCourses,
  announcements,
  blogPosts,
} from "@/lib/mock-data"

export default function DashboardPage() {
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
          <CourseGrid courses={courses} />
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
