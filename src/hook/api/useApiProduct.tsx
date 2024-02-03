import { useQuery } from '@tanstack/react-query'
import { productApi } from '~/apis/product.api'
import ProductType, { ProductListConfigType } from '~/types/product.type'
import { QueryConfig } from '../useQueryConfig'
import { queryKeyApi } from '~/constants/queryKeyApi'

export default function useApiProduct(queryConfig: QueryConfig) {
  return useQuery({
    queryKey: [queryKeyApi.products, queryConfig],
    queryFn: () => productApi.getList(queryConfig as ProductListConfigType),
    staleTime: 3 * 60 * 1000
  })
}

export function useApiProductInDetail(queryConfig: ProductListConfigType, item: ProductType) {
  return useQuery({
    queryKey: [queryKeyApi.products, queryConfig],
    queryFn: () => productApi.getList(queryConfig as ProductListConfigType),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(item)
  })
}

export function useApiProductItem(id: string) {
  return useQuery({
    queryKey: [queryKeyApi.product, id],
    queryFn: () => productApi.getById(id),
    placeholderData: (previousData) => previousData,
    enabled: !!id,
    staleTime: 10 * 1000
  })
}
