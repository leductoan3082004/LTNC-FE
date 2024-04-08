import { Fragment, useContext } from 'react'
import { ClassroomContext } from 'src/contexts/classroom.context'

export default function ClassroomDetailForTeacher() {
  const { currentClassroom } = useContext(ClassroomContext)

  return (
    <Fragment>
      {!currentClassroom && (
        <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
      )}

      {currentClassroom && <div className='space-y-8'></div>}
    </Fragment>
  )
}
