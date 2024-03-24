import { faCheck, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Fragment, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import DialogPopup from 'src/components/DialogPopup'
import PasswordInput from 'src/components/PasswordInput'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import { ChangePasswordSchema, changePasswordSchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'

type FormData = ChangePasswordSchema

interface Props {
  setIsChangePassWord: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PersonalChangePassword({ setIsChangePassWord }: Props) {
  const [successDialog, setSuccessDialog] = useState<boolean>(false)

  const { handleLogout } = useContext(AppContext)

  //! HANDLE FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<FormData>({
    // defaultValues: {
    //   old_password: '',
    //   new_password: '',
    //   confirm_new_password: ''
    // },
    resolver: yupResolver(changePasswordSchema),
    shouldFocusError: false
  })

  //! CHANGE PASSWORD
  const changePasswordMutation = useMutation({ mutationFn: userApi.changePassword })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = omit(data, ['confirm_new_password'])
      changePasswordMutation.mutate(body)
      reset()
      setSuccessDialog(true)
    } catch (error) {
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const errorKey = formError.error_key
          if (errorKey === 'ErrOldPasswordIsInvalid') {
            setError('old_password', {
              message: 'Mật khẩu không chính xác',
              type: 'Server'
            })
            // console.log('here')
          }
          if (errorKey === 'ErrNewPasswordIsInvalid') {
            setError('confirm_new_password', {
              message: 'Mật khẩu không khớp',
              type: 'Server'
            })
          }
        }
      }
    }
  })

  const handelConfirm = () => {
    setSuccessDialog(false)
    handleLogout()
  }

  //! STYLES
  const titleClassName = 'desktop:text-base text-sm'
  const wrapperClassName =
    'flex group rounded-md items-center justify-between outline outline-1 outline-webColor600 pr-4'
  const inputClassName = 'bg-transparent outline-none py-2 px-4 w-full rounded-md text-sm desktop:text-base'

  return (
    <Fragment>
      <form className='py-4' onSubmit={onSubmit}>
        {/* {menus.map((menu, index) => (
        <div key={index} className='flex items-center py-3 text-darkText bg-webColor200'>
          <div className='w-1/4 text-right pr-4'>{menu.name}</div>
          <input className='border rounded-md border-webColor600 w-3/5 h-10 px-4 bg-webColor200 '></input>
        </div>
      ))} */}

        <div className='w-full space-y-4'>
          <div className='w-full space-y-2'>
            <p className={titleClassName}>Mật khẩu hiện tại</p>
            <PasswordInput
              className={wrapperClassName}
              inputClassName={inputClassName}
              register={register}
              name='old_password'
              errorMessage={errors.old_password?.message}
            />
          </div>

          <div className='w-full space-y-2'>
            <p className={titleClassName}>Mật khẩu mới</p>
            <PasswordInput
              className={wrapperClassName}
              inputClassName={inputClassName}
              register={register}
              name='new_password'
              errorMessage={errors.new_password?.message}
            />
          </div>

          <div className='w-full space-y-2'>
            <p className={titleClassName}>Nhập lại mật khẩu mới</p>
            <PasswordInput
              className={wrapperClassName}
              inputClassName={inputClassName}
              register={register}
              name='confirm_new_password'
              errorMessage={errors.confirm_new_password?.message}
            />
          </div>
        </div>

        <div className='w-full flex justify-center items-center space-x-8'>
          <button
            type='button'
            className='py-2 px-4 rounded-lg bg-alertRed/70 hover:bg-alertRed/90'
            onClick={() => {
              reset()
              setIsChangePassWord(false)
            }}
          >
            Hủy
          </button>

          <button className='border rounded-lg text-darkText flex px-5 py-2 border-webColor600 bg-webColor600 hover:bg-webColor500 space-x-1'>
            <FontAwesomeIcon icon={faFloppyDisk} />
            <span className=''>Lưu</span>
          </button>
        </div>
      </form>
      <DialogPopup
        classNameWrapper='relative w-96 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
        isOpen={successDialog}
        handleClose={handelConfirm}
        closeButton={false}
      >
        <div className=' text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className={'rounded-full bg-black/5 p-4 text-center text-successGreen '}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>Đổi mật khẩu thành công</p>
        <div className='mt-8 flex items-center justify-center'>
          <button
            onClick={handelConfirm}
            type='button'
            className={
              ' bg-unhoverBg hover:bg-hoveringBg justify-center rounded-md border border-transparent px-4 py-2 text-sm'
            }
          >
            Đi tới đăng nhập
          </button>
        </div>
      </DialogPopup>
    </Fragment>
  )
}
