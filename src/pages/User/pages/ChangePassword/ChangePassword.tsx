import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ObjectSchema } from 'yup'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { useUserUpdateProfileApi } from '~/hook/api/useAuthApi'
import { ErrorResponseApi, NoUndefineField } from '~/types/utils.type'
import { UserSchema, userSchema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

type FormData = NoUndefineField<Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>>

const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(passwordSchema as ObjectSchema<FormData>),
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    }
  })

  const updateProfileMutation = useUserUpdateProfileApi()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      if (res) {
        toast.success(res.data.message)
        reset()
      }
    } catch (error) {
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

  return (
    <div>
      <div className='rounded-sm bg-white px-2 md:px-7 py-10 md:py-20 shadow'>
        <form onSubmit={onSubmit} className=''>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-1/5 truncate sm:text-right pt-3 capitalize'>Mật khẩu cũ</div>
            <div className='sm:w-4/5 sm:pl-5'>
              <Input
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Địa chỉ'
                name='password'
                type='password'
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-1/5 truncate sm:text-right pt-3 capitalize'>Mật khẩu mới</div>
            <div className='sm:w-4/5 sm:pl-5'>
              <Input
                register={register}
                errorMessage={errors.new_password?.message}
                placeholder='Địa chỉ'
                name='new_password'
                type='password'
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-1/5 truncate sm:text-right pt-3 capitalize'>Nhập lại mật khẩu</div>
            <div className='sm:w-4/5 sm:pl-5'>
              <Input
                register={register}
                errorMessage={errors.confirm_password?.message}
                placeholder='Địa chỉ'
                name='confirm_password'
                type='password'
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
            </div>
          </div>
          <div>
            <Button
              type='submit'
              className=' text-center px-5 py-3 uppercase bg-primary text-white hover:bg-primary/80'
            >
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
