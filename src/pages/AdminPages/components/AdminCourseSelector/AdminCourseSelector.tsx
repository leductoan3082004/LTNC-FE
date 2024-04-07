import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useMemo } from 'react'
import classroomApi from 'src/apis/classroom.api'
import courseApi from 'src/apis/course.api'
import LoadingSection from 'src/components/LoadingSection'
import { AdminContext } from 'src/contexts/admin.context'
import useCourseListQueryConfig from 'src/hooks/useCourseListQueryConfig'
import { Course } from 'src/types/course.type'
import { InfomationField } from 'src/types/utils.type'

function CourseCard({ course }: { course: Course }) {
  const { setCurrentCourse, currentCourse, setCanCreateClassroom } = useContext(AdminContext)
  const isSelected = currentCourse?._id == course._id

  //! Get classroom list in course
  const { data: classroomListData } = useQuery({
    queryKey: ['admin_classroom_list', course._id],
    queryFn: () => classroomApi.getClassroomList({ course_id: course._id as string })
  })
  const classroomList = useMemo(() => classroomListData?.data.data || [], [classroomListData])

  useEffect(() => {
    setCanCreateClassroom(classroomList.length < course.limit)
  }, [classroomList, course.limit, setCanCreateClassroom])

  const infos: InfomationField[] = [
    {
      title: 'Khóa học',
      info: course.course_name
    },
    {
      title: 'Số tín chỉ',
      info: course.credit
    },
    {
      title: 'Số lớp tối đa',
      info: course.limit
    },
    {
      title: 'Số lớp hiện tại',
      info: `${classroomList.length} / ${course.limit}`
    }
  ]

  //! Handle choose course
  const handleClickItem = () => {
    if (isSelected) return
    setCanCreateClassroom(classroomList.length < course.limit)
    setCurrentCourse(course)
  }

  return (
    <button
      onClick={handleClickItem}
      className={classNames(
        'rounded-md w-full items-center justify-center p-4 space-y-4 bg-webColor100 hover:bg-webColor300 outline',
        { 'outline-webColor400 outline-1': !isSelected, 'outline-webColor800': isSelected }
      )}
    >
      <div className='space-y-2'>
        {infos.map((info, index) => (
          <div key={index} className='grid grid-cols-3 gap-2 text-left items-center truncate'>
            <span className='col-span-1 opacity-70 text-sm'>{info.title}</span>
            <span className='col-span-2 '>{info.info}</span>
          </div>
        ))}
      </div>
    </button>
  )
}

export default function AdminCourseSelector() {
  //! Get course list
  const courseListQueryConfig = useCourseListQueryConfig()
  const { data: courseListData } = useQuery({
    queryKey: ['admin_course_list', courseListQueryConfig],
    queryFn: () => courseApi.getCourseList(courseListQueryConfig),
    staleTime: 1000 * 60 * 3
  })
  const courseList = courseListData?.data.data

  return (
    <div className='rounded-lg bg-webColor100 p-4 space-y-4'>
      <p className='w-full text-center font-semibold desktop:text-xl uppercase text-primaryText'>Chọn khóa học</p>

      {!courseListData && <LoadingSection />}

      <div className='grid grid-cols-3 gap-4 max-h-80 overflow-auto p-4 border border-white'>
        {courseList &&
          courseList.map((course) => (
            <div key={course._id} className='col-span-1'>
              <CourseCard course={course} />
            </div>
          ))}
      </div>
    </div>
  )
}
