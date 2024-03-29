import { CourseList, CourseListConfig } from 'src/types/course.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'course'

interface NewCourseForm {
  course_name: string
  description: string
  credit: number
  limit: number
  start_time: number
  end_time: number
  attendance_ratio: number
  lab_ratio: number
  midterm_ratio: number
  final_ratio: number
}

const courseApi = {
  getCourseList(params: CourseListConfig) {
    return http.get<CourseList>(`${URL}/`, { params })
  },
  createCourse(body: NewCourseForm) {
    return http.post<SuccessRespone<string>>(`${URL}/`, body)
  }
}

export default courseApi
