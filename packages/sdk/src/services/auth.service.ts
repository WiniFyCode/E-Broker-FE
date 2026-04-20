import { BaseService } from "./base.service.js"
import type {
  AuthResponse,
  AuthUser,
  LoginDto,
  LogoutDto,
  RefreshDto,
  RefreshResponse,
  RegisterDto,
} from "../types/auth.types.js"

export class AuthService extends BaseService {
  register(data: RegisterDto) {
    return this.client.post<AuthResponse>("/auth/register", data)
  }

  login(data: LoginDto) {
    return this.client.post<AuthResponse>("/auth/login", data)
  }

  refresh(data: RefreshDto) {
    return this.client.post<RefreshResponse>("/auth/refresh", data)
  }

  logout(data: LogoutDto) {
    return this.client.post<{ success: boolean }>("/auth/logout", data)
  }

  me() {
    return this.client.get<AuthUser>("/auth/me")
  }
}
