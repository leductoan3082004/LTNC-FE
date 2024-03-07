import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup.string().required('Phải điền tên đăng nhập'),
  password: yup.string().required('Phải điền mật khẩu')
})

export type LoginSchema = yup.InferType<typeof loginSchema>
