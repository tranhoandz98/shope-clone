import { PurchaseListStatus, PurchaseType, PurChaseBodyType } from '~/types/purchase.type'
import { SuccessResponseApi } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'purchases'

export const purchaseApi = {
  addToCart(body: PurChaseBodyType) {
    return http.post<SuccessResponseApi<PurchaseType>>(`${URL}/add-to-cart`, body)
  },
  getList(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponseApi<PurchaseType[]>>(`${URL}`, {
      params
    })
  },
  buyProducts(body: PurChaseBodyType[]) {
    return http.post<SuccessResponseApi<PurchaseType[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: PurChaseBodyType) {
    return http.put<SuccessResponseApi<PurchaseType>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponseApi<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}
