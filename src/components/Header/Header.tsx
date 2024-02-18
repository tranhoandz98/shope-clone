import { Link, useNavigate } from 'react-router-dom'
import ImgNotFound from '~/assets/images/not_found.png'
import { purchasesStatus } from '~/constants/purchases'
import { routerMain } from '~/constants/routerMain'
import usePurchaseApi from '~/hook/api/usePurchaseApi'
import useSearchProducts from '~/hook/useSearchProducts'
import { formatCurrency } from '~/utils/utils'
import NavHeader from '../NavHeader'
import Popover from '../Popover'
import CartIcon from '../SvgIcon/CartIcon'
import SearchIcon from '../SvgIcon/SearchIcon'
import ShopeeIcon from '../SvgIcon/ShoppeIcon'

export default function Header() {
  const { onSubmitSearch, register } = useSearchProducts()

  const navigate = useNavigate()

  // Khi chúng ta chuyển trang thì Header chỉ bị re-render
  // Chứ không bị unmount - mounting again
  // (Tất nhiên là trừ trường hợp logout rồi nhảy sang RegisterLayout rồi nhảy vào lại)
  // Nên các query này sẽ không bị inactive => Không bị gọi lại => không cần thiết phải set stale: Infinity

  const { data: purchasesInCartData } = usePurchaseApi({ status: purchasesStatus.inCart })
  const purchasesInCart = purchasesInCartData?.data.data
  const checkPurchasesInCart = purchasesInCart && purchasesInCart?.length > 0

  const MAX_PURCHASES = 5
  const genBuyAddToCart = () => {
    return purchasesInCart && purchasesInCart?.length > MAX_PURCHASES ? purchasesInCart?.length - MAX_PURCHASES : ''
  }

  const handleWatchCart = () => {
    navigate(routerMain.CART)
  }
  return (
    <div className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      <div className='container text-white text-sm'>
        <NavHeader />

        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to={routerMain.HOME} className='col-span-2'>
            <ShopeeIcon className='h-14 fill-white' />
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                placeholder='LÌ XÌ TẾT ĐẾN 90%'
                className='text-back px-3 py-2 flex-grow border-none outline-none bg-transparent text-gray-800'
                {...register('name')}
              />
              <button className='rounded-sm py-2 px-6 bg-primary hover:opacity-90 flex-shrink-0' type='submit'>
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-center'>
            <Popover
              renderPopover={
                <div className='relative rounded-sm border border-gray-200 bg-white shadow-md max-w-[400px]'>
                  {checkPurchasesInCart && (
                    <div className=''>
                      <div className='text-gray-400 capitalize p-3'>Sản phẩm mới thêm</div>
                      <div className=''>
                        {purchasesInCart.slice(0, 5).map((item) => (
                          <div className=' flex hover:bg-slate-100 p-3' key={item._id}>
                            <div className='flex-shrink-0'>
                              <img src={item.product.image} alt={item.product.image} className='w-11 h-11' />
                            </div>
                            <div className='flex-grow ml-2 overflow-hidden'>
                              <div className='truncate'>{item.product.name}</div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <div className='text-primary'>₫ {formatCurrency(item.product.price)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-4 flex justify-between items-center p-3'>
                        <div className='text-sm capitalize'>{genBuyAddToCart()} Thêm vào giỏ hàng</div>
                        <button
                          className='bg-primary hover:bg-opacity-80 px-4 py-2 text-white rounded-sm capitalize'
                          onClick={handleWatchCart}
                        >
                          xem giỏ hàng
                        </button>
                      </div>
                    </div>
                  )}
                  {!checkPurchasesInCart && (
                    <div className='p-2 flex w-[30rem] h-[20rem] items-center justify-center'>
                      <div className='text-center '>
                        <div className='flex justify-center'>
                          <img src={ImgNotFound} alt='product not exist' className='w-20 h-20'></img>
                        </div>
                        <div className='text-sm mt-2'>Chưa có sản phẩm</div>
                      </div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to={routerMain.CART} className='relative'>
                <CartIcon className='w-8 h-8' />
                {checkPurchasesInCart && (
                  <div className='absolute rounded-[2.75rem] min-w-[.6875rem] text-center -top-[.3875rem] left-[1.25rem] bg-white px-[5px] text-primary shadow leading-[1.2em] h-4 self-center border-1 border-primary shadow-primary'>
                    {purchasesInCart?.length}
                  </div>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
