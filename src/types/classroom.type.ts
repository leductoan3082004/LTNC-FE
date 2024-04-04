import { SimpleMember } from './member.type'
import { Paging } from './paging.type'

export interface TimeTable {
  id: string
  lesson_start: string
  lesson_end: string
}

export interface Classroom {
  _id: string
  status: number
  created_at: string
  updated_at: string
  course_id: string
  time_table: TimeTable[]
  limit: number
  members: SimpleMember[] | null
}

export interface ClassroomList {
  data: Classroom[]
  paging: Paging
}

export interface ClassroomListConfig {
  course_id: string
}
