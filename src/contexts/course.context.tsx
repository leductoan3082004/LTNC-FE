import { useState, createContext } from 'react'

interface CourseContextInterface {
  academicYear: string
  setAcademicYear: React.Dispatch<React.SetStateAction<string>>
}

const initialCourseContext: CourseContextInterface = {
  academicYear: '',
  setAcademicYear: () => null
}

export const CourseContext = createContext<CourseContextInterface>(initialCourseContext)

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [academicYear, setAcademicYear] = useState<string>(initialCourseContext.academicYear)

  return (
    <CourseContext.Provider
      value={{
        academicYear,
        setAcademicYear
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
