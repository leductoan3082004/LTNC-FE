import { UserList, UserListConfig } from 'src/types/user.type'
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
    return http.post(`${URL}`, body)
  }
}

export default userApi
