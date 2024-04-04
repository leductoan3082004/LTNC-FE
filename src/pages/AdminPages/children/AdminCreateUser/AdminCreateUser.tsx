import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AdminCreateUserSchema, adminCreateUserSchema } from 'src/rules/user.rule'
import AdminCreateUserForm from '../../components/AdminCreateUserForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import { reject } from 'lodash'

type FormData = AdminCreateUserSchema

export default function AdminCreateUser() {
  const [role, setRole] = useState<number>(0)
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  //! USE FORM
  const methods = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
      name: '',
      phone: '',
      address: ''
    },
    resolver: yupResolver(adminCreateUserSchema)
  })
  const { handleSubmit, setValue, reset } = methods

  useEffect(() => {
    setValue('role', role)
  }, [role, setValue])

  //! Create user
  const queryClient = useQueryClient()
  const createUserMutation = useMutation({
    mutationFn: userApi.createUser
  })

  //! FOR CREATING USER ONLY
  // const [count, setCount] = useState<number>(201)

  // useEffect(() => {
  //   setValue('username', 'student' + count.toString())
  // }, [count, setValue])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => {
    console.log(errors)
    reject(errors)
  }
  const onSubmit = async (data: FormData) => {
    setExcutingDialog(true)
    setExcuting(true)

    try {
      createUserMutation.mutate(data, {
        onSuccess: () => {
          setError(false)
          reset()
          setRole(0)
          queryClient.invalidateQueries({ queryKey: ['user_list'] })
          queryClient.invalidateQueries({ queryKey: ['admin_user_list'] })
        },
        onError: () => {
          setError(true)
        },
        onSettled: () => {
          setExcuting(false)
          window.scrollTo({ top: 0, left: 0 })
        }
      })
    } catch (error) {
      setExcuting(false)
      setError(true)
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const responeLog = formError?.log as string
          console.log(responeLog)
        }
      }
    }
  }

  return (
    <div>
      <p className='text-xl uppercase font-bold text-primaryText w-full text-center'>TẠO TÀI KHOẢN MỚI</p>
      <div className='py-4 px-20 w-full'>
        <div className='border-t border-white'></div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className='space-y-4 mt-4'>
          <AdminCreateUserForm setRole={setRole} />
          <div className='w-full flex justify-end'>
            <button
              className='rounded-lg bg-unhoverBg px-4 py-1 text-base hover:bg-hoveringBg lg:text-lg'
              type='submit'
            >
              Tạo tài khoản
            </button>
          </div>
        </form>
      </FormProvider>

      {/*//! EXCUTING FIELD */}
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        <div className='w-full flex items-center justify-center'>
          {excuting && <LoadingRing />}
          {!excuting && (
            <Fragment>
              {!error && (
                <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>
                  Tạo tài khoản thành công
                </p>
              )}
              {error && (
                <Fragment>
                  <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>
                    Đã có lỗi xảy ra, vui lòng thử lại sau
                  </p>
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </DialogPopup>
    </div>
  )
}
