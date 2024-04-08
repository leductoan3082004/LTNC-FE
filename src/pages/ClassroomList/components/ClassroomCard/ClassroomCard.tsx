import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import classroomApi from 'src/apis/classroom.api'
import mainPath from 'src/constants/path'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { JoinedClassroom } from 'src/types/joinedClassroom.type'
import { generateClassroomName } from 'src/utils/classroom.utils'
import { generateNameId } from 'src/utils/utils'

interface Props {
  classroomDetail: JoinedClassroom
}

export default function ClassroomCard({ classroomDetail }: Props) {
  const { setSubject, setCurrentClassroom } = useContext(ClassroomContext)

  //! handle click item
  const navigate = useNavigate()
  const handleClickItem = (classroom: JoinedClassroom) => () => {
    setSubject(classroomDetail.course.course_name)
    setCurrentClassroom(classroom)
    navigate({
      pathname: `${mainPath.classroomList}/${generateNameId({ name: classroom.course.course_name, id: classroom.class._id })}`
    })
  }

  //! HANDLE GET TEACHER
  //:: get current classroom
  const { data: memberListData } = useQuery({
    queryKey: ['classroom_member_list', classroomDetail.class._id],
    queryFn: () => classroomApi.getMemberListInClassromm({ classroom_id: classroomDetail.class._id })
  })
  const memberList = memberListData?.data.data || []

  //:: get teacher
  const teacher = memberList.find((member) => {
    return member.role == 1
  })

  return (
    <button
      key={classroomDetail.class._id}
      onClick={handleClickItem(classroomDetail)}
      className='text-lg border px-4 py-8 space-y-2 w-full bg-webColor200 rounded-md border-black/20 items-center desktop:text-xl text-center hover:bg-webColor300'
    >
      <p className='font-semibold'>{classroomDetail.course.course_name}</p>
      <p className='flex space-x-1 text-base'>
        <span className=''>Lớp</span>
        <span className='uppercase text-primaryText font-medium'>
          {generateClassroomName(classroomDetail.class._id)}
        </span>
      </p>
      <p className='flex space-x-1 text-base'>
        <span className=''>Giáo viên:</span>
        <span className='text-primaryText font-medium'>{teacher?.name}</span>
      </p>
    </button>
  )
}
