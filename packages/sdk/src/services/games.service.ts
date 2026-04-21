import { BaseService } from "./base.service"
import type { SubmitGameDto, SubmitGameResponse } from "../types/games.types"

export class GamesService extends BaseService {
  submit(data: SubmitGameDto) {
    return this.client.post<SubmitGameResponse>("/games/submit", data)
  }
}
