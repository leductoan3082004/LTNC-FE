import { useState, createContext } from 'react'
import { PathElement } from 'src/components/PathBar/PathBar'

interface CourseContextInterface {
  academicYear: string
  setAcademicYear: React.Dispatch<React.SetStateAction<string>>
  coursePathList: PathElement[]
  setCoursePathList: React.Dispatch<React.SetStateAction<PathElement[]>>
}

const initialCourseContext: CourseContextInterface = {
  academicYear: '',
  setAcademicYear: () => null,
  coursePathList: [],
  setCoursePathList: () => null
}

export const CourseContext = createContext<CourseContextInterface>(initialCourseContext)

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [academicYear, setAcademicYear] = useState<string>(initialCourseContext.academicYear)
  const [coursePathList, setCoursePathList] = useState<PathElement[]>(initialCourseContext.coursePathList)

  return (
    <CourseContext.Provider
      value={{
        academicYear,
        setAcademicYear,
        coursePathList,
        setCoursePathList
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
