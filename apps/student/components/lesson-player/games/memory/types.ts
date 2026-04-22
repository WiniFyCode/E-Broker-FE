// Memory Flip Game Types
export interface MemoryCard {
  id: string
  pairId: string // Cards with same pairId are matches
  type: "icon" | "text"
  content: string // icon name or text
  isFlipped: boolean
  isMatched: boolean
}

export interface MemoryContent {
  title: string
  description: string
  pairs: Array<{
    icon: string
    text: string
  }>
}

export interface MemoryState {
  cards: MemoryCard[]
  flippedCards: string[] // card ids
  matchedPairs: Set<string> // pair ids
  moves: number
  isCompleted: boolean
}
