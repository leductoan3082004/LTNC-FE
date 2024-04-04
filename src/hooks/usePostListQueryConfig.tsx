import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { UserListConfig } from 'src/types/user.type'

export type UserListQueryConfig = {
  [key in keyof UserListConfig]: string
}

export const USER_LIMIT = 40

export default function useUserListQueryConfig() {
  const queryParams: UserListQueryConfig = useQueryParams()
  const queryConfig: UserListQueryConfig = omitBy(
    {
      role: queryParams.role,
      page: queryParams.page || 1,
      limit: queryParams.limit || USER_LIMIT
    },
    isUndefined
  )
  return queryConfig
}
