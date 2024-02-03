import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { purchaseApi } from '~/apis/purchases.api'
import { queryKeyApi } from '~/constants/queryKeyApi'
import { AppContext } from '~/context/app.context'
import { PurChaseBodyType, PurchaseListStatus } from '~/types/purchase.type'

export default function usePurchaseApi(params: { status: PurchaseListStatus }) {
  const { isAuthenticated } = useContext(AppContext)

  return useQuery({
    queryKey: [queryKeyApi.purchases, params],
    queryFn: () => purchaseApi.getList(params),
    enabled: isAuthenticated
  })
}

export function useAddPurchaseApi() {
  return useMutation({ mutationFn: (body: PurChaseBodyType) => purchaseApi.addToCart(body) })
}
