import PathBar from 'src/components/PathBar'
import { useContext } from 'react'
import { ClassesContext } from 'src/contexts/classes.context'
import { Link } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}
export default function ClassListLayout({ children }: Props) {
  const { classesPathList } = useContext(ClassesContext)

  return (
    <div className='py-4 bg-mainBg desktop:py-8'>
      <div className='container bg-mainBg'>
        <PathBar pathList={classesPathList} />
        <div className='py-8'>{children}</div>
      </div>
    </div>
  )
}
