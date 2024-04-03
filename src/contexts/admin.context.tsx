import { useState, createContext } from 'react'
import { Course } from 'src/types/course.type'

interface AdminContextInterface {
  currentCourse: Course | null
  setCurrentCourse: React.Dispatch<React.SetStateAction<Course | null>>
  currentTeacherId: string | null
  setCurrentTeacherId: React.Dispatch<React.SetStateAction<string | null>>
}

const initialAdminContext: AdminContextInterface = {
  currentCourse: null,
  setCurrentCourse: () => null,
  currentTeacherId: null,
  setCurrentTeacherId: () => null
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(initialAdminContext.currentCourse)
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(initialAdminContext.currentTeacherId)

  return (
    <AdminContext.Provider
      value={{
        currentCourse,
        setCurrentCourse,
        currentTeacherId,
        setCurrentTeacherId
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
