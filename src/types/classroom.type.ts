import { Paging } from './paging.type'

export interface MemberInClassroom {
  user_id: string
  role: number
  attendance: number
  lab: number
  midterm: number
  final: number
}

export interface TimeTable {
  id: string
  lesson_start: string
  lesson_end: string
}

export interface Classromm {
  _id: string
  status: number
  created_at: string
  updated_at: string
  course_id: string
  time_table: TimeTable[]
  limit: number
  members: MemberInClassroom[] | null
}

export interface ClassroomList {
  data: Classromm[]
  paging: Paging
}

export interface ClassroomListConfig {
  course_id: string
}
