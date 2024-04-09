import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import userApi from 'src/apis/user.api'
import BackButton from 'src/components/BackButton'
import LoadingSection from 'src/components/LoadingSection'
import { adminPath } from 'src/constants/path'
import { userRoles } from 'src/constants/userRoles'
import { AdminContext } from 'src/contexts/admin.context'
import { InfomationField } from 'src/types/utils.type'
import { generateID, getIdFromUrl } from 'src/utils/utils'
import AdminClassroomCard from '../../components/AdminClassroomCard'

export default function AdminUserDetail() {
  const { currentUser } = useContext(AdminContext)

  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) {
      navigate(adminPath.users)
    }
  })

  //! get information
  let infos: InfomationField[] = []

  if (currentUser) {
    infos = [
      {
        title: 'Họ tên',
        info: currentUser.name
      },
      {
        title: 'ID',
        info: generateID(currentUser._id)
      },
      {
        title: 'SĐT',
        info: currentUser.phone
      },
      {
        title: 'Địa chỉ',
        info: currentUser.address
      },
      {
        title: 'Vai trò',
        info: userRoles[currentUser.role]
      }
    ]
  }

  //! Get joined classroom
  const userId = getIdFromUrl(useLocation().pathname)
  const config = { user_id: userId }
  const { data: classroomListData } = useQuery({
    queryKey: ['admin_classroom_list_of_user', currentUser?._id],
    queryFn: () => userApi.getClassrooomListOfUser(config)
  })
  const joinedclassroomList = classroomListData?.data.data

  return (
    <div className='space-y-8'>
      <BackButton />
      <div className='space-y-4 px-4 tablet:px-10 desktop:px-20'>
        <p className='text-center font-semibold uppercase text-xl desktop:text-3xl tracking-widest text-primaryText'>
          Thông tin tài khoản
        </p>

        {infos.map((info, index) => (
          <div key={index} className='grid desktop:text-lg grid-cols-4 gap-4'>
            <p className='col-span-1 opacity-60'>{info.title}</p>
            <p className='col-span-3'>{info.info}</p>
          </div>
        ))}
      </div>

      <div className='space-y-4'>
        <p className='text-center font-semibold uppercase text-lg desktop:text-xl tracking-wide text-primaryText'>
          Các lớp học đang tham gia
        </p>

        {!joinedclassroomList && <LoadingSection />}
        {joinedclassroomList && (
          <div className='grid grid-cols-3 gap-4'>
            {joinedclassroomList.map((classroom, index) => (
              <div key={classroom.class._id} className='col-span-1'>
                <AdminClassroomCard classroom={classroom.class} index={index} course={classroom.course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
