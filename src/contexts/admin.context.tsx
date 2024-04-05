import { useState, createContext } from 'react'
import { Course } from 'src/types/course.type'
import { DetailedMember } from 'src/types/member.type'

interface AdminContextInterface {
  currentCourse: Course | null
  setCurrentCourse: React.Dispatch<React.SetStateAction<Course | null>>
  currentTeacherId: string | null
  setCurrentTeacherId: React.Dispatch<React.SetStateAction<string | null>>
  currentStudent: DetailedMember | null
  setCurrentStudent: React.Dispatch<React.SetStateAction<DetailedMember | null>>
  canCreateClassroom: boolean
  setCanCreateClassroom: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAdminContext: AdminContextInterface = {
  currentCourse: null,
  setCurrentCourse: () => null,
  currentTeacherId: null,
  setCurrentTeacherId: () => null,
  currentStudent: null,
  setCurrentStudent: () => null,
  canCreateClassroom: false,
  setCanCreateClassroom: () => null
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(initialAdminContext.currentCourse)
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(initialAdminContext.currentTeacherId)
  const [currentStudent, setCurrentStudent] = useState<DetailedMember | null>(initialAdminContext.currentStudent)
  const [canCreateClassroom, setCanCreateClassroom] = useState<boolean>(initialAdminContext.canCreateClassroom)

  return (
    <AdminContext.Provider
      value={{
        currentCourse,
        setCurrentCourse,
        currentTeacherId,
        setCurrentTeacherId,
        currentStudent,
        setCurrentStudent,
        canCreateClassroom,
        setCanCreateClassroom
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
