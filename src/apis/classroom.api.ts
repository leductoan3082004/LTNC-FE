import { ClassroomList, ClassroomListConfig } from 'src/types/classroom.type'
import { DetailedMemberList } from 'src/types/member.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'classroom'

export interface CreateClassroomForm {
  course_id: string
  weeks: number
  limit: number
  time_table: {
    lesson_start: number
    lesson_end: number
  }[]
}

export interface AddTeacherForm {
  classroom_id: string
  user_id: string
  role: 1
}

export interface UpdateScoreForm {
  classroom_id: string
  user_id: string
  attendance?: number
  lab?: number
  midterm?: number
  final?: number
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
  },
  addTeacherToClassroom(body: AddTeacherForm) {
    return http.post<SuccessRespone<string>>(`${URL}/member/`, body)
  },
  updateScoreForStudent(body: UpdateScoreForm) {
    return http.post<SuccessRespone<string>>(`${URL}/member/score`, body)
  },
  deleteClassroom(body: { classroom_ids: string[] }) {
    return http.delete(`${URL}/`, { data: body })
  }
}
export default classroomApi
