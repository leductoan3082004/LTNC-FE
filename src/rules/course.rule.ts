import * as yup from 'yup'

const currentDate = new Date()

export const adminCreateCourseSchema = yup.object({
  course_name: yup.string().required('Yêu cầu điền tên khóa học'),
  description: yup.string().required('Yêu cầu điền miêu tả'),
  credit: yup.number().required('Yêu cầu điền số tín chỉ'),
  limit: yup.number().required('Yêu cầu điền số lớp học tối đa'),
  attendance_ratio: yup.number().required('Yêu cầu điền % điểm chuyên cần'),
  lab_ratio: yup.number().required('Yêu cầu điền % điểm lab'),
  midterm_ratio: yup.number().required('Yêu cầu điền % điểm giữa kì'),
  final_ratio: yup.number().required('Yêu cầu điền % điểm cuối kì'),
  start_time: yup.date().required('Yêu cầu điền thời gian mở đăng ký'),
  // .min(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), 'Thời gian không hợp lệ'),
  end_time: yup.date().required('Yêu cầu điền thời gian đóng đăng ký')
  // .min(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), 'Thời gian không hợp lệ')
})
export type AdminCreateCourseSchema = yup.InferType<typeof adminCreateCourseSchema>

export const courseTimeSchema = yup.object({
  start_time: yup
    .date()
    .min(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), 'Thời gian không hợp lệ'),
  end_time: yup
    .date()
    .min(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), 'Thời gian không hợp lệ')
})
export type CourseTimeSchema = yup.InferType<typeof courseTimeSchema>

export const adminUpdateCourseSchema = yup.object({
  course_id: yup.string().required('Bắt buộc điền ID khóa học'),
  course_name: yup.string().default(''),
  description: yup.string().default(''),
  credit: yup.number().default(0),
  limit: yup.number().default(0),
  attendance_ratio: yup.number().default(0),
  lab_ratio: yup.number().default(0),
  midterm_ratio: yup.number().default(0),
  final_ratio: yup.number().default(0),
  start_time: yup.date().default(currentDate),
  end_time: yup.date().default(currentDate)
})
export type AdminUpdateCourseSchema = yup.InferType<typeof adminUpdateCourseSchema>

export const courseSearchSchema = yup.object({
  query: yup.string().default('')
})
export type CourseSearchSchema = yup.InferType<typeof courseSearchSchema>
