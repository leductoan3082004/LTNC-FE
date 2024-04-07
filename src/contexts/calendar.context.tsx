import React, { createContext, useState } from 'react'
import { PathElement } from 'src/components/PathBar/PathBar'

interface CalendarContextInterface {
  academicYear: string
  setAcademicYear: React.Dispatch<React.SetStateAction<string>>
  calendarPath: PathElement[]
  setCalendarPath: React.Dispatch<React.SetStateAction<PathElement[]>>
}

const initialCalendarContext: CalendarContextInterface = {
  academicYear: '',
  setAcademicYear: () => null,
  calendarPath: [],
  setCalendarPath: () => null
}

export const CalendarContext = createContext<CalendarContextInterface>(initialCalendarContext)

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [academicYear, setAcademicYear] = useState<string>(initialCalendarContext.academicYear)
  const [calendarPath, setCalendarPath] = useState<PathElement[]>(initialCalendarContext.calendarPath)
  return (
    <CalendarContext.Provider value={{ academicYear, setAcademicYear, calendarPath, setCalendarPath }}>
      {children}
    </CalendarContext.Provider>
  )
}
