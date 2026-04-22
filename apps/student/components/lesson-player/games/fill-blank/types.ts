// Fill Blank Game Types
export interface FillBlankBlank {
  index: number
  correctAnswer: string
}

export interface FillBlankContent {
  title: string
  context?: {
    title: string
    description: string
  }
  hint?: string
  text: string // Text with "___" as placeholders
  blanks: FillBlankBlank[]
}

export interface FillBlankState {
  answers: string[]
  isSubmitted: boolean
  results: boolean[] // true if correct, false if incorrect
}
