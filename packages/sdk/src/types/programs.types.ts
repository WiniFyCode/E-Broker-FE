import type { PaginationQuery } from "./common.types"

export interface ProgramConfig {
  themeColor?: string
  logo?: string
  passScore?: number // default is 70
  maxAttempts?: number // default is 3
  gameTimeLimitSeconds?: number // default is 300
  isPublished?: boolean // default is false
}

export interface CreateProgramDto {
  tenantId: string
  title: string
  instructorId: string
  description?: string
  thumbnail?: string
  categoryId?: string
  tags?: string[]
  config?: ProgramConfig
}

export interface UpdateProgramBrandingDto {
  themeColor?: string
  logo?: string
}

export interface Program {
  _id: string
  tenantId: string
  title: string
  description?: string
  thumbnail?: string
  categoryId?: string
  tags: string[]
  instructorId: string
  config: ProgramConfig
}
