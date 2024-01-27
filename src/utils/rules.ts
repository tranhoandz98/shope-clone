import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email là email')
    .min(5, 'độ dài từ 5-160')
    .max(160, 'độ dài 5-160'),
  password: yup.string().required('Password là bắt buộc').min(5, 'độ dài từ 5-160').max(160, 'độ dài 5-160'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(5, 'độ dài từ 5-160')
    .max(160, 'độ dài 5-160')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
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

export type Schema = yup.InferType<typeof schema>
