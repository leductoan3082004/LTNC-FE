import { useState, createContext } from 'react'
import { PathElement } from 'src/components/PathBar/PathBar'

interface ClassroomContextInterface {
  subject: string
  setSubject: React.Dispatch<React.SetStateAction<string>>
  classroomPathList: PathElement[]
  setClassroomPathList: React.Dispatch<React.SetStateAction<PathElement[]>>
}

const initialClassroomContext: ClassroomContextInterface = {
  subject: '',
  setSubject: () => '',
  classroomPathList: [],
  setClassroomPathList: () => null
}

export const ClassroomContext = createContext<ClassroomContextInterface>(initialClassroomContext)

export const ClassrroomProvider = ({ children }: { children: React.ReactNode }) => {
  const [subject, setSubject] = useState<string>(initialClassroomContext.subject)
  const [classroomPathList, setClassroomPathList] = useState<PathElement[]>(initialClassroomContext.classroomPathList)

  return (
    <ClassroomContext.Provider
      value={{
        subject,
        setSubject,
        classroomPathList,
        setClassroomPathList
      }}
    >
      {children}
    </ClassroomContext.Provider>
  )
}
// Path: src/pages/ClassList/layouts/ClassListLayout/ClassListLayout.tsx
