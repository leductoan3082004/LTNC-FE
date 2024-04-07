import React, { useContext } from 'react'
import PathBar from 'src/components/PathBar'
import { ClassroomContext } from 'src/contexts/classroom.context'

interface Props {
  children?: React.ReactNode
}

export default function ClassroomLayout({ children }: Props) {
  const { classroomPathList } = useContext(ClassroomContext)

  return (
    <div className='py-4 bg-mainBg desktop:py-8'>
      <div className='container bg-mainBg'>
        <PathBar pathList={classroomPathList} />
        <div className='py-8'>{children}</div>
      </div>
    </div>
  )
}
