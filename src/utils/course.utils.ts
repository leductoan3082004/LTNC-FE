import { removeSpecialCharacter } from './utils'

export const generateCourseId = ({ course, id }: { course: string; id: string }) => {
  return removeSpecialCharacter(course).replace(/\s/g, '-') + `:id:${id}`
}

export const getAcademicYearFromUrl = (url: string) => {
  const arr = url.split('/courses/')
  return arr[arr.length - 1]
}

export const getYearFromUrlInCourseDetailUrl = (url: string) => {
  const arr = url.split('/')
  return arr[2]
}
