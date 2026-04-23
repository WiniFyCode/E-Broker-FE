import { getProgramById } from "@/lib/training-mock-data"
import { Specialization } from "@/lib/training-types"
import { notFound } from "next/navigation"
import { ProgramHero, ProgramContent } from "@/components/program-detail"

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ programId: string }>
}) {
  const { programId } = await params
  const program = getProgramById(programId)

  if (!program) {
    notFound()
  }

  const basicSpecializations = program.specializations.filter(
    (s: Specialization) => s.type === "basic"
  )
  const advancedSpecializations = program.specializations.filter(
    (s: Specialization) => s.type === "advanced"
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Hero Section */}
        <ProgramHero program={program} />

        {/* Specializations Content with Mobile Tabs */}
        <ProgramContent
          basicSpecializations={basicSpecializations}
          advancedSpecializations={advancedSpecializations}
          programId={program.id}
        />
      </div>
    </div>
  )
}
