import { UserList, UserListConfig } from 'src/types/user.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'user'

interface NewUserForm {
  username: string
  password: string
  name: string
  phone: string
  address: string
  role: number
}

const userApi = {
  getUserList(params: UserListConfig) {
    return http.get<UserList>(`${URL}/`, { params })
  },
  createUser(body: NewUserForm) {
    return http.post<SuccessRespone<string>>(`${URL}/`, body)
  }
}

export default userApi
