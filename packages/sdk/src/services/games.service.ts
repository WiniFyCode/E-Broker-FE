import { BaseService } from "./base.service.js"
import type { SubmitGameDto, SubmitGameResponse } from "../types/games.types.js"

export class GamesService extends BaseService {
  submit(data: SubmitGameDto) {
    return this.client.post<SubmitGameResponse>("/games/submit", data)
  }
}
