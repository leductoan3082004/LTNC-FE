import { Paging } from './paging.type'
import { JSONModel } from './utils.type'

export interface TimeTable {
  id: string
  lesson_start: string
  lesson_end: string
}

export interface StudentScore {
  attendance: number
  lab: number
  midterm: number
  final: number
}
export interface MemberInClassroom extends StudentScore {
  user_id: string
  role: number
}

export interface Member extends JSONModel, StudentScore {
  role: number
  name: string
  phone: string
  address: string
}

export interface MemberList {
  data: Member[]
}

export interface Classroom {
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
  data: Classroom[]
  paging: Paging
}

export interface ClassroomListConfig {
  course_id: string
}
