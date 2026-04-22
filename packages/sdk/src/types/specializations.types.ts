export interface CreateSpecializationDto {
  programId: string
  title: string
  description?: string
  type: "basic" | "advanced"
  isLocked?: boolean
  order: number
}

export interface UpdateSpecializationDto {
  programId?: string
  title?: string
  description?: string
  type?: "basic" | "advanced"
  isLocked?: boolean
  order?: number
}

export interface Specialization {
  _id: string
  programId: string
  title: string
  description?: string
  type: "basic" | "advanced"
  isLocked: boolean
  order: number
}
