"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { LessonPlayer } from "@/components/lesson-player"
import {
  useLesson,
  useSpecialization,
  useProgram,
  useSlides,
} from "@workspace/ui/hooks/use-api"
import type { Lesson as TrainingLesson, GameType as TrainingGameType } from "@/lib/training-types"
import type { Slide, PaginatedResponse } from "@workspace/sdk"

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{
    programId: string
    specializationId: string
    lessonId: string
  }>
}) {
  const { programId, specializationId, lessonId } = use(params)

  const { data: lesson, isLoading: isLessonLoading } = useLesson(lessonId)
  const { data: specialization, isLoading: isSpecLoading } =
    useSpecialization(specializationId)
  const { data: program, isLoading: isProgLoading } = useProgram(programId)
  const { data: slides, isLoading: isSlidesLoading } = useSlides({ lessonId })

  if (isLessonLoading || isSpecLoading || isProgLoading || isSlidesLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!lesson || !specialization || !program) {
    notFound()
  }

  // Handle both array and paginated object responses
  const slidesList = Array.isArray(slides)
    ? slides
    : (slides as unknown as PaginatedResponse<Slide>)?.data || []

  // Map SDK Lesson to TrainingLesson
  const mappedLesson: TrainingLesson = {
    id: lesson.id,
    title: lesson.title,
    description: lesson.description || "",
    games: slidesList.map((slide: Slide) => {
      // Map SDK game types (underscores) to frontend game types (dashes)
      let gameType: string = slide.gameConfig?.gameType || "quiz"
      if (gameType === "fill_blank") gameType = "fill-blank"
      if (gameType === "label_image") gameType = "label"
      if (gameType === "memory_flip") gameType = "memory"
      if (gameType === "word_scramble") gameType = "word-scramble"
      if (gameType === "timed_sprint") gameType = "timed-sprint"

      return {
        id: slide.id,
        type: gameType as TrainingGameType,
        title: slide.title || "Game",
        content: slide.content,
        score: null,
        status: "pending",
        passThreshold: slide.gameConfig?.passingScore || 70,
      }
    }),
    progress: 0,
    lastGameIndex: 0,
    isCompleted: !!lesson.isPublished,
  }

  return (
    <LessonPlayer
      lesson={mappedLesson}
      specializationTitle={specialization.title}
      programTitle={program.title}
    />
  )
}
