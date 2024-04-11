import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import LoadingSection from 'src/components/LoadingSection'
import ClassroomCard from '../../components/ClassroomCard'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { classroomPath } from 'src/constants/path'

interface Props {
  year: number
}

export default function ClassroomSortingByYear({ year }: Props) {
  const { isAuthenticated } = useContext(AppContext)
  const { setAcademicYear } = useContext(ClassroomContext)

  //! HANDLE CHOOSE YEAR
  const navigate = useNavigate()
  const handleSelectYear = () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${classroomPath.classroomList}/${year}` })
  }

  //! Get classroom list
  const { data: joinedClassRoomListData, isFetched } = useQuery({
    queryKey: ['classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList(),
    enabled: isAuthenticated
  })
  const joinedClassroomList = joinedClassRoomListData?.data.data || []
  const joinedClassroomListByYear = joinedClassroomList.filter((classroom) => {
    return new Date(classroom.course.start_time).getFullYear() == Number(year)
  })

  if (joinedClassroomListByYear.length == 0 || !isFetched) return
  return (
    <div className='container flex flex-col bg-webColor100 py-6'>
      <button
        onClick={handleSelectYear}
        className='flex items-center justify-center w-full py-2 text-lg font-semibold uppercase hover:text-primaryText desktop:text-2xl shrink-0 '
      >
        {`Năm học: ${year}`}
      </button>
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
