import { Paging } from './paging.type'

export interface Course {
  _id: string
  status: number
  created_at: string
  updated_at: string
  limit: number
  course_name: string
  credit: number
  description: string
  period: number
  attendance_ratio: number
  lab_ratio: number
  midterm_ratio: number
  final_ratio: number
  start_time: number
  end_time: number
}

export interface CourseList {
  data: Course[]
  paging: Paging
}

export interface CourseListConfig {
  query?: string
  end_time?: number | string
  page?: number | string
  limit?: number | string
}
