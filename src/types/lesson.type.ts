import { JSONModel } from './utils.type'

export interface Material {
  key: string
  name: string
}

export interface LessonCreate {
  classroom_id: string
  name: string
  content: string
}

export interface Lesson extends JSONModel, LessonCreate {
  materials: Material[]
}

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
