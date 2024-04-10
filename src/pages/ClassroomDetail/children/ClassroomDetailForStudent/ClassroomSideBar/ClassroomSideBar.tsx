import React, { useContext, useRef, createRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query';
import lessonApi from 'src/apis/lesson.api';
import { ClassroomContext } from 'src/contexts/classroom.context';
import { Lesson } from 'src/types/lesson.type'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight';
import classNames from 'classnames'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

interface ExtendedLesson extends Lesson {
  isOpen: boolean
}

export default function ClassroomSideBar() {
  const { currentClassroom } = useContext(ClassroomContext);

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
  const handleSetActive = (to) => {
    console.log(to);
  };
  return (
    <div className='flex'>
      <button
        onClick={extending ? collapse : extend}
        className=' hover:text-primaryText font-semibold text-lg w-full items-center justify-between'
      >
        {' '}
        {extending && <FontAwesomeIcon icon={faChevronUp} />}
        {!extending && <FontAwesomeIcon icon={faChevronDown} />}
        Bài Học
      </button>
      <AnimateChangeInHeight>
        <div
          className={classNames('', {
            'max-h-0 overflow-hidden': !extending,
            'h-full overflow-visible py-1 space-y-4': extending
          })}
        >
          {extendedLessonList.map((lesson) => (
            <div key={lesson._id}>
              <Link
                activeClass='active'
                to='test1'
                spy={true}
                smooth={true} 
                offset={50}
                duration={500} 
                onSetActive={handleSetActive}
              >
                {lesson.name}
              </Link>
            </div>
          ))}
        </div>
      </AnimateChangeInHeight>
    </div>
  )
}
