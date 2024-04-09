import { LessonCreate, LessonList, LessonListConfig } from 'src/types/lesson.type'
import { SuccessRespone } from 'src/types/utils.type'
import { getAccessTokenFromLS } from 'src/utils/auth'
import http from 'src/utils/http'

const URL = 'lesson/'

const lessonApi = {
  listLessons(params: LessonListConfig) {
    return http.get<LessonList>(URL, { params })
  },
  createLesson(body: LessonCreate) {
    return http.post<SuccessRespone<string>>(URL, body)
  },
  uploadMaterial(data: { lessonId: string; file: File }) {
    const body = {
      file: data.file
    }
    return http.post<SuccessRespone<string>>(`${URL}upload/${data.lessonId}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getMaterial(materialKey: string) {
    const token = getAccessTokenFromLS()
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return http.get<string>(`${URL}material/${materialKey}`, { headers, responseType: 'blob' })
  },
  deleteLesson(body: { lesson_id: string; classroom_id: string }) {
    return http.delete<SuccessRespone<string>>(URL, { data: body })
  }
}

export default lessonApi
