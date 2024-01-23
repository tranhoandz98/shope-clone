import Product, { ProductListType, ProductListConfigType } from '~/types/product.type'
import { SuccessResponseApi } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'products'

export const productApi = {
  getList: (params: ProductListConfigType) => {
    return http.get<SuccessResponseApi<ProductListType>>(URL, { params })
  },
  getById: (id: string) => {
    return http.get<SuccessResponseApi<Product>>(`${URL}${id}`)
  }
}
