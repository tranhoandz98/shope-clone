import Input from '~/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b py-5'>
        <div className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</div>
        <div className='mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap items-center'>
            <div className='w-1/5 truncate text-right capitalize'>Email</div>
            <div className='w-4/5 pl-5'>tr***********@gmail.com</div>
          </div>
          <div className='mt-6 flex flex-wrap '>
            <div className='w-1/5 truncate text-right pt-3 capitalize'>Tên</div>
            <div className='w-4/5 pl-5'>
              <Input
                name='name'
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap '>
            <div className='w-1/5 truncate text-right pt-3 capitalize'>Số điện thoại</div>
            <div className='w-4/5 pl-5'>
              <Input
                name='phone'
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap '>
            <div className='w-1/5 truncate text-right pt-3 capitalize'>Địa chỉ</div>
            <div className='w-4/5 pl-5'>
              <Input
                name='address'
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap '>
            <div className='w-1/5 truncate text-right pt-3 capitalize'>Ngày sinh</div>
            <div className='w-4/5 pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border px-3 border-gray-300 focus:border-gray-500 focus:shadow-sm'>
                  <option>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border px-3 border-gray-300 focus:border-gray-500 focus:shadow-sm'>
                  <option>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border px-3 border-gray-300 focus:border-gray-500 focus:shadow-sm'>
                  <option>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
