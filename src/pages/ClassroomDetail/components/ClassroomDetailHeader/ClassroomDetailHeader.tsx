import classNames from 'classnames'
import { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { generateNameId } from 'src/utils/utils'

export default function ClassroomDetailHeader() {
  const { profile } = useContext(AppContext)
  const { currentClassroom } = useContext(ClassroomContext)
  const isStudent = profile?.role == 0

  const defaultStyle =
    'col-span-1 border-black/20 py-3 flex justify-center text-lg font-medium bg-webColor100 hover:bg-webColor200 '

  if (!currentClassroom) return
  return (
    <Fragment>
      {isStudent && (
        <div className='w-full flex items-center justify-center'>
          <div className='grid grid-cols-2 border rounded-lg border-black/20 tablet:w-6/12 desktop:w-4/12'>
            <NavLink
              end
              to={`${mainPath.classroomList}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}`}
              className={({ isActive }) =>
                classNames(defaultStyle, 'border-r', {
                  'bg-webColor300': isActive
                })
              }
            >
              Khóa học
            </NavLink>
            <NavLink
              to={`${mainPath.classroomList}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}/score`}
              className={({ isActive }) =>
                classNames(defaultStyle, 'border-l', {
                  'bg-webColor300': isActive
                })
              }
            >
              Điểm
            </NavLink>
          </div>
        </div>
      )}
      {!isStudent && (
        <div className='w-full flex items-center justify-center'>
          <div className='grid grid-cols-2 border rounded-lg border-black/20 tablet:w-6/12 desktop:w-4/12'>
            <NavLink
              end
              to={`${mainPath.classroomList}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}`}
              className={({ isActive }) =>
                classNames(defaultStyle, 'border-r', {
                  'bg-webColor300': isActive
                })
              }
            >
              Khóa học
            </NavLink>
            <NavLink
              to={`${mainPath.classroomList}/${generateNameId({ name: currentClassroom.course.course_name, id: currentClassroom.class._id })}/members`}
              className={({ isActive }) =>
                classNames(defaultStyle, 'border-l', {
                  'bg-webColor300': isActive
                })
              }
            >
              Thành viên
            </NavLink>
          </div>
        </div>
      )}
    </Fragment>
  )
}
