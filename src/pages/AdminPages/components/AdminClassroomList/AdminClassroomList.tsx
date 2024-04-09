import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classroomApi from 'src/apis/classroom.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingSection from 'src/components/LoadingSection'
import { adminPath } from 'src/constants/path'
import { AdminContext } from 'src/contexts/admin.context'
import { Course } from 'src/types/course.type'
import AdminClassroomCard from '../AdminClassroomCard'

interface Props {
  course: Course
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
          classroomList.map((classroom) => (
            <div key={classroom._id} className='col-span-1'>
              <AdminClassroomCard classroom={classroom} />
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
