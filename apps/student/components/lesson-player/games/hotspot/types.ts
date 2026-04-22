// Hotspot Game Types
export interface HotspotPoint {
  id: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  label: string
  icon?: string
  type?: "error" | "primary" | "tertiary" // color theme
}

export interface HotspotContent {
  title: string
  subtitle: string
  description: string
  imageUrl: string
  hotspots: HotspotPoint[]
  instruction?: string
}

export interface HotspotState {
  foundHotspots: Set<string>
  isCompleted: boolean
}
