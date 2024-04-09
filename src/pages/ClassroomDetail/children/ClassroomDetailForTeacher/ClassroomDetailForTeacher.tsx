import { Fragment, useContext, useState } from 'react'
import { ClassroomContext } from 'src/contexts/classroom.context'
import ClassroomTeacherCreateLesson from '../../components/ClassroomTeacherCreateLesson'
import { useQuery } from '@tanstack/react-query'
import lessonApi from 'src/apis/lesson.api'
import { Lesson } from 'src/types/lesson.type'
import ClassroomLessonCard from '../../components/ClassroomLessonCard'

interface ExtendedLesson extends Lesson {
  isOpen: boolean
}

export default function ClassroomDetailForTeacher() {
  const { currentClassroom } = useContext(ClassroomContext)
  const [creatingLesson, setCreatingLesson] = useState<boolean>(false)

  //! Get lesson list
  const { data: lessonListData } = useQuery({
    queryKey: ['lesson_list'],
    queryFn: () => lessonApi.listLessons({ classroom_id: currentClassroom?.class._id as string }),
    enabled: Boolean(currentClassroom)
  })
  const lessonList = lessonListData?.data.data || []
  const extendedLessonList: ExtendedLesson[] = lessonList.map((lesson) => {
    return { ...lesson, isOpen: false }
  })

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

          {extendedLessonList.length > 0 && (
            <div className='space-y-6'>
              <p className='uppercase text-lg text-center desktop:text-xl font-medium tracking-wide'>Bài giảng</p>

              {extendedLessonList.map((lesson) => (
                <ClassroomLessonCard key={lesson._id} lesson={lesson} />
              ))}
            </div>
          )}
        </div>
      )}
    </Fragment>
  )
}
