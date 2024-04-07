import { useState, createContext } from 'react'
import { PathElement } from 'src/components/PathBar/PathBar'

interface ClassesContextInterface {
  subject: string
  setSubject: React.Dispatch<React.SetStateAction<string>>
  classesPathList: PathElement[]
  setClassesPathList: React.Dispatch<React.SetStateAction<PathElement[]>>
}

const initialClassesContext: ClassesContextInterface = {
  subject: '',
  setSubject: () => '',
  classesPathList: [],
  setClassesPathList: () => null
}

export const ClassesContext = createContext<ClassesContextInterface>(initialClassesContext)

export const ClassesProvider = ({ children }: { children: React.ReactNode }) => {
  const [subject, setSubject] = useState<string>(initialClassesContext.subject)
  const [classesPathList, setClassesPathList] = useState<PathElement[]>(initialClassesContext.classesPathList)

  return (
    <ClassesContext.Provider
      value={{
        subject,
        setSubject,
        classesPathList,
        setClassesPathList
      }}
    >
      {children}
    </ClassesContext.Provider>
  )
}
// Path: src/pages/ClassList/layouts/ClassListLayout/ClassListLayout.tsx
