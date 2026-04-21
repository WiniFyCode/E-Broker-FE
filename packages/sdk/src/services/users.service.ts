import { BaseService } from "./base.service"

export interface CreateUserDto {
  [key: string]: unknown
}

export interface UpdateUserDto {
  [key: string]: unknown
}

export interface User {
  id: string
  email: string
  fullName: string
  role: string
}

export class UsersService extends BaseService {
  create(data: CreateUserDto) {
    return this.client.post<User>("/users", data)
  }

  list() {
    return this.client.get<User[]>("/users")
  }

  getById(id: string) {
    return this.client.get<User>(`/users/${id}`)
  }

  update(id: string, data: UpdateUserDto) {
    return this.client.patch<User>(`/users/${id}`, data)
  }

  remove(id: string) {
    return this.client.delete<void>(`/users/${id}`)
  }
}
