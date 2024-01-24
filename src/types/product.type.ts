export default interface ProductType {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
  description: string
}

export interface ProductListType {
  products: ProductType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfigType {
  page?: number
  limit?: number
  page_size?: number
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: string
  price_max?: number
  price_min?: number
  name?: string
  category?: string
}
