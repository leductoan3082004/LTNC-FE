import { AuthRespone } from 'src/types/auth.type'
import { JoinedClassroomList } from 'src/types/joinedClassroom.type'
import { User } from 'src/types/user.type'
import { SuccessRespone } from 'src/types/utils.type'
import { getAccessTokenFromLS } from 'src/utils/auth'
import http from 'src/utils/http'

const URL = 'user'

// interface BodyUpdateProfile extends Omit<User, 'id' | 'role' | 'status' | 'created_at' | 'updated_at'> {
//   password?: string
//   newPasswird?: string
// }

interface ChangePasswordForm {
  old_password: string
  new_password: string
}

const authApi = {
  login(body: { username: string; password: string }) {
    return http.post<AuthRespone>(`${URL}/login`, body)
  },
  getProfile() {
    const token = getAccessTokenFromLS()
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    return http.get<SuccessRespone<User>>(`${URL}/profile`, { headers })
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
    return http.post<SuccessRespone<string>>(`${URL}/change-password`, body)
  },
  getJoinedClassroomList() {
    return http.get<JoinedClassroomList>(`${URL}/class`)
  }
}

export default authApi
