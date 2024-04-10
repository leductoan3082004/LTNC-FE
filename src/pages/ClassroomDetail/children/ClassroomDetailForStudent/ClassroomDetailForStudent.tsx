import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import lessonApi from 'src/apis/lesson.api'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { Lesson } from 'src/types/lesson.type'
import ClassroomSideBar from './ClassroomSideBar'
import ClassroomLessonForStudent from '../../components/ClassroomLessonForStudent'

interface ExtendedLesson extends Lesson {
  isOpen: boolean
}

export default function ClassroomDetailForStudent() {
  const { currentClassroom } = useContext(ClassroomContext)

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
  extendedLessonList.sort((a, b) => {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)
    if (dateA > dateB) {
      return 1
    } else if (dateA < dateB) {
      return -1
    } else {
      return 0
    }
  })

  return (
    <div className='grid grid-cols-12 gap-2'>
      <div className='col-span-2 font-semibold justify-between bg-slate-100 border border-black/20 rounded-lg'>
        <ClassroomSideBar />
      </div>
      <div className='col-span-10'>
        {!currentClassroom && (
          <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
        )}
        <div className='space-y-4'>
          {extendedLessonList.map((lesson) => (
            <ClassroomLessonForStudent lesson={lesson} key={lesson._id} />
          ))}
        </div>
      </div>
    </div>
  )
}
