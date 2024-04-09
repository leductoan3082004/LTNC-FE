import { Fragment, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ClassroomDetailForStudent from './children/ClassroomDetailForStudent'
import ClassroomDetailForTeacher from './children/ClassroomDetailForTeacher'
import { ClassroomContext } from 'src/contexts/classroom.context'

export default function ClassroomDetail() {
  const { profile } = useContext(AppContext)
  const { currentClassroom } = useContext(ClassroomContext)

  const isStudent = profile?.role == 0

  return (
    <div className=''>
      {!currentClassroom && (
        <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
      )}
      {currentClassroom && (
        <Fragment>
          {isStudent && <ClassroomDetailForStudent />}
          {!isStudent && <ClassroomDetailForTeacher />}
        </Fragment>
      )}
    </div>
  )
}
