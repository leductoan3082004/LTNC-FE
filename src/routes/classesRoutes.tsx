import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import { classPath, coursePath } from 'src/constants/path'
import { ClassesProvider } from 'src/contexts/classes.context'
import ClassesDetail from 'src/pages/ClassesDetail'
import ClassList from 'src/pages/ClassList'
import ClassListLayout from 'src/pages/ClassList/layouts/ClassListLayout'

function ClassesRoute() {
    return (
        <ClassesProvider>
        <Suspense fallback={<LoadingPage />}>
            <ClassListLayout >
                <Outlet />
            </ClassListLayout>
        </Suspense>
        </ClassesProvider>
    )
}

const ClassesRoutes = {
    path: '',
    element: <ClassesRoute />,
    children: [
        { path: '', element: <ClassList /> },
        { path: classPath.classesDetail, element: <ClassesDetail /> }
    ]
}

export default ClassesRoutes