export interface CourseConfig {
  themeColor?: string
  logo?: string
  passScore?: number // default is 70
  maxAttempts?: number // default is 3
  gameTimeLimitSeconds?: number // default is 300
  isPublished?: boolean // default is false
}

export interface CreateCourseDto {
  tenantId: string
  title: string
  instructorId: string
  description?: string
  thumbnail?: string
  categoryId?: string
  tags?: string[]
  config?: CourseConfig
}

export interface UpdateCourseBrandingDto {
  themeColor?: string
  logo?: string
}

export interface Course {
  id: string
  tenantId: string
  title: string
  description?: string
  thumbnail?: string
  categoryId?: string
  tags: string[]
  instructorId: string
  config: CourseConfig
}

export interface PaginationQuery {
  page?: number
  limit?: number
}
