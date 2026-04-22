export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    lastPage: number
    limit: number
  }
}

export interface PaginationQuery {
  page?: number
  limit?: number
}
