import { BaseService } from "./base.service"
import type {
  CreateLessonDto,
  Lesson,
  LessonListQuery,
  UpdateLessonDto,
} from "../types/lessons.types"

export class LessonsService extends BaseService {
  create(data: CreateLessonDto) {
    return this.client.post<Lesson>("/lessons", data)
  }

  list(params?: LessonListQuery) {
    const query = new URLSearchParams()
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    if (params?.courseId) query.set("courseId", params.courseId)
    const qs = query.toString()
    return this.client.get<Lesson[]>(`/lessons${qs ? `?${qs}` : ""}`)
  }

  getById(id: string) {
    return this.client.get<Lesson>(`/lessons/${id}`)
  }

  update(id: string, data: UpdateLessonDto) {
    return this.client.patch<Lesson>(`/lessons/${id}`, data)
  }

  remove(id: string) {
    return this.client.delete<void>(`/lessons/${id}`)
  }
}