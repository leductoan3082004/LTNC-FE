import { Fragment, useContext, useState } from 'react'
import LoadingRing from 'src/components/LoadingRing'

import AdminCourseInfo from '../../components/AdminCourseInfo'
import { AdminContext } from 'src/contexts/admin.context'
import LoadingSection from 'src/components/LoadingSection'
import AdminUpdateCourse from '../../components/AdminUpdateCourse'

const loading = false

export default function AdminCourseDetail() {
  //! Declare stats
  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [updateCourseSuccess, setUpdateCourseSuccess] = useState<boolean>(false)

  //! GET COURSE
  const { currentCourse } = useContext(AdminContext)

  return (
    <Fragment>
      {!currentCourse && (
        <div className='h-[50vh] w-full flex flex-col items-center justify-center'>
          <LoadingRing />
          <div className='font-medium opacity-80 uppercase text-xl'>Đang lấy thông tin khóa học</div>
        </div>
      )}
      {currentCourse && (
        <div className='w-full space-y-4'>
          {!editingMode && <AdminCourseInfo course={currentCourse} />}

          {editingMode && (
            <AdminUpdateCourse setEditingMode={setEditingMode} setSuccessDialogOpen={setUpdateCourseSuccess} />
          )}

          <div className='w-full flex justify-end'>
            {!editingMode && (
              <button
                className='rounded-md bg-unhoverBg px-6 py-2 hover:bg-hoveringBg'
                onClick={() => setEditingMode(true)}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}
