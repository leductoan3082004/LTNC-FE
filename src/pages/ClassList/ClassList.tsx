import { useContext, useEffect } from 'react'
import mainPath from 'src/constants/path'
import { ClassesContext } from 'src/contexts/classes.context'
import PathBar from 'src/components/PathBar'


export default function ClassList() {
  const { setClassesPathList } = useContext(ClassesContext)

  //! SET PATH LIST
  useEffect(() => {
    setClassesPathList([{ pathName: 'Lớp học', url: mainPath.classList }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='py-4 bg-mainBg desktop:py-8'>
      
    </div>
  )
}
