import { Link, useMatch } from 'react-router-dom'
import { routerMain } from '~/constants/routerMain'
import ShopeeIcon from '../SvgIcon/ShoppeIcon'

export default function RegisterHeader() {
  const registerMatch = useMatch(routerMain.REGISTER)
  const isRegister = Boolean(registerMatch)

  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to={routerMain.HOME}>
            <ShopeeIcon className='h-8 lg:h-11 fill-primary' />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
          <div className='ml-auto'>
            <a href='https://help.shopee.vn/portal' className='text-primary'>
              Bạn cần giúp đỡ?
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
