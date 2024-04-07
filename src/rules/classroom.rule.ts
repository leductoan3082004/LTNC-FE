import * as yup from 'yup'

export const adminCreateClassroomSchema = yup.object({
  course_id: yup.string().required('Yêu cầu có ID khóa học'),
  limit: yup.number().required('Yêu cầu điền số lớp học tối đa'),
  weeks: yup.number().required('Yêu cầu điền số tuần học'),
  lesson_start: yup.number().required('Yêu cầu điền giờ bắt đầu tiết học'),
  lesson_end: yup.number().required('Yêu cầu điền giờ kết thúc tiết học'),
  date: yup.date().required('Yêu cầu điền ngày học trong tuần')
})
export type AdminCreateClassroomSchema = yup.InferType<typeof adminCreateClassroomSchema>
