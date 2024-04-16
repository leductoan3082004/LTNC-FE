import { useContext, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import lessonApi from 'src/apis/lesson.api'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { Lesson } from 'src/types/lesson.type'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import classNames from 'classnames'
import { Link as ScrollLink } from 'react-scroll'

interface ExtendedLesson extends Lesson {
  isOpen: boolean
}

export default function ClassroomSideBar() {
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

  const detailRef = useRef<HTMLDivElement>(null)
  const [extending, setExtending] = useState<boolean>(false)
  const extend = () => {
    setExtending(true)
  }
  const collapse = () => {
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    setExtending(false)
  }
  return (
    <div className='space-y-2 justify-between bg-slate-100 border border-black/20 rounded-lg'>
      <button
        onClick={extending ? collapse : extend}
        className='hover:text-primaryText w-full text-lg text-center items-center justify-center flex space-x-4 py-2'
      >
        <p className='text-center font-bold'>Bài học</p>
        {extending && <FontAwesomeIcon icon={faChevronUp} />}
        {!extending && <FontAwesomeIcon icon={faChevronDown} />}
      </button>
      <AnimateChangeInHeight>
        <div
          className={classNames('', {
            'max-h-0 overflow-hidden': !extending,
            'h-full overflow-visible py-1 font-medium': extending
          })}
        >
          {extendedLessonList.map((lesson) => (
            <div key={lesson._id}>
              <ScrollLink
                className='hover:bg-hoveringBg py-2 border-t px-3 border-black/40 line-clamp-3 cursor-pointer'
                activeClass='bg-hoveringBg'
                to={lesson._id}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
              >
                {lesson.name}
              </ScrollLink>
            </div>
          ))}
        </div>
      </AnimateChangeInHeight>
    </div>
  )
}
