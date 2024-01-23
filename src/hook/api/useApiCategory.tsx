import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '~/apis/category.api'

export default function useApiCategory() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getList(),
    placeholderData: (previousData) => previousData,
    staleTime: 3 * 60 * 1000
  })
}
