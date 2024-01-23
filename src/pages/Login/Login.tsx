import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '~/apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/Input/Input'
import { routerMain } from '~/constants/routerMain'
import { AppContext } from '~/context/app.context'
import { ErrorResponseApi } from '~/types/utils.type'
import { Schema, schema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

type FormData = Pick<Schema, 'email' | 'password'>

export default function Login() {
  const loginSchema = schema.pick(['email', 'password'])

  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate(routerMain.HOME)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'server'
              })
            })
          }
          console.log('error: ', error)
        }
      }
    })
  })

  return (
    <div className='bg-primary'>
      <div className='container'>
        <div className='grid cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadown-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                type='email'
                register={register}
                name='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                type='password'
                register={register}
                name='password'
                className='mt-5'
                errorMessage={errors.password?.message}
                placeholder='password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  className='w-full py-3 uppercase bg-primary text-white hover:bg-primary/80'
                  type='submit'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8'>
                <div className='text-center'>
                  <span className='text-stone-300'>Bạn mới biết đến Shopee?</span>
                  <Link to={routerMain.REGISTER} className='text-primary ml-2'>
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
