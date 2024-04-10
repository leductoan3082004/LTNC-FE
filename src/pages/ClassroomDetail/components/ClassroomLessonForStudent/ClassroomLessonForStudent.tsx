import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { createRef, useRef, useState } from 'react'
import { Element } from 'react-scroll'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { Lesson } from 'src/types/lesson.type'
import ClassroomMaterialListForLesson from '../ClassroomMaterialListForLesson'

interface Props {
  lesson: Lesson
}

export default function ClassroomLessonForStudent({ lesson }: Props) {
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
    <Element name={lesson._id} className='space-y-1   bg-webColor100 p-4 rounded-lg'>
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
    </Element>
  )
}
