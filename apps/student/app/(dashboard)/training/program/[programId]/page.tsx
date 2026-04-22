"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { ProgramHero } from "@/components/program-detail"
import { SpecializationAccordion } from "@/components/program-detail"
import { useProgram, useSpecializations } from "@workspace/ui/hooks/use-api"
import type {
  Program as TrainingProgram,
  Specialization as TrainingSpecialization,
} from "@/lib/training-types"
import type {
  Specialization as SdkSpecialization,
  PaginatedResponse,
} from "@workspace/sdk"

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ programId: string }>
}) {
  const { programId } = use(params)
  const {
    data: program,
    isLoading: isProgramLoading,
    error: programError,
  } = useProgram(programId)
  const { data: specializations, isLoading: isSpecsLoading } =
    useSpecializations(programId)

  if (isProgramLoading || isSpecsLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  if (programError || !program) {
    notFound()
  }

  // Handle both array and paginated object responses
  const specsList = Array.isArray(specializations)
    ? specializations
    : (specializations as unknown as PaginatedResponse<SdkSpecialization>)?.data ||
      []

  // Map SDK to Training types
  const mappedSpecializations: TrainingSpecialization[] = specsList.map(
    (s: SdkSpecialization) => ({
    id: s.id,
    title: s.title,
    description: s.description || "",
    type: s.type,
    lessons: [], // We'd need to fetch lessons separately or expand SDK
    isLocked: s.isLocked,
    progress: 0,
    isCompleted: false,
  }))

  const mappedProgram: TrainingProgram = {
    id: program.id,
    title: program.title,
    description: program.description || "",
    thumbnail: program.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    progress: 0,
    totalSpecializations: mappedSpecializations.length,
    completedSpecializations: 0,
    specializations: mappedSpecializations,
  }

  const basicSpecializations = mappedSpecializations.filter(
    (s) => s.type === "basic"
  )
  const advancedSpecializations = mappedSpecializations.filter(
    (s) => s.type === "advanced"
  )

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-32">
      <main className="pt-8 px-6 max-w-7xl mx-auto">
        <ProgramHero program={mappedProgram} />

        {/* Chuyên đề nền tảng với accordion */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0040a1]">
                Chuyên Đề Nền Tảng
              </h2>
              <p className="text-[#424654] text-sm font-medium">
                Kiến thức cốt lõi cho môi giới bất động sản chuyên nghiệp
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#0040a1] bg-[#dae2ff] px-4 py-2 rounded-full">
              {basicSpecializations.length} CHUYÊN ĐỀ
            </div>
          </div>
          <SpecializationAccordion
            specializations={basicSpecializations}
            programId={mappedProgram.id}
            variant="basic"
          />
        </section>

        {/* Chuyên đề nâng cao với accordion */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0040a1]">
                Chuyên Đề Nâng Cao
              </h2>
              <p className="text-[#424654] text-sm font-medium">
                Các khóa học chuyên sâu để hoàn thiện kỹ năng và nhận chứng chỉ
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#737785] bg-[#e7e8e9] px-4 py-2 rounded-full flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {advancedSpecializations.length} KHÓA
            </div>
          </div>
          <SpecializationAccordion
            specializations={advancedSpecializations}
            programId={mappedProgram.id}
            variant="advanced"
          />
        </section>
      </main>
    </div>
  )
}
