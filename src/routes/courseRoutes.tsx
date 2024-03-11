import { coursePath } from 'src/constants/path'
import CourseList from 'src/pages/CourseList'
import CourseListByYear from 'src/pages/CourseList/children/CourseListByYear'

const CourseRoutes = {
  path: '',
  children: [
    { path: '', element: <CourseList /> },
    { path: coursePath.courseListByYear, element: <CourseListByYear /> }
  ]
}

export default CourseRoutes
