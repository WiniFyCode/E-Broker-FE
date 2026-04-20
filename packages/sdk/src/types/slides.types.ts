export interface SlideElement {
  id: string
  type: string
  config?: Record<string, unknown>
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface SlideAnimation {
  targetId: string
  effect: string
  at?: number
  duration?: number
}

export interface SlideAction {
  type: string
  targetId?: string
  value?: string
}

export interface SlideTrigger {
  on: string
  targetId?: string
  actions: SlideAction[]
}

export interface SlideContent {
  elements: SlideElement[]
  animations: SlideAnimation[]
  triggers: SlideTrigger[]
}

export type SlideType = "content" | "game" | "video"

export type GameType =
  | "quiz"
  | "fill_blank"
  | "match"
  | "sequence"
  | "hotspot"
  | "label_image"
  | "memory_flip"
  | "word_scramble"
  | "crossword"
  | "swipe"
  | "branching"
  | "timed_sprint"

export interface GameConfig {
  gameType?: GameType
  data?: Record<string, unknown>
  correctAnswer?: unknown
  passingScore?: number
  maxAttempts?: number
  timeLimit?: number
}

export interface Slide {
  id?: string
  courseId: string
  lessonId?: string
  title?: string
  order: number
  type: SlideType
  audioUrl?: string
  audioAutoPlay?: boolean
  requiredElementIds?: string[]
  content?: SlideContent
  gameConfig?: GameConfig
}

export interface CreateSlideDto {
  courseId: string
  type: SlideType
  lessonId?: string
  title?: string
  order?: number
  content?: Partial<SlideContent>
}

export interface SlideFilterQuery {
  courseId?: string
  lessonId?: string
}

export interface ReorderSlidesDto {
  courseId: string
  lessonId?: string
  slideIds: string[]
}
