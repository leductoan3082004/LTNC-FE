import { useForm } from 'react-hook-form'
import AccountInput from 'src/components/AccountInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { getAccessTokenFromLS, setProfileToLS } from 'src/utils/auth'
import axios from 'axios'
import { FULL_API_URL } from 'src/utils/http'
import { useNavigate } from 'react-router-dom'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import Button from 'src/components/Button'

type FormData = LoginSchema

export default function LoginPage() {
  //! CONTEXT
  const { setIsAuthenticated } = useContext(AppContext)

  //! HANDLE LOGIN
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        const token = getAccessTokenFromLS()
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
        axios.get(`${FULL_API_URL}auth/`, { headers }).then((response) => {
          setProfileToLS(response.data.data)
          setProfileToLS(response.data.data)
        })

        navigate(-1)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          console.log(error)
          const formError = error.response?.data
          if (formError) {
            const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError.error_key)
            if (errorRespone) {
              console.log(errorRespone.error_message)
              setError('username', {
                message: errorRespone.error_message,
                type: 'Server'
              })
              setError('password', {
                message: '',
                type: 'Server'
              })
            }
          }
        }
      }
    })
  })

  return (
    <div className='container'>
      <div className='w-full py-8 px-4 tablet:px-6 desktop:px-10'>
        <form className='md:p-10 rounded-xl bg-webColor100 p-5 shadow-lg duration-200' onSubmit={onSubmit} noValidate>
          <div className='text-center text-2xl font-semibold uppercase text-primaryText'>Đăng nhập</div>

          <AccountInput
            name='username'
            register={register}
            type='text'
            className='mt-8 autofill:text-darkText autofill:dark:text-lightText'
            errorMessage={errors.username?.message}
            labelName='Tài khoản'
            required
            autoComplete='on'
            svgData={
              <>
                <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
                <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
              </>
            }
          />

          <AccountInput
            name='password'
            register={register}
            type='password'
            className='mt-3'
            errorMessage={errors.password?.message}
            labelName='Mật khẩu'
            required
            isPasswordInput
            svgData={
              <path
                fillRule='evenodd'
                d='M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z'
                clipRule='evenodd'
              />
            }
          />

          <div className='lg:text-lg mt-2 text-base'>
            <Button
              className='lg:py-3 flex w-full items-center justify-center py-2 uppercase'
              type='submit'
              isLoading={loginAccountMutation.isPending}
              disabled={loginAccountMutation.isPending}
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
