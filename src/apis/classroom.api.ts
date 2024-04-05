import { ClassroomList, ClassroomListConfig } from 'src/types/classroom.type'
import { DetailedMemberList } from 'src/types/member.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'classroom'

export interface CreateClassroomForm {
  teacher_id: string
  course_id: string
  weeks: number
  limit: number
  time_table: {
    lesson_start: number
    lesson_end: number
  }[]
}

const classroomApi = {
  getClassroomList(params: ClassroomListConfig) {
    return http.get<ClassroomList>(`${URL}/`, { params })
  },
  createClassroom(body: CreateClassroomForm) {
    return http.post<SuccessRespone<string>>(`${URL}/`, body)
  },
  getMemberListInClassromm(params: { classroom_id: string }) {
    return http.get<DetailedMemberList>(`${URL}/member/`, { params })
  }
}
export default classroomApi
