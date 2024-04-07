import * as yup from 'yup'

export const adminCreateUserSchema = yup.object({
  username: yup.string().required('Yêu cầu điền tài khoản'),
  password: yup.string().required('Yêu cầu điền mật khẩu'),
  name: yup.string().required('Yêu cầu điền tên'),
  phone: yup.string().required('Yêu cầu điền SĐT'),
  address: yup.string().required('Yêu cầu điền địa chỉ'),
  role: yup.number().required('Yêu cầu chọn vai trò').min(0, 'Vai trò không hợp lệ').max(2, 'Vai trò không hợp lệ')
})
export type AdminCreateUserSchema = yup.InferType<typeof adminCreateUserSchema>
