import { BaseService } from "./base.service"
import type {
  Course,
  CreateCourseDto,
  PaginationQuery,
  UpdateCourseBrandingDto,
} from "../types/courses.types"

export class CoursesService extends BaseService {
  create(data: CreateCourseDto) {
    return this.client.post<Course>("/courses", data)
  }

  list(params?: PaginationQuery) {
    const query = new URLSearchParams()
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    const qs = query.toString()
    return this.client.get<Course[]>(`/courses${qs ? `?${qs}` : ""}`)
  }

  getById(id: string) {
    return this.client.get<Course>(`/courses/${id}`)
  }

  update(id: string, data: Partial<CreateCourseDto>) {
    return this.client.patch<Course>(`/courses/${id}`, data)
  }

  remove(id: string) {
    return this.client.delete<void>(`/courses/${id}`)
  }

  updateBranding(id: string, data: UpdateCourseBrandingDto) {
    return this.client.patch<void>(`/courses/${id}/branding`, data)
  }
}
