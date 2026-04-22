import { getLessonById, getSpecializationById, getProgramById } from "@/lib/training-data"
import { notFound } from "next/navigation"
import { LessonPlayer } from "@/components/lesson-player"

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{
    programId: string
    specializationId: string
    lessonId: string
  }>
}) {
  const { programId, specializationId, lessonId } = await params

  const lesson = getLessonById(programId, specializationId, lessonId)
  const specialization = getSpecializationById(programId, specializationId)
  const program = getProgramById(programId)

  if (!lesson || !specialization || !program) {
    notFound()
  }

  return (
    <LessonPlayer
      lesson={lesson}
      specializationTitle={specialization.title}
      programTitle={program.title}
    />
  )
}
