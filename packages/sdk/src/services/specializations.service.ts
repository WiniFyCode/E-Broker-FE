import { BaseService } from "./base.service"
import type {
  CreateSpecializationDto,
  Specialization,
  UpdateSpecializationDto,
} from "../types/specializations.types"

export class SpecializationsService extends BaseService {
  create(data: CreateSpecializationDto) {
    return this.client.post<Specialization>("/specializations", data)
  }

  list(programId: string) {
    return this.client.get<Specialization[]>(
      `/specializations?programId=${programId}`
    )
  }

  getById(id: string) {
    return this.client.get<Specialization>(`/specializations/${id}`)
  }

  update(id: string, data: UpdateSpecializationDto) {
    return this.client.patch<Specialization>(`/specializations/${id}`, data)
  }

  remove(id: string) {
    return this.client.delete<void>(`/specializations/${id}`)
  }
}
