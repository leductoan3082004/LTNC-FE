import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, Fragment, SetStateAction, useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LoadingRing from 'src/components/LoadingRing'
import { AdminContext } from 'src/contexts/admin.context'
import { AdminUpdateCourseSchema, adminUpdateCourseSchema } from 'src/rules/course.rule'
import { NoUndefinedField } from 'src/types/utils.type'
import AdminUpdateCourseForm from '../AdminUpdateCourseForm'

type FormData = AdminUpdateCourseSchema

interface Props {
  setEditingMode: Dispatch<SetStateAction<boolean>>
  setSuccessDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function AdminUpdateCourse({ setEditingMode, setSuccessDialogOpen }: Props) {
  const { currentCourse } = useContext(AdminContext)

  //! Handle form
  const methods = useForm<FormData>({
    // defaultValues: {
    //   course_id: currentCourse?._id,
    //   course_name: currentCourse?.course_name,
    //   description: currentCourse?.description,
    //   credit: currentCourse?.credit,
    //   limit: currentCourse?.limit,
    //   attendance_ratio: currentCourse?.attendance_ratio,
    //   lab_ratio: currentCourse?.lab_ratio,
    //   midterm_ratio: currentCourse?.midterm_ratio,
    //   final_ratio: currentCourse?.final_ratio,
    //   start_time: currentCourse?.start_time,
    //   end_time: currentCourse?.end_time
    // },
    resolver: yupResolver(adminUpdateCourseSchema)
  })
  const { handleSubmit, setValue, reset } = methods

  useEffect(() => {
    if (currentCourse) {
      setValue('course_id', currentCourse._id)
      setValue('course_name', currentCourse.course_name)
      setValue('credit', currentCourse.credit)
      setValue('limit', currentCourse.limit)
      setValue('description', currentCourse.description)
      setValue('attendance_ratio', currentCourse.attendance_ratio)
      setValue('lab_ratio', currentCourse.lab_ratio)
      setValue('midterm_ratio', currentCourse.midterm_ratio)
      setValue('final_ratio', currentCourse.final_ratio)
      setValue('start_time', new Date(currentCourse.start_time))
      setValue('end_time', new Date(currentCourse.end_time))
    }
  }, [currentCourse, setValue])

  return (
    <Fragment>
      <div className='w-full space-y-8 p-4 rounded-lg border border-black/20 bg-webColor100'>
        {!currentCourse && <LoadingRing />}
        {currentCourse && (
          <FormProvider {...methods}>
            <form className=''>
              <AdminUpdateCourseForm course={currentCourse} />

              <div className='fixed bottom-2 left-0 z-10 w-full text-darkText bg-black/60'>
                <div className='flex w-full items-center justify-between space-x-2 rounded-lg '>
                  <div className='shrink-0 rounded-lg bg-hoveringBg px-4 py-2 text-lg font-semibold'>
                    Đang chỉnh sửa
                  </div>
                  <div className=' flex w-full justify-end space-x-8 px-4'>
                    <button
                      type='button'
                      className='rounded-md bg-alertRed/80 px-4 py-1  hover:bg-alertRed'
                      onClick={() => setEditingMode(false)}
                    >
                      Hủy chỉnh sửa
                    </button>

                    <button type='submit' className='rounded-md bg-unhoverBg px-4 py-1  hover:bg-hoveringBg'>
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </Fragment>
  )
}
