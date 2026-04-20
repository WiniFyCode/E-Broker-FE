export interface ApiError {
  statusCode: number
  errorCode: string
  message: string
  timestamp: string
  path: string
}
