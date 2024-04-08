import { LessonCreate, LessonList, LessonListConfig } from 'src/types/lesson.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'lesson'

const lessonApi = {
  listLessons(params: LessonListConfig) {
    return http.get<LessonList>(`${URL}`, { params })
  },
  createLesson(body: LessonCreate) {
    return http.post<SuccessRespone<string>>(URL, body)
  },
  deleteLesson(lessonId: string) {
    const body = {
      lesson_id: lessonId
    }
    return http.delete<SuccessRespone<string>>(URL, { data: body })
  }
}

export default lessonApi
