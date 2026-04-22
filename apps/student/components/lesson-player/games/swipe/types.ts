export interface SwipeCard {
  id: string
  quote: string
  context?: string
  recordNumber?: string
}

export interface SwipeContent {
  title: string
  subtitle: string
  description: string
  cards: SwipeCard[]
  leftLabel: string
  rightLabel: string
  leftIcon?: string
  rightIcon?: string
}

export interface SwipeState {
  currentCardIndex: number
  decisions: Record<string, "left" | "right">
  score: number
}
