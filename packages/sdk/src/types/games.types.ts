export interface SubmitGameDto {
  userId: string
  slideId: string
  answers: unknown
  duration: number
}

export interface SubmitGameResponse {
  score: number
  status: "pass" | "fail"
  attempt: number
  duration: number
  metadata?: Record<string, unknown>
}
