import ProductType from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus | 0

export interface PurchaseType {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: ProductType
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchaseType extends PurchaseType {
  disabled: boolean
  checked: boolean
}

export interface PurChaseBodyType {
  product_id: string
  buy_count: number
}
