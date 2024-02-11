import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController/QuantityController'
import { purchasesStatus } from '~/constants/purchases'
import { routerMain } from '~/constants/routerMain'
import usePurchaseApi, {
  useBuyPurchaseApi,
  useDeletePurchaseApi,
  useUpdatePurchaseApi
} from '~/hook/api/usePurchaseApi'
import { PurchaseType } from '~/types/purchase.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '~/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
interface ExtendedPurchases extends PurchaseType {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])

  const { data: purchasesInCartData, refetch } = usePurchaseApi({ status: purchasesStatus.inCart })
  const updatePurchaseMutation = useUpdatePurchaseApi()

  const purchasesInCart = purchasesInCartData?.data.data
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchase = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)

  const totalOriginCheckedPurchase = checkedPurchases.reduce((result, current) => {
    return result + current.product.price_before_discount * current.buy_count
  }, 0)

  const totalSavePurchase = totalOriginCheckedPurchase - totalCheckedPurchase

  const isCheckedAll = extendedPurchases.length > 0 ? extendedPurchases?.every((purchase) => purchase.checked) : false
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchaseObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchaseObject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isCheckedAll
      }))
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean): void => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate(
        { product_id: purchase.product._id, buy_count: value },
        {
          onSuccess: () => {
            refetch()
          }
        }
      )
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const deletePurchaseMutation = useDeletePurchaseApi()

  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId], {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const handleDeleteManyPurchase = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds, {
      onSuccess: () => {
        refetch()
      }
    })
  }
  const buyPurchaseMutation = useBuyPurchaseApi()

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => {
        return { product_id: purchase.product._id, buy_count: purchase.buy_count }
      })

      buyPurchaseMutation.mutate(body, {
        onSuccess: (data) => {
          toast.success(data.data.message)
          refetch()
        }
      })
    }
  }

  return (
    <div className='bg-neutral-100 py-4'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='flex items-center border border-[#e0a80066] p-3 mb-2 bg-[#fffefb]'>
              <img
                width={24}
                height={20}
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/d9e992985b18d96aab90.png'
                alt='fs-icon'
              />
              <span className='ml-2 font-medium text-gray-900'>
                Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
              </span>
            </div>

            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9  capitalize  shadow'>
              <div className='col-span-6 bg-white '>
                <div className='flex items-center gap-3'>
                  <div className='flex flex-shrink-0 items-center justify-center'>
                    <input
                      type='checkbox'
                      className='w-5 h-5 accent-primary'
                      checked={isCheckedAll}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid text-center grid-cols-5 text-gray-500'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>số lượng</div>
                  <div className='col-span-1'>số tiền</div>
                  <div className='col-span-1'>thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div className='grid grid-cols-12 items-center rounded-sm bg-white  text-center border border-gray-200 py-5 px-4 first:mt-0 mt-5'>
                  <div className='col-span-6 '>
                    <div className='flex items-center gap-3'>
                      <div className='flex flex-shrink-0 items-center justify-center'>
                        <input
                          type='checkbox'
                          className='w-5 h-5 accent-primary'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className='flex-grow text-black text-left'>
                        <div className='flex  items-center'>
                          <Link
                            className='h-20 w-20 flex-shrink-0'
                            to={`${routerMain.HOME}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`${routerMain.HOME}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid text-center grid-cols-5 justify-center items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <div className='line-through  text-gray-500 truncate'>
                            <span className='text-xs'>₫</span>
                            {formatCurrency(purchase.product.price_before_discount)}
                          </div>
                          <div className='  truncate ml-2'>
                            <span className='text-xs'>₫</span>
                            {formatCurrency(purchase.product.price)}
                          </div>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper=''
                          onIncrease={(value) => handleQuantity(index, value, true)}
                          onDecrease={(value) => handleQuantity(index, value, true)}
                          disabled={purchase.disabled}
                          onType={handleTypeQuantity(index)}
                          onFocusOut={(value) => {
                            handleQuantity(index, value, value !== (purchasesInCart as PurchaseType[])[index].buy_count)
                          }}
                        />
                      </div>
                      <div className='col-span-1'>
                        <div className=' truncate ml-2 text-primary'>
                          <span className='text-xs'>₫</span>
                          {formatCurrency(purchase.product.price * purchase.buy_count)}
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <button className='hover:text-primary' onClick={handleDeletePurchase(index)}>
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-3 sticky z-10 bottom-0 rounded-sm bg-white p-5 shadow border-t border-gray-200 flex items-center flex-wrap gap-3'>
          <div className='flex flex-shrink-0 items-center justify-center'>
            <input
              type='checkbox'
              className='w-5 h-5 accent-primary'
              checked={isCheckedAll}
              onChange={handleCheckAll}
            />
          </div>
          <button className='' onClick={handleCheckAll}>
            Chọn tất cả ({extendedPurchases.length})
          </button>
          <button className='hover:text-primary' onClick={handleDeleteManyPurchase}>
            Xóa
          </button>
          <div className='ml-auto flex items-center flex-wrap gap-3'>
            <div>
              <div className='flex items-center md:justify-end flex-wrap'>
                <div>Tổng thanh toán ({checkedPurchasesCount} sản phẩm):</div>
                <div className='ml-2 text-2xl text-primary'>
                  <span className=''>₫</span>
                  {formatCurrency(totalCheckedPurchase).toLocaleUpperCase()}
                </div>
              </div>
              <div className='flex items-center md:justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-primary'>
                  <span className=''>₫</span>
                  {formatNumberToSocialStyle(totalSavePurchase).toLocaleUpperCase()}
                </div>
              </div>
            </div>
            <Button
              className='py-3 w-52 uppercase bg-primary text-white hover:bg-primary/80'
              onClick={handleBuyPurchases}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
