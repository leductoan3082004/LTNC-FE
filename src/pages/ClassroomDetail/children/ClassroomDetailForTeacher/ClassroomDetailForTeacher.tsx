import { Fragment, useContext, useState } from 'react'
import { ClassroomContext } from 'src/contexts/classroom.context'
import ClassroomTeacherCreateLesson from '../../components/ClassroomTeacherCreateLesson'
import { useQuery } from '@tanstack/react-query'

export default function ClassroomDetailForTeacher() {
  const { currentClassroom } = useContext(ClassroomContext)
  const [creatingLesson, setCreatingLesson] = useState<boolean>(false)

  //! Get lesson list
  const {} = useQuery()

  return (
    <Fragment>
      {!currentClassroom && (
        <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
      )}

      {currentClassroom && (
        <div className='space-y-8'>
          {!creatingLesson && (
            <div className='w-full justify-center py-4 flex'>
              <button
                onClick={() => setCreatingLesson(true)}
                className='py-2 px-4 bg-unhoverBg hover:bg-hoveringBg rounded-md'
              >
                Thêm bài giảng
              </button>
            </div>
          )}

          {creatingLesson && <ClassroomTeacherCreateLesson setCreatingLesson={setCreatingLesson} />}
        </div>
      )}
    </Fragment>
  )
}
