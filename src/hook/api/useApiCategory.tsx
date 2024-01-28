import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '~/apis/category.api'
import { queryKeyApi } from '~/constants/queryKeyApi'

export default function useApiCategory() {
  return useQuery({
    queryKey: [queryKeyApi.categories],
    queryFn: () => categoryApi.getList(),
    placeholderData: (previousData) => previousData,
    staleTime: 3 * 60 * 1000
  })
}
