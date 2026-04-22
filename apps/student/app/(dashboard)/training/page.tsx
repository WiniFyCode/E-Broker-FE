"use client"

import {
  TrainingHeader,
  FeaturedProgramCard,
  AchievementCard,
  StreakCard,
  ProgramCard,
  NewsletterSection,
} from "@/components/training"
import { usePrograms } from "@workspace/ui/hooks/use-api"
import type { Program as TrainingProgram } from "@/lib/training-types"
import type { Program as SdkProgram, PaginatedResponse } from "@workspace/sdk"

export default function TrainingPage() {
  const { data: programs, isLoading, error } = usePrograms({ page: 1, limit: 12 })

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
    : (programs as unknown as PaginatedResponse<SdkProgram>)?.data || []

  const mappedPrograms: TrainingProgram[] = programsList.map((p: SdkProgram) => ({
    id: p.id,
    title: p.title,
    description: p.description || "",
    thumbnail: p.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    progress: 0,
    totalSpecializations: 0, // In reality, we'd need to fetch this or include in response
    completedSpecializations: 0,
    specializations: [],
  }))

  const featuredProgram = mappedPrograms[0]
  const otherPrograms = mappedPrograms.slice(1)

  return (
    <div className="bg-[#f8f9fa]">
      <main className="mx-auto max-w-7xl px-6 py-12 space-y-16">
        <TrainingHeader />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {featuredProgram && <FeaturedProgramCard program={featuredProgram} />}

          <div className="lg:col-span-4 space-y-8">
            <AchievementCard />
            <StreakCard />
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-[#e1e3e4] pb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Chương Trình Đào Tạo
              </h2>
              <p className="text-[#424654]">
                Được đề xuất dựa trên mục tiêu nghề nghiệp của bạn
              </p>
            </div>
            <a
              className="text-[#0040a1] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              href="#"
            >
              Xem Tất Cả
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </section>

        <NewsletterSection />
      </main>
    </div>
  )
}
