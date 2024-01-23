import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { Controller, useForm } from 'react-hook-form'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import InputNumber from '~/components/InputNumber'
import ChivonIcon from '~/components/SvgIcon/ChivonIcon'
import FilterIcon from '~/components/SvgIcon/FilterIcon'
import ListIcon from '~/components/SvgIcon/ListIcon'
import { routerMain } from '~/constants/routerMain'
import { QueryConfig } from '~/hook/useQueryConfig'
import CategoryType from '~/types/category.type'
import { NoUndefineField } from '~/types/utils.type'
import { Schema, schema } from '~/utils/rules'
import RatingStar from '../RatingStar'
import { ObjectSchema } from 'yup'

interface Props {
  queryConfig: QueryConfig
  categories: CategoryType[]
}

type FormData = NoUndefineField<Pick<Schema, 'price_min' | 'price_max'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>)
  })

  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: routerMain.HOME,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handelRemoveAll = () => {
    navigate({
      pathname: routerMain.HOME,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['price_min', 'price_max', 'rating_filter', 'category']
        )
      ).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={routerMain.HOME}
        className={classNames('flex items-center font-bold', {
          'text-primary fill-primary': !category
        })}
      >
        <ListIcon className='w-4 h-4 mr-2' />
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories?.map((item) => {
          const isActive = category === item._id
          return (
            <li
              className={classNames('py-2 pl-2 relative', isActive ? 'text-primary font-semibold' : '')}
              key={item._id}
            >
              {isActive && <ChivonIcon className='fill-primary h-2 w-3 absolute top-3 left-[-8px]' />}
              <Link
                to={{
                  pathname: routerMain.HOME,
                  search: createSearchParams({
                    ...queryConfig,
                    category: item._id
                  }).toString()
                }}
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>

      <Link to={routerMain.HOME} className='flex items-center font-bold mt-6'>
        <FilterIcon className='w-3 h-4 fill-current stroke-current  mr-2' />
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ Từ'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    classNameError='hidden'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ Đến'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    classNameError='hidden'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-center'>{errors?.price_min?.message}</div>
          <div>
            <Button className='p-2 w-full uppercase bg-primary text-white text-sm'>Áp dụng</Button>
          </div>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div>
        <div>Đánh giá</div>
        <RatingStar queryConfig={queryConfig} />
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div>
        <Button className='p-2 w-full uppercase bg-primary text-white text-sm' onClick={handelRemoveAll}>
          Xoát tất cả
        </Button>
      </div>
    </div>
  )
}
