import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import authApi from 'src/apis/auth.api'
import mainPath from 'src/constants/path'
import { ClassroomContext } from 'src/contexts/classroom.context'
import ClassroomCard from './components/ClassroomCard'
import LoadingSection from 'src/components/LoadingSection'
import { AppContext } from 'src/contexts/app.context'

export default function ClassroomList() {
  const { isAuthenticated } = useContext(AppContext)
  const { setClassroomPathList } = useContext(ClassroomContext)

  useEffect(() => {
    document.title = 'LTNC | Lớp học của tôi'
    setClassroomPathList([{ pathName: 'lớp học', url: mainPath.classroomList }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //! Get classroom list
  const { data: ClassRoomListData } = useQuery({
    queryKey: ['classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList(),
    enabled: isAuthenticated
  })
  const classroomList = ClassRoomListData?.data.data

  return (
    <div className='container flex flex-col bg-webColor100 py-6 min-h-[100vh]'>
      <div className='flex flex-col gap-2 pb-3 border-b title'>
        <h1 className='text-2xl uppercase font-semibold text-center tracking-wide'>Lớp học của tôi</h1>
      </div>

      {!classroomList && <LoadingSection />}
      {classroomList && (
        <div className='grid grid-cols-3 gap-4'>
          {classroomList.map((classroom) => (
            <div className='col-span-1' key={classroom.class._id}>
              <ClassroomCard classroomDetail={classroom} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
