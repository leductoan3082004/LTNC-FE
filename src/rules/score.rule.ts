import * as yup from 'yup'

export const updateScoreSchema = yup.object({
  classroom_id: yup.string().required('Yêu cầu có ID khóa học'),
  user_id: yup.string().required('Yêu cầu có ID khóa học'),
  attendance: yup.number().min(0).max(10),
  lab: yup.number().min(0).max(10),
  midterm: yup.number().min(0).max(10),
  final: yup.number().min(0).max(10)
})
export type UpdateScoreSchema = yup.InferType<typeof updateScoreSchema>
