import { ApiError } from "./types.js"

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl =
      baseUrl || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

    const headers = {
      ...DEFAULT_HEADERS,
      ...options.headers,
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

  post<T>(endpoint: string, body?: any, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  put<T>(endpoint: string, body?: any, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  patch<T>(endpoint: string, body?: any, options?: RequestInit) {
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
