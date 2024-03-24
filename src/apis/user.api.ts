import { AuthRespone } from 'src/types/auth.type'
import { User } from 'src/types/user.type'
import { SuccessRespone } from 'src/types/utils.type'
import { getAccessTokenFromLS } from 'src/utils/auth'
import http from 'src/utils/http'

const url = 'user'

// interface BodyUpdateProfile extends Omit<User, 'id' | 'role' | 'status' | 'created_at' | 'updated_at'> {
//   password?: string
//   newPasswird?: string
// }

interface ChangePasswordForm {
  old_password: string
  new_password: string
}

const userApi = {
  login(body: { username: string; password: string }) {
    return http.post<AuthRespone>(`${url}/login`, body)
  },
  getProfile() {
    const token = getAccessTokenFromLS()
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    return http.get<SuccessRespone<User>>(`${url}/profile`, { headers })
  },
  // updateProfile(body: BodyUpdateProfile) {
  //   return http.put<SuccessRespone<string>>('/auth/', body)
  // },
  // uploadAvatar(body: FormData) {
  //   return http.post<SuccessRespone<string>>('/auth/avatar', body, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  // },
  changePassword(body: ChangePasswordForm) {
    return http.post<SuccessRespone<string>>(`${url}/change-password`, body)
  }
}

export default userApi
