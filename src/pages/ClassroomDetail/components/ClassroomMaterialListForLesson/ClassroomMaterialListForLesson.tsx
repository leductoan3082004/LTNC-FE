import React from 'react'
import { LessonMaterial } from 'src/types/lesson.type'

interface Props {
  materials: LessonMaterial[]
}

export default function ClassroomMaterialListForLesson({ materials }: Props) {
  return <div className='space-y-2'></div>
}
