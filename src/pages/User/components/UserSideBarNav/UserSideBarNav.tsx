import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PencilIcon from '~/components/SvgIcon/PencilIcon'
import UserIcon from '~/components/SvgIcon/UserIcon'
import { routerMain } from '~/constants/routerMain'
import { AppContext } from '~/context/app.context'
import { getAvatarUrl } from '~/utils/utils'
import clsx from 'clsx'

export default function UserSideBarNav() {
  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className='flex items-center border-b border-gray-300 py-4'>
        <Link to={routerMain.PROFILE} className={clsx('mr-2 h-14 w-14 flex-shrink-0')}>
          <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='h-full w-full rounded-full object-cover' />
        </Link>
        <div>
          <div className='font-semibold'>{profile?.email}</div>
          <Link to={routerMain.PROFILE} className=' text-neutral-400 flex'>
            <PencilIcon className='w-4 h-4' />
            <span className='ml-1'>Sửa hồ sơ</span>
          </Link>
        </div>
      </div>
      <NavLink
        to={routerMain.PROFILE}
        className={({ isActive }) => clsx('mt-5 flex items-center', { 'text-primary': isActive })}
      >
        <div className='mr-2 text-blue-700'>
          <UserIcon />
        </div>
        <div className='hover:text-primary'>Tài khoản của tôi</div>
      </NavLink>
      <NavLink
        to={routerMain.CHANGE_PASSWORD}
        className={({ isActive }) => clsx('mt-5 flex items-center', { 'text-primary': isActive })}
      >
        <div className='mr-2 text-transparent'>
          <UserIcon />
        </div>
        <div className='hover:text-primary'>Đổi mật khẩu</div>
      </NavLink>
      <NavLink
        to={routerMain.HISTORY_PURCHASE}
        className={({ isActive }) => clsx('mt-5 flex items-center', { 'text-primary': isActive })}
      >
        <div className='mr-2'>
          <img
            alt='icon-donmua'
            className='w-6 h-6'
            src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
          ></img>
        </div>
        <div className='hover:text-primary'>Đơn mua</div>
      </NavLink>
    </div>
  )
}
