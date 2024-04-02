import { ClassroomList, ClassroomListConfig } from 'src/types/classroom.type'
import http from 'src/utils/http'

const URL = 'classroom'

const classroomApi = {
  getClassroomList(params: ClassroomListConfig) {
    return http.get<ClassroomList>(`${URL}/`, { params })
  }
}
export default classroomApi
