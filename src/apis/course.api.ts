import { CourseList, CourseListConfig } from 'src/types/course.type'
import http from 'src/utils/http'

const URL = 'course'

const courseApi = {
  getCourseList(params: CourseListConfig) {
    return http.get<CourseList>(`${URL}/`, { params })
  }
}

export default courseApi
