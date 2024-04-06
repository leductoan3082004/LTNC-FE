import { useForm } from 'react-hook-form'
import AccountInput from 'src/components/AccountInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, loginSchema } from 'src/rules/auth.rule'
import { useMutation } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { Link, useNavigate } from 'react-router-dom'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import Button from 'src/components/Button'
import mainPath from 'src/constants/path'
import MainFooter from 'src/components/MainFooter'
import userApi from 'src/apis/auth.api'

type FormData = LoginSchema

export default function LoginPage() {
  //! CONTEXT
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  //! LOGIN FORM
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => userApi.login(body)
  })
  const getProfileMutation = useMutation({
    mutationFn: userApi.getProfile
  })
  const navigate = useNavigate()

  //! HANDLE LOGIN
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        // const token = getAccessTokenFromLS()
        // const headers = {
        //   Authorization: `Bearer ${token}`,
        //   'Content-Type': 'application/json'
        // }
        // axios.get(`${FULL_API_URL}user/`, { headers }).then((response) => {
        //   setProfileToLS(response.data.data)
        // })
        getProfileMutation.mutateAsync().then((response) => {
          setIsAuthenticated(true)
          setProfileToLS(response.data.data)
          setProfile(response.data.data)
          navigate(-1)
        })
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          console.log(error)
          const formError = error.response?.data
          if (formError) {
            const errorMessage = HttpStatusMessage.get(formError.error_key)
            if (errorMessage) {
              setError('username', {
                message: errorMessage,
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
    <div className='flex flex-col h-full justify-between shrink-0 min-h-full' style={{ minHeight: 'inherit' }}>
      <div className=''>
        <div className='w-full bg-webColor700'>
          <div className='container'>
            <div className='w-full flex justify-start'>
              <Link to={mainPath.home} className='text-lightText flex space-x-2 py-4 px-6 hover:bg-hoveringBg shrink'>
                <FontAwesomeIcon icon={faCaretLeft} />
                <p className='uppercase font-semibold'>Trang chủ</p>
              </Link>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='flex items-start justify-center py-10'>
            <div className='w-10/12 tablet:w-8/12 desktop:w-6/12'>
              <form
                className='md:p-10 rounded-xl bg-webColor100 p-5 shadow-lg duration-200'
                onSubmit={onSubmit}
                noValidate
              >
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
                    isLoading={loginMutation.isPending}
                    disabled={loginMutation.isPending}
                  >
                    Đăng nhập
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  )
}
