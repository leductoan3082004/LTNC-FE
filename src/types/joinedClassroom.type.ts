import { Classroom} from './classroom.type'
import { Course } from './course.type'
import { DetailedMember } from './member.type'
import { Paging } from './paging.type'

export interface JoinedClassroom {
  class: Classroom
  course: Course
  member: DetailedMember
}

export interface JoinedClassroomList {
  data: JoinedClassroom[]
  paging: Paging
}
