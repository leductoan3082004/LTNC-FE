import { Fragment, ReactNode, useContext, useEffect } from 'react'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { generateClassroomName, getClassroomIdFromUrl } from 'src/utils/classroom.utils'
import ClassroomDetailHeader from '../../components/ClassroomDetailHeader'
import { AppContext } from 'src/contexts/app.context'
import authApi from 'src/apis/auth.api'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import mainPath from 'src/constants/path'
import LoadingSection from 'src/components/LoadingSection'

interface Props {
  children: ReactNode
}

export default function ClassroomDetailLayout({ children }: Props) {
  const { isAuthenticated } = useContext(AppContext)
  const { setClassroomPathList, setCurrentClassroom, currentClassroom } = useContext(ClassroomContext)

  const url = useLocation().pathname
  const classroomId = getClassroomIdFromUrl(url)

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

  // useEffect(() => {
  //   if (!currentClassroom) {
  //     navigate(mainPath.classroomList)
  //   }
  // })
  return (
    <Fragment>
      {!currentClassroom && <LoadingSection />}

      {currentClassroom && (
        <div className='space-y-8'>
          <p className='tracking-wider font-semibold text-xl text-center uppercase desktop:text-3xl text-webColor700'>
            {currentClassroom.course.course_name} ({generateClassroomName(currentClassroom.class._id)})
          </p>

          <ClassroomDetailHeader />

          <div className=''>{children}</div>
        </div>
      )}
    </Fragment>
  )
}
