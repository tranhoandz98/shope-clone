import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { authApi } from '~/apis/auth.api'
import { routerMain } from '~/constants/routerMain'
import { AppContext } from '~/context/app.context'
import { locales } from '~/i18n/i18n'
import Popover from '../Popover'
import BellIcon from '../SvgIcon/BellIcon'
import CartIcon from '../SvgIcon/CartIcon'
import ChevronDownIcon from '../SvgIcon/ChevronDownIcon'
import GlobeAltIcon from '../SvgIcon/GlobeAltIcon'
import QuestionMarkCircleIcon from '../SvgIcon/QuestionMarkCircleIcon'
import SearchIcon from '../SvgIcon/SearchIcon'
import ShopeeIcon from '../SvgIcon/ShoppeIcon'
import { getAvatarUrl } from '~/utils/utils'
import { useForm } from 'react-hook-form'
import { Schema, schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import useQueryConfig from '~/hook/useQueryConfig'

type FormData = Pick<Schema, 'name'>

export default function Header() {
  const searchSchema = schema.pick(['name'])
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(searchSchema)
  })

  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const { setIsAuthenticated, isAuthenticated, profile, setProfile } = useContext(AppContext)

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const queryConfig = useQueryConfig()

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: routerMain.HOME,
      search: createSearchParams(config).toString()
    })
  })

  return (
    <div className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      <div className='container text-white text-sm'>
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
                <img
                  src={getAvatarUrl(profile?.avatar)}
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
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
          <div className='col-span-1 justify-self-end'>
            <Popover
              renderPopover={
                <div className='relative rounded-sm border border-gray-200 bg-white shadow-md max-w-[400px]'>
                  <div className=''>
                    <div className='text-gray-400 capitalize p-3'>Sản phẩm mới thêm</div>
                    <div className=''>
                      <div className=' flex hover:bg-slate-100 p-3'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqbe9hiqhzxzec_tn'
                            alt='anh'
                            className='w-11 h-11'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>Hạt Dinh Dưỡng Cao Cấp Bổ Sung Lợi Khuẩn BC30 GULU FOODS</div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <div className='text-primary'>d300.000</div>
                        </div>
                      </div>

                      <div className='mt-4 flex hover:bg-slate-100 p-3'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqbe9hiqhzxzec_tn'
                            alt='anh'
                            className='w-11 h-11'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>Hạt Dinh Dưỡng Cao Cấp Bổ Sung Lợi Khuẩn BC30 GULU FOODS</div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <div className='text-primary'>d300.000</div>
                        </div>
                      </div>
                      <div className='mt-4 flex hover:bg-slate-100 p-3'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqbe9hiqhzxzec_tn'
                            alt='anh'
                            className='w-11 h-11'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>Hạt Dinh Dưỡng Cao Cấp Bổ Sung Lợi Khuẩn BC30 GULU FOODS</div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <div className='text-primary'>d300.000</div>
                        </div>
                      </div>
                      <div className='mt-4 flex hover:bg-slate-100 p-3'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqbe9hiqhzxzec_tn'
                            alt='anh'
                            className='w-11 h-11'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>Hạt Dinh Dưỡng Cao Cấp Bổ Sung Lợi Khuẩn BC30 GULU FOODS</div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <div className='text-primary'>d300.000</div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-4 flex justify-between items-center p-3'>
                      <div className='text-sx capitalize'>Thêm vào giỏ hàng</div>
                      <button className='bg-primary hover:bg-opacity-80 px-4 py-2 text-white rounded-sm capitalize'>
                        xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to={routerMain.CART} className=''>
                <CartIcon className='w-8 h-8' />
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
