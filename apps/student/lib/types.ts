export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: "student" | "teacher" | "admin"
}

export interface Course {
  id: string
  title: string
  titleVi: string
  description: string
  descriptionVi: string
  thumbnail: string
  progress: number
  totalLessons: number
  completedLessons: number
  remainingHours: number
  isNearComplete?: boolean
  gradientFrom: string
  gradientTo: string
}

export interface AgendaItem {
  id: string
  type: "module" | "webinar"
  title: string
  subtitle: string
  duration?: string
  progress?: number
  startsIn?: string
  instructors?: Array<{
    name: string
    avatar: string
  }>
  attendeeCount?: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: "Technology" | "Research" | "Community"
  coverImage: string
  readTime?: string
}

export interface Announcement {
  id: string
  type: "system" | "event"
  title: string
  description: string
  date?: string
}

export interface RecommendedCourse {
  id: string
  title: string
  level: string
  modules: number
  thumbnail: string
}

export interface StreakData {
  day: string
  value: number
}
