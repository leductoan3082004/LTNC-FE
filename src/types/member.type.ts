import { JSONModel } from './utils.type'

export interface StudentScore {
  attendance: number
  lab: number
  midterm: number
  final: number
}
export interface SimpleMember extends StudentScore {
  user_id: string
  role: number
}

export interface DetailedMember extends JSONModel, StudentScore {
  role: number
  name: string
  phone: string
  address: string
}

export interface DetailedMemberList {
  data: DetailedMember[]
}
