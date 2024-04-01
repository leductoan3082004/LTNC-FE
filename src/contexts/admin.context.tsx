import { useState, createContext } from 'react'
import { Course } from 'src/types/course.type'

interface AdminContextInterface {
  currentCourse: Course | null
  setCurrentCourse: React.Dispatch<React.SetStateAction<Course | null>>
}

const initialAdminContext: AdminContextInterface = {
  currentCourse: null,
  setCurrentCourse: () => null
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(initialAdminContext.currentCourse)

  return (
    <AdminContext.Provider
      value={{
        currentCourse,
        setCurrentCourse
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
