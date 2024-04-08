import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { classroomPath } from 'src/constants/path'
import { getIdFromUrl } from 'src/utils/utils'

export default function ClassroomDetailForStudent() {
  const classroomId = getIdFromUrl(useLocation().pathname)
  return <div>
    <NavLink to={`${classroomPath.classroomList}/${classroomId}/score`}>
      Diem
    </NavLink>
  </div>
}
