import { BaseService } from "./base.service"
import type {
  Program,
  CreateProgramDto,
  PaginationQuery,
  UpdateProgramBrandingDto,
} from "../types/programs.types"

export class ProgramsService extends BaseService {
  create(data: CreateProgramDto) {
    return this.client.post<Program>("/programs", data)
  }

  list(params?: PaginationQuery) {
    const query = new URLSearchParams()
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    const qs = query.toString()
    return this.client.get<Program[]>(`/programs${qs ? `?${qs}` : ""}`)
  }

  getById(id: string) {
    return this.client.get<Program>(`/programs/${id}`)
  }

  update(id: string, data: Partial<CreateProgramDto>) {
    return this.client.patch<Program>(`/programs/${id}`, data)
  }

  remove(id: string) {
    return this.client.delete<void>(`/programs/${id}`)
  }

  updateBranding(id: string, data: UpdateProgramBrandingDto) {
    return this.client.patch<void>(`/programs/${id}/branding`, data)
  }
}
