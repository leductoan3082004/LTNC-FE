import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import lessonApi from 'src/apis/lesson.api'
import { ClassroomContext } from 'src/contexts/classroom.context'

export default function ClassroomDetailForStudent() {
  const {currentClassroom} = useContext(ClassroomContext)

  //! Get lesson list
const {}= useQuery({queryKey : ['lesson_list', currentClassroom?.class._id],
  queryFn: () => lessonApi.listLessons
} )

  return <div>ClassroomDetailForStudent</div>
}
