import { Fragment, useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ClassroomDetailForStudent from '../../components/ClassroomDetailForStudent'
import ClassroomDetailForTeacher from '../../components/ClassroomDetailForTeacher'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { getIdFromUrl } from 'src/utils/utils'
import { useLocation } from 'react-router-dom'
import { generateClassroomName } from 'src/utils/classroom.utils'
import mainPath from 'src/constants/path'
import authApi from 'src/apis/auth.api'
import { useQuery } from '@tanstack/react-query'

export default function ClassroomDetail() {
  const { profile, isAuthenticated } = useContext(AppContext)
  const { setClassroomPathList, setCurrentClassroom } = useContext(ClassroomContext)

  const url = useLocation().pathname
  const classroomId = getIdFromUrl(url)

  //! Get joined classroom
  const { data: ClassRoomListData } = useQuery({
    queryKey: ['classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList(),
    enabled: isAuthenticated
  })
  const classroomList = ClassRoomListData?.data.data || []
  const thisClassroom = classroomList.find((classroom) => classroom.class._id == classroomId)

  useEffect(() => {
    if (thisClassroom) {
      setCurrentClassroom(thisClassroom)
      setClassroomPathList([
        {
          pathName: `Lớp học`,
          url: mainPath.classroomList
        },
        {
          pathName: `${thisClassroom?.course.course_name} - Lớp ${generateClassroomName(classroomId)}`,
          url: '',
          isNotALink: true
        }
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisClassroom])

  const isStudent = profile?.role == 0

  return (
    <div className='p-4 border rounded-lg border-black/20'>
      {!thisClassroom && (
        <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
      )}
      {thisClassroom && (
        <Fragment>
          {isStudent && <ClassroomDetailForStudent />}
          {!isStudent && <ClassroomDetailForTeacher />}
        </Fragment>
      )}
    </div>
  )
}
