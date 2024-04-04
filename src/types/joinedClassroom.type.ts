import { Classroom, MemberInClassroom } from './classroom.type'
import { Course } from './course.type'
import { Paging } from './paging.type'

export interface JoinedClassroom {
  class: Classroom
  course: Course
  member: MemberInClassroom
}

export interface JoinedClassroomList {
  data: JoinedClassroom[]
  paging: Paging
}
