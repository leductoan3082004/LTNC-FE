import { Fragment, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import courseApi from 'src/apis/course.api'
import { getIdFromUrl } from 'src/utils/utils'
import LoadingRing from 'src/components/LoadingRing'
import AdminCourseInfo from '../../components/AdminCourseInfo'
import AdminUpdateCourse from '../../components/AdminUpdateCourse'
import AdminClassroomList from '../../components/AdminClassroomList'

export default function AdminCourseDetail() {
  //! Declare stats
  const [editingMode, setEditingMode] = useState<boolean>(false)

  //! Get course detail
  const pathname = useLocation().pathname
  const courseId = getIdFromUrl(pathname)
  const { data: courseData } = useQuery({
    queryKey: ['admin_course_detail', courseId],
    queryFn: () => courseApi.getCourseById(courseId)
  })
  const course = courseData?.data.data

  return (
    <Fragment>
      {!course && (
        <div className='h-[50vh] w-full flex flex-col items-center justify-center'>
          <LoadingRing />
          <div className='font-medium opacity-80 uppercase text-xl'>Đang lấy thông tin khóa học</div>
        </div>
      )}
      {course && (
        <div className='w-full space-y-4'>
          {!editingMode && <AdminCourseInfo course={course} />}

          {editingMode && <AdminUpdateCourse currentCourse={course} setEditingMode={setEditingMode} />}

          <div className='w-full flex justify-end'>
            {!editingMode && (
              <button
                className='rounded-md bg-unhoverBg px-6 py-2 hover:bg-hoveringBg'
                onClick={() => setEditingMode(true)}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
          <div className='py-4'>
            <AdminClassroomList course={course} />
          </div>
        </div>
      )}
    </Fragment>
  )
}
