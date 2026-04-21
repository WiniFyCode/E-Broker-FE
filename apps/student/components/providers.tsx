"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/theme-provider"
import { apiClient, getStoredAccessToken } from "@workspace/sdk"

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    apiClient.setToken(getStoredAccessToken())
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}
