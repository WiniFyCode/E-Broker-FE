import type { AuthResponse } from "../types/auth.types"

export const AUTH_SESSION_STORAGE_KEY = "ebroker.auth.session"

function isBrowser() {
  return typeof window !== "undefined"
}

function getStorage(remember: boolean) {
  if (!isBrowser()) {
    return null
  }

  return remember ? window.localStorage : window.sessionStorage
}

export function saveAuthSession(session: AuthResponse, remember = true) {
  const storage = getStorage(remember)
  if (!storage) {
    return
  }

  storage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session))
}

export function loadAuthSession() {
  if (!isBrowser()) {
    return null
  }

  const persistent = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY)
  if (persistent) {
    return JSON.parse(persistent) as AuthResponse
  }

  const session = window.sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY)
  if (session) {
    return JSON.parse(session) as AuthResponse
  }

  return null
}

export function clearAuthSession() {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
  window.sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
}

export function getStoredAccessToken() {
  return loadAuthSession()?.tokens.accessToken ?? null
}
