import { useMutation, useQuery } from '@tanstack/react-query'
import { purchaseApi } from '~/apis/purchases.api'
import { queryKeyApi } from '~/constants/queryKeyApi'
import { PurChaseBodyType, PurchaseListStatus } from '~/types/purchase.type'

export default function usePurchaseApi(params: { status: PurchaseListStatus }) {
  return useQuery({
    queryKey: [queryKeyApi.purchases, params],
    queryFn: () => purchaseApi.getList(params),
    placeholderData: (previousData) => previousData
  })
}

export function useAddPurchaseApi() {
  return useMutation({ mutationFn: (body: PurChaseBodyType) => purchaseApi.addToCart(body) })
}
