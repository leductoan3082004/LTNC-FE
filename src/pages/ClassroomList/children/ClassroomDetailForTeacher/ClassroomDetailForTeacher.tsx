import React, { Fragment, useContext } from 'react'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { generateClassroomName } from 'src/utils/classroom.utils'

export default function ClassroomDetailForTeacher() {
  const { currentClassroom } = useContext(ClassroomContext)

  return (
    <Fragment>
      {!currentClassroom && (
        <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
      )}

      {currentClassroom && (
        <div>
          <p className='tracking-wider font-semibold text-lg text-center uppercase desktop:text-2xl text-webColor700'>
            {currentClassroom.course.course_name} ({generateClassroomName(currentClassroom.class._id)})
          </p>
        </div>
      )}
    </Fragment>
  )
}
