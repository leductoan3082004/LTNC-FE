import classNames from 'classnames'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { AdminContext } from 'src/contexts/admin.context'
import { Course } from 'src/types/course.type'
import { DetailedMember } from 'src/types/member.type'
import { generateNameId } from 'src/utils/utils'

export default function AdminStudentCard({
  student,
  index,
  course
}: {
  student: DetailedMember
  index: number
  course: Course | null
}) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!course) {
      navigate({ pathname: adminPath.courses })
    }
  }, [course, navigate])

  let averageScore = 0
  if (course) {
    averageScore =
      (student.attendance * course.attendance_ratio +
        student.lab * course.lab_ratio +
        student.midterm * course.midterm_ratio +
        student.final * course.final_ratio) /
      1000
  }

  const weak = averageScore < 4.0
  const normal = averageScore >= 4.0 && averageScore < 6.0
  const fine = averageScore >= 6.0 && averageScore < 8.0
  const good = averageScore >= 8.0

  //! Handle click
  const { setCurrentStudent } = useContext(AdminContext)
  const handleClick = () => {
    setCurrentStudent(student)
    navigate({ pathname: `${adminPath.studentList}/${generateNameId({ name: student.name, id: student._id })}` })
  }

  return (
    <button
      onClick={handleClick}
      className='flex py-3 px-4 border-b space-x-2 border-black/20 items-center shadow-sm rounded-md bg-webColor100 hover:bg-webColor300'
    >
      <span className='opacity-60 desktop:text-lg'>{index + 1}.</span>
      <div className='flex items-center grow justify-between'>
        <span className='font-medium desktop:text-lg'>{student.name}</span>
        <div className='flex space-x-1'>
          <span className='opacity-60'>Điểm tổng kết:</span>
          <span
            className={classNames('font-medium', {
              'text-weakColor': weak,
              'text-normalColor': normal,
              'text-fineColor': fine,
              'text-goodColor': good
            })}
          >
            {averageScore}
          </span>
        </div>
      </div>
    </button>
  )
}
