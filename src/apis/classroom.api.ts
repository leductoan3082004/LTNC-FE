import { ClassroomList, ClassroomListConfig } from 'src/types/classroom.type'
import { DetailedMemberList } from 'src/types/member.type'
import http from 'src/utils/http'

const URL = 'classroom'

const classroomApi = {
  getClassroomList(params: ClassroomListConfig) {
    return http.get<ClassroomList>(`${URL}/`, { params })
  },
  getMemberListInClassromm(params: { classroom_id: string }) {
    return http.get<DetailedMemberList>(`${URL}/member/`, { params })
  }
}
export default classroomApi
