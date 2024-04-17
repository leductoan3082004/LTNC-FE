import classNames from 'classnames'
import { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { classroomPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { generateNameId } from 'src/utils/utils'

export default function ClassroomDetailHeader() {
  const { profile } = useContext(AppContext)
  const { currentClassroom } = useContext(ClassroomContext)
  const isStudent = profile?.role == 0

  const defaultStyle = 'col-span-1 py-3 flex justify-center text-lg font-medium hover:bg-webColor300'

  if (!currentClassroom) return

  const studentRoute: { name: string; path: string }[] = [
    {
      name: 'Khóa học',
      path: `${classroomPath.classroom}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}`
    },
    {
      name: 'Điểm',
      path: `${classroomPath.classroom}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}/score`
    }
  ]

  const teacherRoute: { name: string; path: string }[] = [
    {
      name: 'Thành viên',
      path: `${classroomPath.classroom}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}`
    },
    {
      name: 'Điểm',
      path: `${classroomPath.classroom}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}/members`
    },
    {
      name: 'Thống kê điểm',
      path: `${classroomPath.classroom}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}/statistic`
    }
  ]

  return (
    <Fragment>
      {isStudent && (
        <div className='w-full flex items-center justify-center'>
          <div className='grid grid-cols-2 border rounded-lg border-black/20 tablet:w-6/12 desktop:w-4/12'>
            {studentRoute.map((route, index) => (
              <NavLink
                key={index}
                end
                to={route.path}
                className={({ isActive }) =>
                  classNames(defaultStyle, 'border-r', {
                    'bg-webColor300': isActive
                  })
                }
              >
                {route.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {!isStudent && (
        <div className='w-full flex items-center justify-center'>
          <div className='grid grid-cols-3 border rounded-lg bg-webColor100 border-black/20 overflow-hidden tablet:w-8/12 desktop:w-6/12'>
            {teacherRoute.map((route, index) => (
              <NavLink
                key={index}
                end
                to={route.path}
                className={({ isActive }) =>
                  classNames(defaultStyle, 'border-r border-black/20 last:border-none', {
                    'bg-webColor300': isActive
                  })
                }
              >
                {route.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}
