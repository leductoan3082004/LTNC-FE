import { useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import LoadingSection from 'src/components/LoadingSection'
import useUserListQueryConfig, { USER_LIMIT } from 'src/hooks/usePostListQueryConfig'
import AdminUserCard from '../../components/AdminUserCard'
import UsePagination from 'src/components/UsePagination'
import { ceil } from 'lodash'
import { Fragment } from 'react/jsx-runtime'
import { User } from 'src/types/user.type'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import { generateNameId } from 'src/utils/utils'
import { adminPath } from 'src/constants/path'

export default function AdminStudentList() {
  const { setCurrentUser } = useContext(AdminContext)

  //! GET USER LIST
  const userListQueryConfig = useUserListQueryConfig()
  const config = { ...userListQueryConfig, role: 0 }

  const { data: userListData } = useQuery({
    queryKey: ['user_list', config],
    queryFn: () => userApi.getUserList(config)
  })

  //! Handle click
  const navigate = useNavigate()
  const handleClick = (user: User) => () => {
    setCurrentUser(user)
    navigate({ pathname: `${adminPath.users}/${generateNameId({ name: user.name, id: user._id })}` })
  }

  return (
    <div>
      <p className='w-full text-center font-semibold desktop:text-xl uppercase text-primaryText'>Danh sách sinh viên</p>

      <div className='py-4 px-20 w-full'>
        <div className='border-t border-white'></div>
      </div>

      {!userListData && <LoadingSection />}

      {userListData && (
        <Fragment>
          <div className='grid grid-cols-4 gap-4'>
            {userListData.data.data.map((user) => (
              <div key={user._id} className='col-span-1'>
                <AdminUserCard user={user} handleClick={handleClick(user)} />
              </div>
            ))}
          </div>
          <UsePagination queryConfig={config} totalPage={ceil(userListData.data.paging.total / USER_LIMIT)} />
        </Fragment>
      )}
    </div>
  )
}
