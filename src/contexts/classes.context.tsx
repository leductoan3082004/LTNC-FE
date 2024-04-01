import { useState, createContext } from 'react'
import { PathElement } from 'src/components/PathBar/PathBar'

interface ClassesContextInterface {
  classesPathList: PathElement[]
  setClassesPathList: React.Dispatch<React.SetStateAction<PathElement[]>>
}

const initialClassesContext: ClassesContextInterface = {
  classesPathList: [],
  setClassesPathList: () => null
}

export const ClassesContext = createContext<ClassesContextInterface>(initialClassesContext)

export const ClassesProvider = ({ children }: { children: React.ReactNode }) => {
    const [classesPathList, setClassesPathList] = useState<PathElement[]>(initialClassesContext.classesPathList)
    
    return (
        <ClassesContext.Provider
        value={{
            classesPathList,
            setClassesPathList
        }}
        >
        {children}
        </ClassesContext.Provider>
    )
}
// Path: src/pages/ClassList/layouts/ClassListLayout/ClassListLayout.tsx

