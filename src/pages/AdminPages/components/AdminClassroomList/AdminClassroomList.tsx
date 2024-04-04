import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classroomApi from 'src/apis/classroom.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingSection from 'src/components/LoadingSection'
import DaysInWeekEnum from 'src/constants/daysInWeek'
import { adminPath } from 'src/constants/path'
import { AdminContext } from 'src/contexts/admin.context'
import { Classroom } from 'src/types/classroom.type'
import { Course } from 'src/types/course.type'
import { generateClassroomId } from 'src/utils/classroom.utils'

interface Props {
  course: Course
}

function ClassroomCard({ classroom, index }: { classroom: Classroom; index: number }) {
  //! Get timetable
  const startTimestamp = new Date(classroom.time_table[0].lesson_start)
  const endTimestamp = new Date(classroom.time_table[0].lesson_end)

  const startTime = startTimestamp.getHours().toString() + ':' + startTimestamp.getMinutes().toString()
  const endTime = endTimestamp.getHours().toString() + ':' + endTimestamp.getMinutes().toString()
  const day = startTimestamp.getDay()

  //! Handle enter classroom
  const navigate = useNavigate()
  const handleClick = () => {
    navigate({ pathname: `${adminPath.classrooms}/${generateClassroomId({ id: classroom._id })}` })
  }

  return (
    <div className='bg-webColor100 rounded-md border border-black/20 py-2 px-3 space-y-3'>
      <p className='uppercase font-medium text-lg text-center desktop:text-xl space-x-1.5'>
        <span className=''>Lớp</span>
        <span className=''>
          <span className=''>L</span>
          <span className=''>{index}</span>
        </span>
      </p>
      <div className='flex space-x-1'>
        <span className='text-primaryText font-medium'>{startTime}</span>
        <span className=''>đến</span>
        <span className='text-primaryText font-medium'>{endTime}</span>
      </div>
      <div className='flex space-x-1'>
        <span className='text-primaryText font-medium'>{DaysInWeekEnum[day]}</span>
        <span className=''>các tuần</span>
      </div>

      <div className='flex space-x-2 items-center'>
        <span className='opacity-60'>Thành viên: </span>
        <span className='text-primaryText font-medium flex space-x-0.5 items-center'>
          <span>{classroom.members ? classroom.members.length : 0}</span>
          <span className='text-xl'>/</span>
          <span>{classroom.limit}</span>
        </span>
      </div>

      <div className='w-full flex justify-center'>
        <button onClick={handleClick} className='bg-unhoverBg hover:bg-hoveringBg rounded-md py-1.5 px-3'>
          Đi tới lớp học
        </button>
      </div>
    </div>
  )
}

export default function AdminClassroomList({ course }: Props) {
  const { setCurrentCourse } = useContext(AdminContext)

  //! Get class list in a course
  const courseId = course._id
  const { data: classroomListData } = useQuery({
    queryKey: ['admin_classroom_list', courseId],
    queryFn: () => classroomApi.getClassroomList({ course_id: courseId })
  })
  const classroomList = classroomListData?.data.data

  //! Handle add classroom
  const [cannotAddError, setCannotAddError] = useState<boolean>(false)
  const navigate = useNavigate()

  const addClassroom = () => {
    if (classroomList?.length == course.limit) {
      setCannotAddError(true)
      return
    }
    setCurrentCourse(course)
    navigate(adminPath.createClassroom)
  }

  return (
    <div className='p-4 rounded-lg border space-y-4 border-black/20 bg-webColor100'>
      <p className='uppercase text-primaryText font-bold text-xl desktop:tetx-3xl text-center'>
        Danh sách lớp học hiện tại
      </p>

      {!classroomList && <LoadingSection />}

      <div className='grid grid-cols-3 gap-4'>
        {classroomList &&
          classroomList.map((classroom, index) => (
            <div key={classroom._id} className='col-span-1'>
              <ClassroomCard classroom={classroom} index={index} />
            </div>
          ))}

        <div className='col-span-1'>
          <button
            onClick={addClassroom}
            className='bg-webColor100 w-full hover:bg-webColor200 rounded-md border border-black/20 py-2 px-3 space-y-4 min-h-40 '
          >
            <FontAwesomeIcon icon={faCirclePlus} className='text-4xl' />
            <p className='text-xl uppercase font-medium'>Thêm lớp học</p>
          </button>
        </div>
      </div>

      <DialogPopup handleClose={() => setCannotAddError(false)} isOpen={cannotAddError}>
        <div className='w-60 h-40 flex items-center justify-center'>
          <p className='text-alertRed uppercase font-medium text-2xl'>Vượt quá số lượng lớp học cho phép</p>
        </div>
      </DialogPopup>
    </div>
  )
}
