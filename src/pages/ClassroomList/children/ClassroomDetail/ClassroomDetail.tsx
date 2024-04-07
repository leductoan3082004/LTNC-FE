import React, { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ClassroomDetailForStudent from '../../components/ClassroomDetailForStudent'
import ClassroomDetailForTeacher from '../../components/ClassroomDetailForTeacher'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { getIdFromUrl } from 'src/utils/utils'
import { useLocation } from 'react-router-dom'
import { generateClassroomName } from 'src/utils/classroom.utils'
import mainPath from 'src/constants/path'

export default function ClassroomDetail() {
  const { profile } = useContext(AppContext)
  const { setClassroomPathList, subject } = useContext(ClassroomContext)

  const classroomId = getIdFromUrl(useLocation().pathname)

  useEffect(() => {
    setClassroomPathList([
      {
        pathName: `Lớp học`,
        url: mainPath.classroomList
      },
      {
        pathName: `${subject} - Lớp ${generateClassroomName(classroomId)}`,
        url: '',
        isNotALink: true
      }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isStudent = profile?.role == 0

  return (
    <div>
      {isStudent && <ClassroomDetailForStudent />}
      {!isStudent && <ClassroomDetailForTeacher />}
    </div>
  )
}
