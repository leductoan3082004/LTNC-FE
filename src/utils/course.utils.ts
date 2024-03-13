import { removeSpecialCharacter } from './utils'

export const generateCourseId = ({ course, id }: { course: string; id: string }) => {
  return removeSpecialCharacter(course).replace(/\s/g, '-') + `:id:${id}`
}
