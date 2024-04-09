import { AxiosError, isAxiosError as checkAxiosError, HttpStatusCode } from 'axios'
import moment from 'moment'
import { floor } from 'lodash'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return checkAxiosError(error)
}

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-id:${id}`
}

export const getIdFromUrl = (idString: string) => {
  const arr = idString.split('id:')
  return arr[arr.length - 1]
}

export const formatDate = (timeStamp: string) => {
  return moment(timeStamp).utc().format('DD-MM-YYYY')
}

export const formatTimeToSeconds = (time: number) => {
  return floor(time / 1000)
}

export const showSuccessDialog = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, time?: number) => {
  setIsOpen(true)
  setTimeout(() => {
    setIsOpen(false)
  }, time || 1500)
}

export const generateID = (id: string) => {
  let MSSV = ''
  for (const c of id) {
    if (c >= '0' && c <= '9') MSSV = c + MSSV
    if (MSSV.length == 6) return MSSV
  }
  return ''
}
