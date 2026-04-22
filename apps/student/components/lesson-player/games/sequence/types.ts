// Sequence Game Types
export interface SequenceItem {
  id: string
  title: string
  description: string
  correctOrder: number // 0-indexed
}

export interface SequenceContent {
  title: string
  description: string
  hint?: string
  items: SequenceItem[]
}

export interface SequenceState {
  currentOrder: SequenceItem[]
  isSubmitted: boolean
  results: boolean[] // true if item is in correct position
}
