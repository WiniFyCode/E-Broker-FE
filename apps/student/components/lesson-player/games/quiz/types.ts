// Quiz Game Types
export interface QuizOption {
  id: string
  label: string // A, B, C, D
  text: string
}

export interface QuizContent {
  scenario?: {
    title: string
    subtitle: string
    description: string
    imageUrl: string
    badge?: string
  }
  context?: {
    title: string
    icon?: string
    description: string
  }
  question: {
    text: string
    icon?: string
  }
  options: QuizOption[]
  correctAnswerId: string
  explanation?: string
}

export interface QuizState {
  selectedOptionId: string | null
  isSubmitted: boolean
  isCorrect: boolean | null
}
