import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'classroom/member'

const memberApi = {
  registerToClassroom(classroomId: string) {
    return http.post<SuccessRespone<string>>(`${URL}/${classroomId}`)
  }
}

export default memberApi
