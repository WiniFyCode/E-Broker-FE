// Word Scramble Game Types
export interface WordScrambleContent {
  title: string
  description: string
  hint?: string
  correctWord: string
  scrambledLetters: string[]
  imageUrl?: string
}

export interface WordScrambleState {
  userAnswer: string
  isSubmitted: boolean
  isCorrect: boolean | null
}
