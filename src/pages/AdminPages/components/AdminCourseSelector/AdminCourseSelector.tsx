import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext } from 'react'
import courseApi from 'src/apis/course.api'
import LoadingSection from 'src/components/LoadingSection'
import { AdminContext } from 'src/contexts/admin.context'
import useCourseListQueryConfig from 'src/hooks/useCourseListQueryConfig'
import { Course } from 'src/types/course.type'

function CourseCard({ course }: { course: Course }) {
  const { setCurrentCourse, currentCourse } = useContext(AdminContext)
  const isSelected = currentCourse?._id == course._id

  const infos = [
    {
      title: 'Khóa học',
      content: course.course_name
    },
    {
      title: 'Số tín chỉ',
      content: course.credit
    },
    {
      title: 'Số lớp',
      content: course.limit
    }
  ]

  //! HANDLE ENTER ITEM
  const handleClickItem = () => {
    if (isSelected) return
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
          <div key={index} className='grid grid-cols-4 gap-2 text-left items-center'>
            <span className='col-span-1 opacity-70 text-sm'>{info.title}</span>
            <span className='col-span-3 '>{info.content}</span>
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
    <div>
      <p className='w-full text-center font-semibold desktop:text-xl uppercase text-primaryText'>Chọn khóa học</p>

      <div className='py-4 px-20 w-full'>
        <div className='border-t border-white'></div>
      </div>

      {!courseListData && <LoadingSection />}

      <div className='grid grid-cols-3 gap-4'>
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