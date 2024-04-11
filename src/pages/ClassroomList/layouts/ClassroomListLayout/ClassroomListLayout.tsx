import React, { useContext, useEffect } from 'react'
import PathBar from 'src/components/PathBar'
import { ClassroomContext } from 'src/contexts/classroom.context'
import ClassroomListSorting from '../../components/ClassroomListSorting'

interface Props {
  children?: React.ReactNode
}

export default function ClassroomListLayout({ children }: Props) {
  const { classroomPathList } = useContext(ClassroomContext)

  useEffect(() => {
    document.title = 'Lớp học của tôi'
  })

  return (
    <div className='py-4 bg-mainBg desktop:py-8'>
      <div className='container bg-mainBg'>
        <PathBar pathList={classroomPathList} />
        <div className='py-4 space-y-4'>
          <div className='flex justify-between'>
            <ClassroomListSorting />
          </div>
          <div className=''>{children}</div>
        </div>
      </div>
    </div>
  )
}
