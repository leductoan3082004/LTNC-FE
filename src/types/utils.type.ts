import { FieldError } from 'react-hook-form'

export interface ErrorRespone {
  message: string
  error_key: string
  status_code: number
  log: string
}

export interface SuccessRespone<Data> {
  data: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export interface InputField {
  error: FieldError | undefined
  errorMessage: string | undefined
  name: string
  title: string
  readonly?: boolean | false
}

export interface JSONModel {
  _id: string
  status: number
  created_at: string
  updated_at: string
}

export interface InfomationField {
  title: string
  info: string | number
}
