import type { ErrorCode } from "./types/error-code"

export interface ApiError {
  statusCode: number
  errorCode: ErrorCode | "CONNECTION_ERROR"
  message: string | string[]
  timestamp: string
  path: string
}
