import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import classroomApi from 'src/apis/classroom.api'
import courseApi from 'src/apis/course.api'
import mainPath from 'src/constants/path'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { JoinedClassroom } from 'src/types/joinedClassroom.type'
import { SimpleMember } from 'src/types/member.type'
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
  const { data: classroomListData } = useQuery({
    queryKey: ['member_list', classroomDetail.class._id],
    queryFn: () => classroomApi.getClassroomList({ course_id: classroomDetail.course._id })
  })
  const classroomList = classroomListData?.data.data || []

  //:: get memeber list
  const currentClassroom = classroomList.find((classroom) => {
    return classroom._id == classroomDetail.class._id
  })
  const memberList = currentClassroom?.members || []

  //:: get teacher
  const teacher: SimpleMember = memberList.find((member) => {
    return member.role == 1
  })

  return (
    <button
      key={classroomDetail.class._id}
      onClick={handleClickItem(classroomDetail)}
      className='text-lg border-t first:border-none items-center border-black/60 desktop:text-xl py-2 text-center justify-between flex font-medium text-webColor600 hover:text-webColor800'
    >
      <span>{classroomDetail.course.course_name}</span>
      <p className='flex space-x-1 text-base'>
        <span className=''>Lớp</span>
        <span className='uppercase'>{generateClassroomName(classroomDetail.class._id)}</span>
      </p>
      {/* <p className='flex space-x-1 text-base'>
        <span className=''>Giáo viên:</span>
      </p> */}
    </button>
  )
}
