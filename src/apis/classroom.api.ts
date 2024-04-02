import { ClassroomList, ClassroomListConfig } from 'src/types/classroom.type'
import { UserList } from 'src/types/user.type'
import http from 'src/utils/http'

const URL = 'classroom'

const classroomApi = {
  getClassroomList(params: ClassroomListConfig) {
    return http.get<ClassroomList>(`${URL}/`, { params })
  },
  getMemberListInClassromm(params: { classroom_id: string }) {
    return http.get<UserList>(`${URL}/member/`, { params })
  }
}
export default classroomApi
