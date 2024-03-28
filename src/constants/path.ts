const mainPath = {
  home: '/',
  login: '/login',
  calendar: '/calendar',
  courseList: '/courses',
  classList: '/classes',
  personal: '/personal'
} as const
export default mainPath

export const coursePath = {
  courseListByYear: '/courses/:year',
  courseDetail: '/courses/:year/:courseId'
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
  courses: '/admin/courses',
  classes: '/admin/classes'
} as const
