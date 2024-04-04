import * as yup from 'yup'

export const adminCreateClassroomSchema = yup.object({
  teacher_id: yup.string().required('Yêu cầu có ID giáo viên'),
  course_id: yup.string().required('Yêu cầu có ID khóa học'),
  limit: yup.number().required('Yêu cầu điền số lớp học tối đa'),
  weeks: yup.number().required('Yêu cầu điền số tuần học'),
  lesson_start: yup.date().required('Yêu cầu điền lịch học'),
  lesson_end: yup.date().required('Yêu cầu điền lịch học')
})
export type AdminCreateClassroomSchema = yup.InferType<typeof adminCreateClassroomSchema>