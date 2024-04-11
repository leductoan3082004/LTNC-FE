import { useContext, useEffect } from 'react'
import mainPath from 'src/constants/path'
import { ClassroomContext } from 'src/contexts/classroom.context'

import { useLocation } from 'react-router-dom'
import { reversedAcademicYears } from 'src/constants/academicYears'
import ClassroomSortingByYear from './children/ClassroomSortingByYear'

export default function ClassroomList() {
  const { setClassroomPathList, setAcademicYear } = useContext(ClassroomContext)

  const arr = useLocation().pathname.split('/')
  const year = arr[arr.length - 1]

  useEffect(() => {
    setAcademicYear('all')
    setClassroomPathList([{ pathName: 'lớp học', url: mainPath.classroomList }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])

  return (
    <div className='container flex flex-col py-6 min-h-[50vh]'>
      <div className='flex flex-col gap-2 pb-3 border-b title'>
        <h1 className='text-2xl uppercase font-semibold text-center tracking-wide'>Lớp học của tôi</h1>
      </div>

      <div className='space-y-8'>
        {reversedAcademicYears.map((year, index) => (
          <ClassroomSortingByYear key={index} year={year} />
        ))}
      </div>
    </div>
  )
}
