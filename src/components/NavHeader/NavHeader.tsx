import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { routerMain } from '~/constants/routerMain'
import { AppContext } from '~/context/app.context'
import { useAuthLogoutApi } from '~/hook/api/useAuthApi'
import { locales } from '~/i18n/i18n'
import { getAvatarUrl } from '~/utils/utils'
import Popover from '../Popover'
import BellIcon from '../SvgIcon/BellIcon'
import ChevronDownIcon from '../SvgIcon/ChevronDownIcon'
import GlobeAltIcon from '../SvgIcon/GlobeAltIcon'
import QuestionMarkCircleIcon from '../SvgIcon/QuestionMarkCircleIcon'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeyApi } from '~/constants/queryKeyApi'
import { purchasesStatus } from '~/constants/purchases'

export default function NavHeader() {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const { setIsAuthenticated, isAuthenticated, profile, setProfile } = useContext(AppContext)

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const logoutMutation = useAuthLogoutApi()

  const queryClient = useQueryClient()

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false)
        setProfile(null)
        queryClient.removeQueries({ queryKey: [queryKeyApi.purchases, { status: purchasesStatus.inCart }] })
      }
    })
  }

  return (
    <div className='flex justify-end'>
      <div className='flex items-center py-1 hover:text-gray-300 cursor-pointer'>
        <BellIcon className='w-5 h-5' />
        <span className='mx-1'>Thông báo</span>
      </div>
      <div className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-2'>
        <QuestionMarkCircleIcon className='w-5 h-5' />
        <span className='mx-1'>Hỗ trợ</span>
      </div>

      <Popover
        className='flex cursor-pointer items-center py-1 hover:text-white/70 ml-4'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 pr-28 pl-3'>
              <button className='py-2 px-3 text-left hover:text-primary' onClick={() => changeLanguage('vi')}>
                Tiếng Việt
              </button>
              <button className='mt-2 py-2 px-3 text-left hover:text-primary' onClick={() => changeLanguage('en')}>
                English
              </button>
            </div>
          </div>
        }
      >
        <GlobeAltIcon className='w-5 h-5' />
        <span className='mx-1'>{currentLanguage}</span>
        <ChevronDownIcon className='w-5 h-5' />
      </Popover>
      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={routerMain.PROFILE}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-emerald-500'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to={routerMain.HISTORY_PURCHASE}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-emerald-500'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-emerald-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='h-full w-full rounded-full object-cover' />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={routerMain.REGISTER} className='mx-3 capitalize'>
            Đăng ký
          </Link>
          <div className='border-r-[1px] border-white/80 h-4'></div>
          <Link to={routerMain.LOGIN} className='mx-3 capitalize'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
