import { useContext } from 'react'
import { CourseContext } from 'src/contexts/course.context'
import DOMPurify from 'dompurify'

interface Props {
  description: string
}

export default function CourseDescription({ description }: Props) {
  const { academicYear } = useContext(CourseContext)

  return (
    <div className='space-y-8 h-[2000px]'>
      <p className='font-bold uppercase text-xl desktop:text-3xl text-primaryText w-full text-center tracking-widest'>
        Lập trình nâng cao
      </p>
      <div className='space-y-4 text-lg'>
        <div className='flex space-x-2'>
          <span className='opacity-60'>Năm học:</span>
          <span className='text-primaryText'>{academicYear}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description)
          }}
          className='overflow-visible'
        />
      </div>
    </div>
  )
}
