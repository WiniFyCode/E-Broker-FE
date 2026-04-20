import { CourseFilters, CourseHeroSection, CourseGrid } from "@/components/courses"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl px-8 py-12">
        {/* Hero Section with Suggested Courses */}
        <CourseHeroSection />
        
        {/* Filters */}
        <CourseFilters />
        
        {/* All Courses Grid */}
        <CourseGrid />
      </main>
      
      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/50 bg-slate-100/50 px-8 py-12 dark:border-slate-700/50 dark:bg-slate-900/50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 text-sm leading-relaxed md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              Lumina Academy
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              © 2024 Lumina Academy. Engineered for the Academic Luminary.
            </span>
          </div>
          <nav className="flex flex-wrap gap-6 md:justify-end">
            <a
              href="#"
              className="text-slate-500 opacity-80 transition-colors hover:text-blue-600 hover:opacity-100 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Academic Integrity
            </a>
            <a
              href="#"
              className="text-slate-500 opacity-80 transition-colors hover:text-blue-600 hover:opacity-100 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-500 opacity-80 transition-colors hover:text-blue-600 hover:opacity-100 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Curriculum Standards
            </a>
            <a
              href="#"
              className="text-slate-500 opacity-80 transition-colors hover:text-blue-600 hover:opacity-100 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Support
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}