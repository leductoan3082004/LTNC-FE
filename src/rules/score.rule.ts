import * as yup from 'yup'

export const updateScoreSchema = yup.object({
  classroom_id: yup.string().required('Yêu cầu có ID khóa học'),
  user_id: yup.string().required('Yêu cầu có ID khóa học'),
  attendance: yup.number(),
  lab: yup.number(),
  midterm: yup.number(),
  final: yup.number()
})
export type UpdateScoreSchema = yup.InferType<typeof updateScoreSchema>
