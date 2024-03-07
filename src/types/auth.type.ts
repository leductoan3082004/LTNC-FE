import { SuccessRespone } from './utils.type'

export type AuthRespone = SuccessRespone<{
  toekn: string
  created: Date
  expiry: number
}>
