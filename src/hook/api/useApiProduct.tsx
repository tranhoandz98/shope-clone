import { useQuery } from '@tanstack/react-query'
import { productApi } from '~/apis/product.api'
import ProductType, { ProductListConfigType } from '~/types/product.type'
import { QueryConfig } from '../useQueryConfig'

export default function useApiProduct(queryConfig: QueryConfig) {
  return useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getList(queryConfig as ProductListConfigType),
    placeholderData: (previousData) => previousData,
    staleTime: 3 * 60 * 1000
  })
}

export function useApiProductInDetail(queryConfig: ProductListConfigType, item: ProductType) {
  return useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getList(queryConfig as ProductListConfigType),
    placeholderData: (previousData) => previousData,
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(item)
  })
}

export function useApiProductItem(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    placeholderData: (previousData) => previousData,
    enabled: !!id,
    staleTime: 10 * 1000
  })
}
