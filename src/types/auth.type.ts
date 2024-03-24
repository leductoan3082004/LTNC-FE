import { SuccessRespone } from './utils.type'

export type AuthRespone = SuccessRespone<{
  token: string
  created: Date
  expiry: number
}>
