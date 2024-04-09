import { useState, createContext } from 'react'
import { JoinedClassroom } from 'src/types/joinedClassroom.type'

interface PersonalscoreContextInterface {
  scoreAllYear: number
  setScoreAllYear: React.Dispatch<React.SetStateAction<number>>
  form: boolean
  setForm: React.Dispatch<React.SetStateAction<boolean>>
  academicYear: string
  setAcademicYear: React.Dispatch<React.SetStateAction<string>>
  joinedClassroomList: JoinedClassroom[]
  setJoinedClassroomList: React.Dispatch<React.SetStateAction<JoinedClassroom[]>>
}

const initialCourseContext: PersonalscoreContextInterface = {
  scoreAllYear: 0,
  setScoreAllYear: () => null,
  form: false,
  setForm: () => null,
  academicYear: '',
  setAcademicYear: () => null,
  joinedClassroomList: [],
  setJoinedClassroomList: () => null
}

export const PersonalscoreContext = createContext<PersonalscoreContextInterface>(initialCourseContext)

export const PersonalScoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [scoreAllYear, setScoreAllYear] = useState<number>(initialCourseContext.scoreAllYear)
  const [form, setForm] = useState<boolean>(initialCourseContext.form)
  const [academicYear, setAcademicYear] = useState<string>(initialCourseContext.academicYear)
  const [joinedClassroomList, setJoinedClassroomList] = useState<JoinedClassroom[]>(initialCourseContext.joinedClassroomList)

  return (
    <PersonalscoreContext.Provider
      value={{
        scoreAllYear,
        setScoreAllYear,
        form,
        setForm,
        academicYear,
        setAcademicYear,
        joinedClassroomList,
        setJoinedClassroomList
      }}
    >
      {children}
    </PersonalscoreContext.Provider>
  )
}
