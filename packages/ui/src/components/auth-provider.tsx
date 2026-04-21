"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import {
  apiClient,
  initAuthSession,
  clearAuthSession,
  AuthResponse,
  AuthUser,
} from "@workspace/sdk"

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (session: AuthResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    initAuthSession()
      .then((session) => {
        if (isMounted && session) {
          setUser(session.user)
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const login = (session: AuthResponse) => {
    setUser(session.user)
  }

  const logout = () => {
    setUser(null)
    clearAuthSession()
    apiClient.auth.logout({ refreshToken: "" }).catch(() => {})
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
