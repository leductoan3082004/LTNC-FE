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
  courseDetail: '/courses/:courseId'
} as const

export const personalPath = {
  profile: '/personal/profile',
  score: '/personal/score'
} as const

export const adminPath = {} as const
