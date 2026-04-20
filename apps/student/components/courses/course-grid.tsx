"use client"

import { Clock } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  category: string
  image: string
  modules: number
  level?: string
}

interface CourseGridProps {
  courses?: Course[]
  showLoadMore?: boolean
  onLoadMore?: () => void
}

const defaultCourses: Course[] = [
  {
    id: "1",
    title: "Algorithmic Design Patterns",
    description: "Master the core patterns of efficient algorithms and optimize your code structure for large-scale systems.",
    category: "Computer Science",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5wQdwuxyf4dKQzbaNElTqYr-42SIGdM5uT4XticzBsFyrLNt0SaWJ02pnwJRGnGnzlI3wUrXIll56SwDRnnHplBI7h1Cl9_fuW55jR3gtc0SYI97Joxk9OgUBVpgAMcRViEP_-eqseoqNYer4EVQ3gotA9_pnBkK-Uy_X5Dj14IqTGYbQ_80nixYHuaXpnQvHMaXuS-pppzPqZn8_EfxQKdy-42Gdg_CWkKgobw2KhUg7MrhYY51o4nR9foGanWUtFCzCjdCvSCc",
    modules: 12,
  },
  {
    id: "2",
    title: "Microeconomics in Global Markets",
    description: "Analyze market structures, pricing strategies, and economic policies in a globally connected environment.",
    category: "Business",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJaznOdmf9fGwEOWDoG3iw1RhD7Mj1_UBlbiNEFSt80XtICEbPr3zKSCnFHdrrgUnNS2lm9svAHOJy8SLRmJL9kUQB5El1oWXjNNil5zFJNWQZZZvi2V1ioslOjOVQ0M7l4zpc_ZCAh8YwcGZf9LFUXgwcl4irBxdNYlPpbt0nA2n9kBz6_masoSey_MgIYxkxWrROt2EXv0nsVF5mEwQ587-eoPXe6enHDOAuFw1HQH36UHXfmxOj-7oX5DhL8auhPqkjD3VQnkk",
    modules: 8,
  },
  {
    id: "3",
    title: "Philosophical Foundations of Ethics",
    description: "Explore the historical evolution of ethical thought from classical antiquity to modern moral philosophy.",
    category: "Humanities",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_LjF596fHm_5ssgiWeDRZucYvwX-fhcujis402GOalhLmjlcyTzP5p5YaipIsQ9TrOIFeADOfzidqZTOnJ_3VKXuatgwTqt-nJMgIo5a-9yCeJAgXw25WJn6TrLS2YMPiTiBNm3JA7XImtlRantlCNYgX8E_VRExS5kDeB4VBxM1bTyzdg3OCxysNpW4Lhwb_MRbbW3NAwTkMw7doDqRjBSOcQLMSld_GDF-xlJEJIhaER9yGpi8y21al2Cir1ZmngE1JOza65pg",
    modules: 10,
  },
  {
    id: "4",
    title: "Predictive Modeling Techniques",
    description: "Learn advanced statistical methods and machine learning algorithms for forecasting and trend analysis.",
    category: "Data Science",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKY4CKVIx1QEmRX0gFYw32KRfdgfnA8kFLwypu2lrJCSHcrixO6ZP4_LWe2PRdWa_QRavSZlkUjjuWrspRWeMKLQeRAvkjXfr5w7o0tZTxtFcqgX6-lE6VeTpu-n3rMrXt8IgrAerBLdaOearR0wdbyQKzeEDNqRRFnkIgMmc6ikwIcdSz9hDZcH4dtjAEfwylJa5ahS8iniAPQwFQSkOQswLo8I0M_a0WdUFbThkPUbNwAHE9okBrPZ2-yaDFEifPqQ9KHVHdO4U",
    modules: 14,
  },
]

export function CourseGrid({ 
  courses = defaultCourses, 
  showLoadMore = true,
  onLoadMore 
}: CourseGridProps) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <article
            key={course.id}
            className="group flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900"
          >
            {/* Course Image */}
            <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-slate-900 backdrop-blur-sm">
                {course.category}
              </div>
            </div>

            {/* Course Content */}
            <div className="flex flex-grow flex-col p-6">
              <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                {course.title}
              </h3>
              <p className="mb-4 text-sm text-slate-600 line-clamp-2 dark:text-slate-400">
                {course.description}
              </p>

              {/* Course Meta */}
              <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    {course.modules} Modules
                  </span>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  View Details
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={onLoadMore}
            className="rounded-full border border-slate-300/50 bg-white px-8 py-3 font-semibold text-blue-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600/50 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
          >
            Load More Courses
          </button>
        </div>
      )}
    </section>
  )
}