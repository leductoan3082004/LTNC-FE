import React, { Fragment, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingRing from 'src/components/LoadingRing'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'
import ClassroomInCourseDetail from './components/ClassroomInCourseDetail'
import CourseDescription from './components/CourseDescription'

const loading = false

export default function CourseDetail() {
  const { academicYear, setCoursePathList } = useContext(CourseContext)

  const url = useLocation().pathname

  //! SET PATH LIST
  useEffect(() => {
    setCoursePathList([
      { pathName: 'Khóa học', url: mainPath.courseList },
      { pathName: `Năm học ${academicYear}`, url: `${mainPath.courseList}/${academicYear}` }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Fragment>
      {loading && (
        <div className='h-[50vh] w-full flex flex-col items-center justify-center'>
          <LoadingRing />
          <div className='text-xl font-medium uppercase opacity-80'>Đang lấy thông tin khóa học</div>
        </div>
      )}
      {!loading && (
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-7'>
            <CourseDescription />
          </div>
          <div className='col-span-5'>
            <div className='sticky p-4 space-y-4 border rounded-lg border-black/40 top-16 desktop:top-20'>
              <p className='w-full text-lg font-semibold text-center uppercase desktop:text-xl'>Danh sách lớp học</p>
              <div className='grid grid-cols-1 gap-4 desktop:grid-cols-2'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='col-span-1'>
                      <ClassroomInCourseDetail />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
