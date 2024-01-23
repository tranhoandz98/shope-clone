import { useQuery } from '@tanstack/react-query'
import { productApi } from '~/apis/product.api'
import { ProductListConfigType } from '~/types/product.type'
import { QueryConfig } from '../useQueryConfig'

export default function useApiProduct(queryConfig: QueryConfig) {
  return useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getList(queryConfig as ProductListConfigType),
    placeholderData: (previousData) => previousData,
    staleTime: 3 * 60 * 1000
  })
}
