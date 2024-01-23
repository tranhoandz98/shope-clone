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

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.register(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate(routerMain.HOME)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
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
            <form className='p-10 rounded bg-white shadown-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
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
              <Input
                type='password'
                register={register}
                name='confirm_password'
                className='mt-5'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  className='w-full text-center py-3 uppercase bg-primary text-white hover:bg-primary/80'
                  type='submit'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8'>
                <div className='text-center'>
                  <span className='text-stone-300'>Bạn đã có tài khoản?</span>
                  <Link to={routerMain.LOGIN} className='text-primary ml-2'>
                    Đăng nhập
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
