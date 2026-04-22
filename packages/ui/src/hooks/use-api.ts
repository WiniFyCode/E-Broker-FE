import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@workspace/sdk"
import type {
  PaginationQuery,
  LessonListQuery,
  SlideFilterQuery,
} from "@workspace/sdk"

// --- Programs ---
export function usePrograms(params?: PaginationQuery) {
  return useQuery({
    queryKey: ["programs", params],
    queryFn: () => apiClient.programs.list(params),
  })
}

export function useProgram(id: string) {
  return useQuery({
    queryKey: ["programs", "detail", id],
    queryFn: () => apiClient.programs.getById(id),
    enabled: !!id,
  })
}

// --- Specializations ---
export function useSpecializations(programId: string) {
  return useQuery({
    queryKey: ["specializations", "list", programId],
    queryFn: () => apiClient.specializations.list(programId),
    enabled: !!programId,
  })
}

export function useSpecialization(id: string) {
  return useQuery({
    queryKey: ["specializations", "detail", id],
    queryFn: () => apiClient.specializations.getById(id),
    enabled: !!id,
  })
}

// --- Lessons ---
export function useLessons(params?: LessonListQuery) {
  return useQuery({
    queryKey: ["lessons", "list", params],
    queryFn: () => apiClient.lessons.list(params),
  })
}

export function useLesson(id: string) {
  return useQuery({
    queryKey: ["lessons", "detail", id],
    queryFn: () => apiClient.lessons.getById(id),
    enabled: !!id,
  })
}

// --- Slides ---
export function useSlides(filter?: SlideFilterQuery) {
  return useQuery({
    queryKey: ["slides", "list", filter],
    queryFn: () => apiClient.slides.list(filter),
    enabled: !!filter?.lessonId || !!filter?.courseId,
  })
}

export function useSlide(id: string) {
  return useQuery({
    queryKey: ["slides", "detail", id],
    queryFn: () => apiClient.slides.getById(id),
    enabled: !!id,
  })
}
