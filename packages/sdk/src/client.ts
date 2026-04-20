import { ApiError } from "./types.js"
import { AuthService } from "./services/auth.service.js"
import { CoursesService } from "./services/courses.service.js"
import { MailsService } from "./services/mails.service.js"
import { SlidesService } from "./services/slides.service.js"
import { GamesService } from "./services/games.service.js"
import { UsersService } from "./services/users.service.js"

const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
}

export class ApiClient {
  private baseUrl: string
  private token: string | null = null

  // ─── Services ──────────────────────────────────────────────────────────────
  public readonly auth: AuthService
  public readonly courses: CoursesService
  public readonly mails: MailsService
  public readonly slides: SlidesService
  public readonly games: GamesService
  public readonly users: UsersService

  constructor(baseUrl?: string) {
    this.baseUrl =
      baseUrl ||
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}` ||
      "http://localhost:3000/v1"

    this.auth = new AuthService(this)
    this.courses = new CoursesService(this)
    this.mails = new MailsService(this)
    this.slides = new SlidesService(this)
    this.games = new GamesService(this)
    this.users = new UsersService(this)
  }

  /** Set Bearer token for authenticated requests */
  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

    const headers: Record<string, string> = {
      ...DEFAULT_HEADERS,
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw data as ApiError
      }

      return data as T
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "statusCode" in error
      ) {
        throw error
      }
      const fallbackError: ApiError = {
        statusCode: 500,
        errorCode: "CONNECTION_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        timestamp: new Date().toISOString(),
        path: url,
      }

      throw fallbackError
    }
  }

  get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  post<T>(endpoint: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  put<T>(endpoint: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  patch<T>(endpoint: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    })
  }

  delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

export const apiClient = new ApiClient()
