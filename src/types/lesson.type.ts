import { JSONModel } from './utils.type'

export interface LessonCreate {
  classroom_id: string
  name: string
  content: string
}

export interface Lesson extends JSONModel, LessonCreate {}

export interface LessonUpdate {
  lesson_id: string
  name: string
  content: string
}

export interface LessonList {
  data: Lesson[]
}

export interface LessonListConfig {
  classroom_id: string
}
