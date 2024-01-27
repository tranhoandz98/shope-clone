import { useApiProductInDetail } from '~/hook/api/useApiProduct'
import Product from '~/pages/ProductList/components/Product'
import ProductType, { ProductListConfigType } from '~/types/product.type'

interface Props {
  productDetail: ProductType
}

export default function ProductRelate({ productDetail }: Props) {
  const queryConfig: ProductListConfigType = { limit: 20, page: 1, category: productDetail?.category._id }

  const { data: productsData } = useApiProductInDetail(queryConfig, productDetail)

  return (
    <div>
      <div className='uppercase'>Có thể bạn cũng thích</div>
      {productsData && (
        <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
          {productsData.data.data.products.map((product) => (
            <div className='col-span-1' key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
