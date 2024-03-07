import { AuthRespone } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  loginAccount(body: { username: string; password: string }) {
    return http.post<AuthRespone>('/login', body)
  }
}

export default authApi
