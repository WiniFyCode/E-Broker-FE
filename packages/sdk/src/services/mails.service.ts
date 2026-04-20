import { BaseService } from "./base.service.js"
import type {
  DemoConfirmationResponse,
  SendDemoConfirmMailDto,
} from "../types/mails.types.js"

export class MailsService extends BaseService {
  demoConfirmation(data: SendDemoConfirmMailDto) {
    return this.client.post<DemoConfirmationResponse>(
      "/mails/demo-confirmation",
      data
    )
  }
}