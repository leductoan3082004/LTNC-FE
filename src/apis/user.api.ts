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
  createUser(body: NewUserForm) {
    return http.post(`${URL}`, body)
  }
}

export default userApi
