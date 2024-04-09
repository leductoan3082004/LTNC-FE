import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { createRef, useRef, useState } from 'react'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { Lesson } from 'src/types/lesson.type'
import ClassroomMaterialListForLesson from '../../components/ClassroomMaterialListForLesson'
import ClassroomUploadMaterialForLesson from '../../components/ClassroomUploadMaterialForLesson'

interface Props {
  lesson: Lesson
}
export default function ClassroomLessonCard({ lesson }: Props) {
  const [uploadingMaterial, setUploadingMaterial] = useState<boolean>(false)

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
    <div className='p-4 rounded-md bg-webColor100'>
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
            {!uploadingMaterial ? (
              <button
                onClick={() => setUploadingMaterial(true)}
                className='rounded-md py-1 px-2 text-sm hover:bg-hoveringBg bg-unhoverBg'
              >
                Thêm tài liệu
              </button>
            ) : (
              <button
                onClick={() => setUploadingMaterial(false)}
                className='rounded-md py-1 px-2 text-sm hover:bg-alertRed bg-alertRed/80'
              >
                Hủy
              </button>
            )}
          </div>
          <div className='p-4 rounded-lg border border-black/20'>
            {uploadingMaterial && <ClassroomUploadMaterialForLesson lessonId={lesson._id} />}
            {!uploadingMaterial && <ClassroomMaterialListForLesson materials={lesson.materials} />}
          </div>
        </div>
      </AnimateChangeInHeight>
    </div>
  )
}
