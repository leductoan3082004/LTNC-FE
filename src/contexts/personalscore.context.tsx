import { useState, createContext } from 'react'

interface PersonalscoreContextInterface {
    academicYear: string
    setAcademicYear: React.Dispatch<React.SetStateAction<string>>
}

const initialCourseContext: PersonalscoreContextInterface = {
  academicYear: '',
  setAcademicYear: () => null
}

export const PersonalscoreContext = createContext<PersonalscoreContextInterface>(initialCourseContext)

export const PersonalScoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [academicYear, setAcademicYear] = useState<string>(initialCourseContext.academicYear)

  return (
    <PersonalscoreContext.Provider
      value={{
        academicYear,
        setAcademicYear
      }}
    >
      {children}
    </PersonalscoreContext.Provider>
  )
}
