import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { createRef, useRef, useState } from 'react'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { Lesson } from 'src/types/lesson.type'

interface Props {
  lesson: Lesson
}
export default function ClassroomLessonCard({ lesson }: Props) {
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

  //! Handle delete lesson

  return (
    <div className='p-4 rounded-md bg-webColor100'>
      <button
        onClick={extending ? collapse : extend}
        className='flex hover:text-primaryText text-lg w-full items-center justify-between'
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
          <div className='space-y-2'>
            <p className='text-lg desktop:text-xl font-semibold  uppercase text-center'>Tài liệu</p>
          </div>
          <div
            ref={itemDescriptionContentRef}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(lesson.content, {
                FORCE_BODY: true,
                ALLOWED_ATTR: ['style', 'classs']
              })
            }}
            className='overflow-visible'
          />
        </div>
      </AnimateChangeInHeight>
    </div>
  )
}
