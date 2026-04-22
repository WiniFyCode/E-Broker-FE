export interface TimedSprintQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface TimedSprintContent {
  title: string
  subtitle: string
  description: string
  questions: TimedSprintQuestion[]
  timeLimit: number
  passingScore: number
}

export interface TimedSprintState {
  currentQuestionIndex: number
  answers: Record<string, number>
  correctCount: number
  incorrectCount: number
  timeRemaining: number
  isCompleted: boolean
}
