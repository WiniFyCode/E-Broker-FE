export interface SendDemoConfirmMailDto {
  to: string
  user: string
  hash: string
}

export interface DemoConfirmationResponse {
  success: boolean
  message: string
}