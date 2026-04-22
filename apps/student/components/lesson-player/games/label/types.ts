// Label Image Game Types
export interface LabelItem {
  id: string
  text: string
  icon?: string
}

export interface LabelZone {
  id: string
  x: number // grid column start
  y: number // grid row start
  width: number // grid columns span
  height: number // grid rows span
  correctLabelId: string
  label: string // Display label for the zone
}

export interface LabelContent {
  title: string
  description: string
  imageUrl: string
  labels: LabelItem[]
  zones: LabelZone[]
}

export interface LabelState {
  placements: Record<string, string> // zoneId -> labelId
  isSubmitted: boolean
  results: Record<string, boolean> // zoneId -> isCorrect
}
