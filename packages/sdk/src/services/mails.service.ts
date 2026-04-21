import { BaseService } from "./base.service"
import type {
  DemoConfirmationResponse,
  SendDemoConfirmMailDto,
} from "../types/mails.types"

export class MailsService extends BaseService {
  demoConfirmation(data: SendDemoConfirmMailDto) {
    return this.client.post<DemoConfirmationResponse>(
      "/mails/demo-confirmation",
      data
    )
  }
}