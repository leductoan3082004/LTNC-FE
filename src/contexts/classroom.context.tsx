import { useState, createContext } from 'react'
import { PathElement } from 'src/components/PathBar/PathBar'
import { JoinedClassroom } from 'src/types/joinedClassroom.type'

interface ClassroomContextInterface {
  subject: string
  setSubject: React.Dispatch<React.SetStateAction<string>>
  classroomPathList: PathElement[]
  setClassroomPathList: React.Dispatch<React.SetStateAction<PathElement[]>>
  currentClassroom: JoinedClassroom | null
  setCurrentClassroom: React.Dispatch<React.SetStateAction<JoinedClassroom | null>>
}

const initialClassroomContext: ClassroomContextInterface = {
  subject: '',
  setSubject: () => '',
  classroomPathList: [],
  setClassroomPathList: () => null,
  currentClassroom: null,
  setCurrentClassroom: () => null
}

export const ClassroomContext = createContext<ClassroomContextInterface>(initialClassroomContext)

export const ClassrroomProvider = ({ children }: { children: React.ReactNode }) => {
  const [subject, setSubject] = useState<string>(initialClassroomContext.subject)
  const [classroomPathList, setClassroomPathList] = useState<PathElement[]>(initialClassroomContext.classroomPathList)
  const [currentClassroom, setCurrentClassroom] = useState<JoinedClassroom | null>(
    initialClassroomContext.currentClassroom
  )

  return (
    <ClassroomContext.Provider
      value={{
        subject,
        setSubject,
        classroomPathList,
        setClassroomPathList,
        currentClassroom,
        setCurrentClassroom
      }}
    >
      {children}
    </ClassroomContext.Provider>
  )
}
// Path: src/pages/ClassList/layouts/ClassListLayout/ClassListLayout.tsx
