import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import LoadingSection from 'src/components/LoadingSection'
import { AppContext } from 'src/contexts/app.context'
import ClassroomCard from '../../components/ClassroomCard'
import { ClassroomContext } from 'src/contexts/classroom.context'

export default function ClassroomListByYear() {
  const { isAuthenticated } = useContext(AppContext)
  const { setAcademicYear } = useContext(ClassroomContext)

  //! Get year from url
  const arr = useLocation().pathname.split('/')
  const academicYear = arr[arr.length - 1]
  useEffect(() => {
    setAcademicYear(academicYear)
  }, [academicYear, setAcademicYear])

  //! Get classroom list
  const { data: joinedClassRoomListData, isFetched } = useQuery({
    queryKey: ['classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList(),
    enabled: isAuthenticated
  })
  const joinedClassroomList = joinedClassRoomListData?.data.data || []
  const joinedClassroomListByYear = joinedClassroomList.filter((classroom) => {
    return new Date(classroom.course.start_time).getFullYear() == Number(academicYear)
  })

  return (
    <div className='container flex flex-col bg-webColor100 py-6 min-h-[100vh]'>
      <div className='flex flex-col gap-2 pb-3 border-b title'>
        <h1 className='text-2xl uppercase font-semibold text-center tracking-wide'>Lớp học của tôi</h1>
        <div className='py-2 flex justify-center items-center w-full tracking-widest text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
          {`Năm học: ${academicYear}`}
        </div>
      </div>

      {!isFetched && <LoadingSection />}
      {isFetched && (
        <div className='grid grid-cols-3 gap-4'>
          {joinedClassroomListByYear.map((classroom) => (
            <div className='col-span-1' key={classroom.class._id}>
              <ClassroomCard classroomDetail={classroom} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
