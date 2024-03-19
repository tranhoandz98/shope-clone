import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc')
    .min(5, 'độ dài từ 5-160')
    .max(160, 'độ dài 5-160')
    .oneOf([yup.ref(refString)], 'Nhập lại mật khẩu không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email là email')
    .min(5, 'độ dài từ 5-160')
    .max(160, 'độ dài 5-160'),
  password: yup.string().required('Password là bắt buộc').min(5, 'độ dài từ 5-160').max(160, 'độ dài 5-160'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa 160 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
