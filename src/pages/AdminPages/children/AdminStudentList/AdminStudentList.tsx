import { useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import LoadingSection from 'src/components/LoadingSection'
import useUserListQueryConfig, { USER_LIMIT } from 'src/hooks/usePostListQueryConfig'
import AdminUserCard from '../../components/AdminUserCard'
import UsePagination from 'src/components/UsePagination'
import { ceil } from 'lodash'
import { Fragment } from 'react/jsx-runtime'

export default function AdminStudentList() {
  //! GET USER LIST
  const userListQueryConfig = useUserListQueryConfig()
  const config = { ...userListQueryConfig, role: 0 }

  const { data: userListData } = useQuery({
    queryKey: ['user_list', config],
    queryFn: () => userApi.getUserList(config)
  })

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
                <AdminUserCard user={user} />
              </div>
            ))}
          </div>
          <UsePagination queryConfig={config} totalPage={ceil(userListData.data.paging.total / USER_LIMIT)} />
        </Fragment>
      )}
    </div>
  )
}
