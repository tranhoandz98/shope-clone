import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '~/components/Button'
import DateSelect from '~/components/DateSelect/DateSelect'
import Input from '~/components/Input'
import InputFile from '~/components/InputFile'
import InputNumber from '~/components/InputNumber'
import { AppContext } from '~/context/app.context'
import { useUserGetMeApi, useUserUpdateAvatarApi, useUserUpdateProfileApi } from '~/hook/api/useAuthApi'
import { ErrorResponseApi } from '~/types/utils.type'
import { setProfileToLS } from '~/utils/auth'
import { UserSchema, userSchema } from '~/utils/rules'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from '~/utils/utils'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>
type FormDataError = Pick<FormData, 'date_of_birth'> & {
  date_of_birth: string
}

const profileSchema = userSchema.pick(['address', 'name', 'phone', 'avatar', 'date_of_birth'])

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='name'
            placeholder='Tên'
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </>
  )
}

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const { data: profileData } = useUserGetMeApi()
  const [file, setFile] = useState<File>()

  const previewFile = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const profile = profileData?.data.data
  const methods = useForm<FormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    }
  })
  const {
    register,
    control,
    setValue,
    watch,
    setError,
    handleSubmit,
    formState: { errors }
  } = methods

  useEffect(() => {
    if (profile) {
      setValue('address', profile.address)
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const updateProfileMutation = useUserUpdateProfileApi()
  const updateAvatarMutation = useUserUpdateAvatarApi()

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = updateAvatarMutation.mutateAsync(form)
        avatarName = (await uploadRes).data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })

      if (res) {
        toast.success(res.data.message)
        setProfile(res.data.data)
        setProfileToLS(res.data.data)
        // refetch()
      }
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'server'
            })
          })
        }
        console.log('error: ', error)
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const avatar = watch('avatar')
  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b py-5'>
        <div className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</div>
        <div className='mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
          <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
            <div className='flex flex-wrap items-center flex-col sm:flex-row'>
              <div className='sm:w-1/5 truncate sm:text-right capitalize'>Email</div>
              <div className='sm:w-4/5 sm:pl-5'>{profile?.email}</div>
            </div>
            <Info />
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-1/5 truncate sm:text-right pt-3 capitalize'>Địa chỉ</div>
              <div className='sm:w-4/5 sm:pl-5'>
                <Input
                  register={register}
                  errorMessage={errors.address?.message}
                  placeholder='Địa chỉ'
                  name='address'
                  classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
              </div>
            </div>

            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-1/5 truncate sm:text-right pt-3 capitalize'>Ngày sinh</div>
              <div className='sm:w-4/5 sm:pl-5'>
                <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field }) => (
                    <DateSelect
                      errorMessage={errors.date_of_birth?.message}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className='mt-8 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-1/5 truncate sm:text-right pt-3 capitalize'></div>
              <div className='sm:w-4/5 sm:pl-5'>
                <Button
                  type='submit'
                  className=' text-center px-5 py-3 uppercase bg-primary text-white hover:bg-primary/80'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:w-72 md:border-l md:border-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={previewFile || getAvatarUrl(avatar)}
                  // 'https://down-vn.img.susercontent.com/file/81f64d2cb69ed27a4d95f0df5a819610'
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <InputFile onChange={handleChangeFile} />
              <div className='text-gray-400 mt-4'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
