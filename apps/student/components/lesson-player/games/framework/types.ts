// Game Framework Types
export interface GameResult {
  gameId: string
  score: number
  maxScore: number
  isPassed: boolean
  attempts: number
  timeSpent: number
}

export interface GameConfig {
  gameId: string
  title: string
  instruction: string
  passThreshold: number
  maxRetries: number
}

export type GameStatus = "playing" | "submitted" | "passed" | "failed"

export interface GameState {
  status: GameStatus
  score: number
  maxScore: number
  userAnswer: any
  isCorrect: boolean | null
  feedback: string | null
  attempts: number
  startTime: number
}

export interface GameActions {
  setAnswer: (answer: any) => void
  submit: () => void
  next: () => void
  retry: () => void
  reset: () => void
}
