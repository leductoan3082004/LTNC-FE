import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import userApi from 'src/apis/user.api'
import LoadingSection from 'src/components/LoadingSection'
import useUserListQueryConfig from 'src/hooks/usePostListQueryConfig'
import AdminUserCard from '../AdminUserCard'
import { AdminContext } from 'src/contexts/admin.context'

export default function AdminTeacherSelector() {
  const { setCurrentTeacherId } = useContext(AdminContext)

  //! Get teacher list
  const userListQueryConfig = useUserListQueryConfig()
  const config = { ...userListQueryConfig, role: 1 }
  const { data: userListData } = useQuery({
    queryKey: ['admin_user_list', config],
    queryFn: () => userApi.getUserList(config)
  })
  const userList = userListData?.data.data || null

  //! Handle select teacher
  const handleClick = (teacherId: string) => () => {
    setCurrentTeacherId(teacherId)
  }

  return (
    <div>
      <p className='w-full text-center font-semibold desktop:text-xl uppercase text-primaryText'>Chọn giáo viên</p>

      <div className='py-4 px-20 desktop:px-32 w-full'>
        <div className='border-t-2 border-white'></div>
      </div>

      {!userListData && <LoadingSection />}

      {!userList && userListData && (
        <div className='py-4 h-20 text-center text-alertRed font-bold uppercase text-lg'>
          Không có giáo viên nào khả dụng
        </div>
      )}

      <div className='grid grid-cols-4 gap-4'>
        {userList &&
          userList.length > 0 &&
          userList.map((user) => (
            <div key={user._id} className='col-span-1'>
              <AdminUserCard user={user} handleClick={handleClick(user._id)} />
            </div>
          ))}
      </div>
    </div>
  )
}
