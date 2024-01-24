import DOMPurify from 'dompurify'
import { useParams } from 'react-router'
import Button from '~/components/Button'
import InputNumber from '~/components/InputNumber'
import ProductRating from '~/components/ProductRating'
import ChevronLeft from '~/components/SvgIcon/ChevronLeft'
import ChevronRight from '~/components/SvgIcon/ChevronRight'
import { useApiProductItem } from '~/hook/api/useApiProduct'
import { formatCurrency, formatNumberToSocialStyle, reteSale } from '~/utils/utils'

export default function ProductDetail() {
  const { id } = useParams()
  const queryProductItem = useApiProductItem(id as string)
  const dataProductItem = queryProductItem.data?.data.data
  if (queryProductItem.isFetching) {
    return <>Loading...</>
  }
  if (!dataProductItem) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={dataProductItem.image}
                  alt={dataProductItem.name}
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <ChevronLeft />
                </button>
                {dataProductItem.images.slice(0, 5).map((item, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative w-full pt-[100%]' key={item}>
                      <img
                        src={item}
                        alt={item}
                        className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-primary'></div>}
                    </div>
                  )
                })}
                <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <ChevronRight />
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{dataProductItem.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 boder-b border-primary text-primary'>{dataProductItem.rating}</span>
                  <ProductRating
                    rating={dataProductItem.rating}
                    activeClassname='fill-primary text-primary h-3 w-3'
                    nonActiveClassname='h-3 w-3 fill-current text-gray-300'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span className=''>{formatNumberToSocialStyle(dataProductItem.sold)} Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  đ{formatCurrency(dataProductItem.price_before_discount)}
                </div>
                <div className='text-primary text-3xl ml-3 font-medium'>đ{formatCurrency(dataProductItem.price)}</div>
                <div className='bg-primary py-1 ml-4 rounded-sm text-white font-semibold px-3 uppercase text-xs'>
                  {reteSale(dataProductItem.price_before_discount, dataProductItem.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 rounded-l-sm items-center justify-center border border-gray-300 text-gray-600'>
                    -
                  </button>
                  <InputNumber
                    value={1}
                    classNameError='hidden'
                    classNameInput='h-8 w-14 border-t p-1 text-center out-line-none border-b border-gray-300 text-gray-600'
                  />
                  <button className='flex h-8 w-8 rounded-r-sm items-center justify-center border border-gray-300 text-gray-600'>
                    +
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-500'>{dataProductItem.quantity} số lượng sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center gap-2'>
                <Button
                  className=' py-3 px-3  text-primary hover:text-white hover:bg-primary/80
              border border-primary bg-primary/10 capitalize'
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button className='py-3 px-3 bg-primary capitalize text-white hover:bg-primary/80'>Mua ngay</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='container'>
          <div className='rounde bg-gray-50 p-4 text-lg capitalize'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataProductItem.description) }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
