import { Link } from 'react-router-dom'
import ProductRating from '~/components/ProductRating'
import { routerMain } from '~/constants/routerMain'
import ProductType from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '~/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={routerMain.HOME}>
      <div
        className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform
      text-sm overflow-hidden
      '
      >
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden '>
          <div className='min-h-[2rem] line-clamp-2 '>{product.name}</div>
          <div className='flex items-center mt-3 gap-2s'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>đ</span>
              {formatCurrency(product.price_before_discount)}
            </div>
            <div className=' max-w-[50%] text-primary truncate ml-2'>
              <span className='text-xs'>đ</span>
              {formatCurrency(product.price)}
            </div>
          </div>
          <div className='mt-3 flex gap-2'>
            <div className=''>
              <ProductRating rating={product.rating} />
            </div>
            <div className=''>Đã bán {formatNumberToSocialStyle(product.sold)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
