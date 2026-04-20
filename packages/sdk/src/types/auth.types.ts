export interface RegisterDto {
  email: string
  password: string
  fullName?: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface RefreshDto {
  refreshToken: string
}

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface AuthResponse {
  user: AuthUser
  tokens: AuthTokens
}

export interface RefreshResponse {
  tokens: AuthTokens
}

export interface LogoutDto {
  refreshToken: string
}
