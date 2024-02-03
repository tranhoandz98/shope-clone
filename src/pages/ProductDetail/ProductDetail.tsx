import { useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import Button from '~/components/Button'
import ProductRating from '~/components/ProductRating'
import QuantityController from '~/components/QuantityController/QuantityController'
import ChevronLeft from '~/components/SvgIcon/ChevronLeft'
import ChevronRight from '~/components/SvgIcon/ChevronRight'
import { purchasesStatus } from '~/constants/purchases'
import { queryKeyApi } from '~/constants/queryKeyApi'
import { useApiProductItem } from '~/hook/api/useApiProduct'
import ProductType from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, reteSale } from '~/utils/utils'
import ProductRelate from './component/ProductRelate/ProductRelate'
import { useAddPurchaseApi } from '~/hook/api/usePurchaseApi'

export default function ProductDetail() {
  const { nameId } = useParams()
  const [buyCount, setBuyCount] = useState(1)
  const queryClient = useQueryClient()

  const id = getIdFromNameId(nameId as string)
  const queryProductItem = useApiProductItem(id as string)
  const dataProductItem = queryProductItem.data?.data.data

  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)

  const currentImages = useMemo(
    () => (dataProductItem ? dataProductItem.images.slice(...currentIndexImage) : []),
    [dataProductItem, currentIndexImage]
  )

  const addToCartMutation = useAddPurchaseApi()
  useEffect(() => {
    if (dataProductItem && dataProductItem.images.length > 0) {
      setActiveImage(dataProductItem.images[0])
    }
  }, [dataProductItem])

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImage[1] < (dataProductItem as ProductType)?.images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imgRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imgRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: dataProductItem?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: [queryKeyApi.purchases, { status: purchasesStatus.inCart }] })
        }
      }
    )
  }

  if (queryProductItem.isFetching) {
    return <>Loading...</>
  }

  if (!dataProductItem) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={dataProductItem.name}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imgRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <ChevronLeft />
                </button>
                {currentImages.map((item) => {
                  const isActive = item === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={item}>
                      <img
                        src={item}
                        alt={item}
                        className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                        onMouseEnter={() => chooseActive(item)}
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-primary'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
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
                <QuantityController
                  value={buyCount}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  max={dataProductItem.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{dataProductItem.quantity} số lượng sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center gap-2'>
                <Button
                  className=' py-3 px-3  text-primary hover:text-white hover:bg-primary/80
              border border-primary bg-primary/10 capitalize'
                  onClick={addToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button className='py-3 px-3 bg-primary capitalize text-white hover:bg-primary/80'>Mua ngay</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounde bg-gray-50 p-4 text-lg capitalize'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataProductItem.description) }}></div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8'>
          <ProductRelate productDetail={dataProductItem} />
        </div>
      </div>
    </div>
  )
}
