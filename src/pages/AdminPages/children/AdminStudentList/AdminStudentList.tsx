import { useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import LoadingSection from 'src/components/LoadingSection'
import useUserListQueryConfig from 'src/hooks/usePostListQueryConfig'
import AdminUserCard from '../../components/AdminUserCard'

export default function AdminStudentList() {
  //! GET USER LIST
  const userListQueryConfig = useUserListQueryConfig()
  const config = { ...userListQueryConfig, role: 0 }

  const { data: userListData } = useQuery({
    queryKey: ['user_list', config],
    queryFn: () => userApi.getUserList(config)
  })

  return (
    <div className='rounded-lg bg-webColor200 p-4'>
      <p className='w-full text-center font-semibold desktop:text-xl uppercase text-primaryText'>Danh sách sinh viên</p>

      <div className='py-4 px-20 w-full'>
        <div className='border-t border-white'></div>
      </div>

      {!userListData && <LoadingSection />}

      <div className='grid grid-cols-4 gap-4'>
        {userListData &&
          userListData.data.data.map((user) => (
            <div key={user._id} className='col-span-1'>
              <AdminUserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  )
}
