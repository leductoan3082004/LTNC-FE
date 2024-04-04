import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { CourseListConfig } from 'src/types/course.type'

export type CourseListQueryConfig = {
  [key in keyof CourseListConfig]: string
}

export const COURSE_LIMIT = 40

export default function useCourseListQueryConfig() {
  const queryParams: CourseListQueryConfig = useQueryParams()
  const queryConfig: CourseListQueryConfig = omitBy(
    {
      query: queryParams.query,
      end_time: queryParams.end_time,
      page: queryParams.page || 1,
      limit: queryParams.limit || COURSE_LIMIT
    },
    isUndefined
  )
  return queryConfig
}
