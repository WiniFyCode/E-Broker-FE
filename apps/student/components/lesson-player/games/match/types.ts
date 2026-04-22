// Match Game Types
export interface MatchPair {
  left: string
  right: string
}

export interface MatchContent {
  title: string
  description: string
  leftLabel?: string
  rightLabel?: string
  pairs: MatchPair[]
}

export interface MatchState {
  leftItems: { id: number; text: string }[]
  rightItems: { id: number; text: string }[]
  matches: Record<number, number> // leftId -> rightId
  isSubmitted: boolean
  results: Record<number, boolean> // leftId -> isCorrect
}
