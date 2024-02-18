import { Link } from 'react-router-dom'
import { routerMain } from '~/constants/routerMain'
import useSearchProducts from '~/hook/useSearchProducts'
import NavHeader from '../NavHeader'
import SearchIcon from '../SvgIcon/SearchIcon'
import ShopeeIcon from '../SvgIcon/ShoppeIcon'

export default function CartHeader() {
  const { onSubmitSearch, register } = useSearchProducts()

  return (
    <div className=''>
      <div className=' text-white text-sm'>
        <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] p-1 '>
          <div className='container'>
            <NavHeader />
          </div>
        </div>

        <div className='md:grid grid-cols-12 gap-4 items-center container h-[6.5rem]'>
          <Link to={routerMain.HOME} className='col-span-4 flex items-end gap-3'>
            <ShopeeIcon className='h-8 md:h-12 fill-primary' />
            <div className='border-r-[1px] h-8 border-primary'></div>
            <div className='capitalize md:text-2xl text-primary'>Giỏ hàng</div>
          </Link>
          <div className='col-span-2'></div>
          <form className='col-span-6' onSubmit={onSubmitSearch}>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                placeholder='SHOPEE TUNG LÌ XÌ'
                className='text-back px-3 py-2 flex-grow border-primary border-2 outline-none bg-transparent text-gray-800'
                {...register('name')}
              />
              <button className='rounded-sm py-2 px-6 bg-primary hover:opacity-90 flex-shrink-0' type='submit'>
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
