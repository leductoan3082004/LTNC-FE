import { useContext, useEffect, useState } from 'react'
import AdminCourseSelector from '../../components/AdminCourseSelector'
import { AdminContext } from 'src/contexts/admin.context'
import { AdminCreateClassroomSchema, adminCreateClassroomSchema } from 'src/rules/classroom.rule'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AdminCreateClassroomForm from '../../components/AdminCreateClassroomForm'
import AdminTeacherSelector from '../../components/AdminTeacherSelector'

type FormData = AdminCreateClassroomSchema

const currentDate = new Date()

export default function AdminCreateClassroom() {
  const { currentCourse, currentTeacherId, setCurrentTeacherId } = useContext(AdminContext)

  //! Use form
  const methods = useForm<FormData>({
    resolver: yupResolver(adminCreateClassroomSchema)
  })
  const { handleSubmit, setValue, reset } = methods

  useEffect(() => {
    setValue('teacher_id', currentTeacherId || '')
  }, [currentTeacherId, setValue])
  // useEffect(() => {
  //   setValue('lesson_end', lessonEnd)
  // }, [lessonEnd, setValue])

  return (
    <div className='space-y-8'>
      <AdminCourseSelector />

      <div className='w-full rounded-lg p-4 bg-webColor100'>
        {!currentCourse && (
          <div className='w-full text-center py-8 text-2xl tracking-wide font-semibold uppercase text-webColor800'>
            Chọn 1 khóa học
          </div>
        )}

        {currentCourse && (
          <FormProvider {...methods}>
            <form className='space-y-4'>
              <AdminCreateClassroomForm />

              <AdminTeacherSelector />
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  )
}
