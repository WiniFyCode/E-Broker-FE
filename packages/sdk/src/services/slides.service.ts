import { BaseService } from "./base.service"
import type {
  CreateSlideDto,
  ReorderSlidesDto,
  Slide,
  SlideFilterQuery,
} from "../types/slides.types"

export class SlidesService extends BaseService {
  create(data: CreateSlideDto) {
    return this.client.post<Slide>("/slides", data)
  }

  list(filter?: SlideFilterQuery) {
    const query = new URLSearchParams()
    if (filter?.courseId) query.set("courseId", filter.courseId)
    if (filter?.lessonId) query.set("lessonId", filter.lessonId)
    const qs = query.toString()
    return this.client.get<Slide[]>(`/slides${qs ? `?${qs}` : ""}`)
  }

  getById(id: string) {
    return this.client.get<Slide>(`/slides/${id}`)
  }

  update(id: string, data: Partial<CreateSlideDto>) {
    return this.client.patch<Slide>(`/slides/${id}`, data)
  }

  remove(id: string) {
    return this.client.delete<void>(`/slides/${id}`)
  }

  reorder(data: ReorderSlidesDto) {
    return this.client.patch<{ success: boolean }>("/slides/reorder", data)
  }
}
