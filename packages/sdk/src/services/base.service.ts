import type { ApiClient } from "../client.js"

export abstract class BaseService {
  protected readonly client: ApiClient

  constructor(client: ApiClient) {
    this.client = client
  }

  protected setToken(token: string | null) {
    this.client.setToken(token)
  }
}
