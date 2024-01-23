import CategoryType from '~/types/category.type'
import { SuccessResponseApi } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'categories'

export const categoryApi = {
  getList: () => {
    return http.get<SuccessResponseApi<CategoryType[]>>(URL, {})
  }
}
