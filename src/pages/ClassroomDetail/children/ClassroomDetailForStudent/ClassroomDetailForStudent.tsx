import React, { useContext, useRef,createRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query';
import lessonApi from 'src/apis/lesson.api';
import { ClassroomContext } from 'src/contexts/classroom.context';
import { Lesson } from 'src/types/lesson.type'
import classNames from 'classnames'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import DOMPurify from 'dompurify'
import ClassroomSideBar from './ClassroomSideBar';
import ClassroomMaterialListForLesson from '../../components/ClassroomMaterialListForLesson'
import ClassroomUploadMaterialForLesson from '../../components/ClassroomUploadMaterialForLesson'


interface ExtendedLesson extends Lesson {
  isOpen: boolean
}


export default function ClassroomDetailForStudent() {
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

  //! Handle content
  const detailRef = useRef<HTMLDivElement>(null)
  const itemDescriptionRef = createRef<HTMLDivElement>()
  const itemDescriptionContentRef = createRef<HTMLDivElement>()

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
    <div className='flex'>
      <div className='w-1/6 hover:text-primaryText font-semibold text-lg text-center justify-between bg-slate-200'>
        <ClassroomSideBar />
      </div>
      <div className='w-5/6'>
        {!currentClassroom && (
          <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
        )}
        <div>
          {extendedLessonList.map((lesson) => (
            <div key={lesson._id} className='space-y-1   bg-webColor100 p-4 rounded-lg'>
              <button
                onClick={extending ? collapse : extend}
                className='flex hover:text-primaryText font-semibold text-lg w-full items-center justify-between'
              >
                <p className=''>{lesson.name}</p>
                {extending && <FontAwesomeIcon icon={faChevronUp} />}
                {!extending && <FontAwesomeIcon icon={faChevronDown} />}
              </button>

              <AnimateChangeInHeight>
                <div
                  ref={itemDescriptionRef}
                  className={classNames('', {
                    'max-h-0 overflow-hidden': !extending,
                    'h-full overflow-visible py-1 space-y-4': extending
                  })}
                >
                  <div
                    ref={itemDescriptionContentRef}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(lesson.content, {
                        FORCE_BODY: true,
                        ALLOWED_ATTR: ['style', 'class']
                      })
                    }}
                    className='overflow-visible'
                  />

                  <div className='flex justify-center items-center space-x-6'>
                    <p className='text-lg desktop:text-xl font-medium uppercase text-center'>Tài liệu</p>
                  </div>
                  <div className='p-4 rounded-lg border bg-white border-black/20'>
                    {<ClassroomMaterialListForLesson materials={lesson.materials} />}
                  </div>
                </div>
              </AnimateChangeInHeight>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
