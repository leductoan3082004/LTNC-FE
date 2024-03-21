import * as yup from 'yup'

//! SUPPORT FUNCTIONS
const handlePasswordYup = () => {
  return yup
    .string()
    .required('Bạn phải điền mật khẩu')
    .min(8, 'Độ dài mật khẩu phải từ 8 đến 16 ký tự')
    .max(16, 'Độ dài mật khẩu phải từ 8 đến 16 ký tự')
}
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Bạn phải xác nhận mật khẩu')
    .min(8, 'Độ dài mật khẩu phải từ 8 đến 16 ký tự')
    .max(16, 'Độ dài mật khẩu phải từ 8 đến 16 ký tự')
    .oneOf([yup.ref(refString)], 'Mật khẩu không khớp')
}

export const loginSchema = yup.object({
  username: yup.string().required('Bạn phải điền tên đăng nhập'),
  password: yup.string().required('Bạn phải điền mật khẩu')
})

export type LoginSchema = yup.InferType<typeof loginSchema>

export const changePasswordSchema = yup.object({
  old_password: yup.string().required('Bạn cần phải điền mật khẩu hiện tại'),
  new_password: handlePasswordYup(),
  confirm_new_password: handleConfirmPasswordYup('new_password')
})

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>
