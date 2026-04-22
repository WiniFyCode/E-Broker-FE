export interface CrosswordClue {
  id: string
  number: number
  direction: "across" | "down"
  clue: string
  answer: string
  startRow: number
  startCol: number
  length: number
}

export interface CrosswordCell {
  row: number
  col: number
  letter: string
  isBlocked: boolean
  clueNumber?: number
}

export interface CrosswordContent {
  title: string
  description: string
  gridSize: number
  clues: CrosswordClue[]
  timeLimit?: number
  hintsAvailable?: number
}

export interface CrosswordState {
  userAnswers: Record<string, string>
  completedClues: string[]
  hintsUsed: number
  timeElapsed: number
}
