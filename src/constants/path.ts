const mainPath = {
  home: '/',
  login: '/login',
  calendar: '/calendar',
  courseList: '/courses',
  classList: '/classes',
  personal: '/personal',

} as const
export default mainPath

export const coursePath = {
  courseListByYear: '/courses/:year',
  courseDetail: '/courses/:year/:courseId'
} as const

export const classPath = {
  classList: '/classes',
  classesDetail: '/classes/class1'
} as const

export const personalPath = {
  profile: '/personal/profile',
  account: '/personal/account',
  score: '/personal/score'
} as const

export const ScorePath = {
  ScoreByYear: '/score/:year'
} as const

//! ADMIN PATH
export const adminPath = {
  mainPage: '/admin',
  users: '/admin/users',
  studentList: '/admin/users/students',
  studentDetail: '/admin/users/students/:studentId',
  teacherList: '/admin/users/teachers',
  createUser: '/admin/users/create',

  // Courses
  courses: '/admin/courses',
  courseDetail: '/admin/courses/:courseId',
  createCourse: '/admin/courses/create',

  // Classes
  classrooms: '/admin/classrooms',
  classroomDetail: '/admin/classrooms/:classroomId',
  createClassroom: '/admin/classrooms/create'
} as const
