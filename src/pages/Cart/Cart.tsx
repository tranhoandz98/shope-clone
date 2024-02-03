import { Link } from 'react-router-dom'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController/QuantityController'
import { purchasesStatus } from '~/constants/purchases'
import { routerMain } from '~/constants/routerMain'
import usePurchaseApi from '~/hook/api/usePurchaseApi'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '~/utils/utils'

export default function Cart() {
  const { data: purchasesInCartData } = usePurchaseApi({ status: purchasesStatus.inCart })
  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9  capitalize  shadow'>
              <div className='col-span-6 bg-white '>
                <div className='flex items-center gap-3'>
                  <div className='flex flex-shrink-0 items-center justify-center'>
                    <input type='checkbox' className='w-5 h-5 accent-primary' />
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
              {purchasesInCart?.map((purchase, index) => (
                <div className='grid grid-cols-12 items-center rounded-sm bg-white  text-center border border-gray-200 py-5 px-4 first:mt-0 mt-5'>
                  <div className='col-span-6 '>
                    <div className='flex items-center gap-3'>
                      <div className='flex flex-shrink-0 items-center justify-center'>
                        <input type='checkbox' className='w-5 h-5 accent-primary' />
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
                          // onIncrease={handleBuyCount}
                          // onDecrease={handleBuyCount}
                          // onType={handleBuyCount}
                        />
                      </div>
                      <div className='col-span-1'>
                        <div className=' truncate ml-2 text-primary'>
                          <span className='text-xs'>₫</span>
                          {formatCurrency(purchase.product.price * purchase.buy_count)}
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <button className='hover:text-primary'>Xóa</button>
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
            <input type='checkbox' className='w-5 h-5 accent-primary' />
          </div>
          <button className=''>Chọn tất cả</button>
          <button className=''>Xóa tất cả</button>
          <div className='ml-auto flex items-center flex-wrap gap-3'>
            <div>
              <div className='flex items-center md:justify-end flex-wrap'>
                <div>Tổng thanh toán (0 sản phẩm):</div>
                <div className='ml-2 text-2xl text-primary'>
                  <span className=''>₫</span>
                  {formatCurrency(138000000)}
                </div>
              </div>
              <div className='flex items-center md:justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-primary'>
                  <span className=''>₫</span>
                  {formatNumberToSocialStyle(138000000).toLocaleUpperCase()}
                </div>
              </div>
            </div>
            <Button className='py-3 w-52 uppercase bg-primary text-white hover:bg-primary/80'>Mua hàng</Button>
          </div>
        </div>
      </div>
    </div>
  )
}