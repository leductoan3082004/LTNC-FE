import { ClassroomList, ClassroomListConfig, MemberList } from 'src/types/classroom.type'
import http from 'src/utils/http'

const URL = 'classroom'

const classroomApi = {
  getClassroomList(params: ClassroomListConfig) {
    return http.get<ClassroomList>(`${URL}/`, { params })
  },
  getMemberListInClassromm(params: { classroom_id: string }) {
    return http.get<MemberList>(`${URL}/member/`, { params })
  }
}
export default classroomApi
