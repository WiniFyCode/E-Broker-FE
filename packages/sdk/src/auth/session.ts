import type { AuthResponse, AuthUser, AuthTokens } from "../types/auth.types"
import { apiClient } from "../client"

let inMemorySession: AuthResponse | null = null

export function saveAuthSession(session: AuthResponse) {
  inMemorySession = session
  if (session?.tokens?.accessToken) {
    apiClient.setToken(session.tokens.accessToken)
  }
}

export function loadAuthSession(): AuthResponse | null {
  return inMemorySession
}

export function clearAuthSession() {
  inMemorySession = null
  apiClient.setToken(null)
}

export function getStoredAccessToken(): string | null {
  return inMemorySession?.tokens.accessToken ?? null
}

export async function initAuthSession(): Promise<AuthResponse | null> {
  try {
    const res = await apiClient.auth.refresh({ refreshToken: "" })

    if (res.tokens?.accessToken) {
      apiClient.setToken(res.tokens.accessToken)

      try {
        const user = await apiClient.auth.me()
        const session: AuthResponse = {
          user,
          tokens: res.tokens,
        }
        saveAuthSession(session)
        return session
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
