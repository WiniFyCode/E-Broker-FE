import type { AuthResponse, AuthUser, AuthTokens } from "../types/auth.types"
import { apiClient } from "../client"

let inMemorySession: AuthResponse | null = null

export function saveAuthSession(session: AuthResponse) {
  inMemorySession = session
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_session", JSON.stringify(session))
  }
  if (session?.tokens?.accessToken) {
    apiClient.setToken(session.tokens.accessToken)
  }
}

export function loadAuthSession(): AuthResponse | null {
  if (inMemorySession) return inMemorySession
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("auth_session")
    if (saved) {
      try {
        inMemorySession = JSON.parse(saved)
        if (inMemorySession?.tokens?.accessToken) {
          apiClient.setToken(inMemorySession.tokens.accessToken)
        }
        return inMemorySession
      } catch (e) {
        return null
      }
    }
  }
  return null
}

export function clearAuthSession() {
  inMemorySession = null
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_session")
  }
  apiClient.setToken(null)
}

export function getStoredAccessToken(): string | null {
  return inMemorySession?.tokens.accessToken ?? loadAuthSession()?.tokens.accessToken ?? null
}

export async function initAuthSession(): Promise<AuthResponse | null> {
  const session = loadAuthSession()
  const refreshToken = session?.tokens?.refreshToken

  if (!refreshToken) {
    return null
  }

  try {
    const res = await apiClient.auth.refresh({ refreshToken })

    if (res.tokens?.accessToken) {
      apiClient.setToken(res.tokens.accessToken)

      try {
        const user = await apiClient.auth.me()
        const newSession: AuthResponse = {
          user,
          tokens: res.tokens,
        }
        saveAuthSession(newSession)
        return newSession
      } catch (meError) {
        clearAuthSession()
        return null
      }
    }

    return null
  } catch (error) {
    clearAuthSession()
    return null
  }
}
