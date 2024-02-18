import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Schema, schema } from '~/utils/rules'
import useQueryConfig from './useQueryConfig'
import { routerMain } from '~/constants/routerMain'
import { omit } from 'lodash'

type FormData = Pick<Schema, 'name'>

export default function useSearchProducts() {
  const searchSchema = schema.pick(['name'])

  const navigate = useNavigate()

  // Khi chúng ta chuyển trang thì CartHeader chỉ bị re-render
  // Chứ không bị unmount - mounting again
  // (Tất nhiên là trừ trường hợp logout rồi nhảy sang RegisterLayout rồi nhảy vào lại)
  // Nên các query này sẽ không bị inactive => Không bị gọi lại => không cần thiết phải set stale: Infinity

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(searchSchema)
  })

  const queryConfig = useQueryConfig()

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: routerMain.HOME,
      search: createSearchParams(config).toString()
    })
  })

  return { onSubmitSearch, register }
}
