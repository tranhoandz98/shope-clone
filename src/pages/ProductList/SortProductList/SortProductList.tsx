import classNames from 'classnames'
import Button from '~/components/Button'
import { sortBy, order as orderConstant } from '~/constants/product'
import { routerMain } from '~/constants/routerMain'
import { QueryConfig } from '~/hook/useQueryConfig'
import { ProductListConfigType } from '~/types/product.type'
import omit from 'lodash/omit'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order = orderConstant.desc } = queryConfig

  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfigType['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfigType['sort_by'], undefined>) => {
    navigate({
      pathname: routerMain.HOME,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleSortPrice = (orderValue: Exclude<ProductListConfigType['order'], undefined>) => {
    navigate({
      pathname: routerMain.HOME,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='flex gap-3 items-center'>
      <div>Sắp xếp theo</div>
      <div className='flex gap-3'>
        <Button
          className={classNames(
            ' px-3 py-2 ',
            isActiveSortBy(sortBy.view) ? 'bg-primary text-white' : 'bg-white text-black'
          )}
          onClick={() => handleSort(sortBy.view)}
        >
          Phổ biến
        </Button>
        <Button
          className={classNames(
            ' px-3 py-2 ',
            isActiveSortBy(sortBy.createdAt) ? 'bg-primary text-white' : 'bg-white text-black'
          )}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          Mới nhất
        </Button>
        <Button
          className={classNames(
            ' px-3 py-2 ',
            isActiveSortBy(sortBy.sold) ? 'bg-primary text-white' : 'bg-white text-black'
          )}
          onClick={() => handleSort(sortBy.sold)}
        >
          Bán chạy
        </Button>
      </div>
      <div>
        <select
          name=''
          id=''
          className={classNames('h-8 px-4 text-left outline-none', isActiveSortBy(sortBy.price) ? 'text-primary ' : '')}
          value={order || ''}
          onChange={(e) => handleSortPrice(e.target.value as Exclude<ProductListConfigType['order'], undefined>)}
        >
          <option value='' disabled>
            Giá
          </option>
          <option className='text-black' value={orderConstant.asc}>
            Giá thấp đến cao
          </option>
          <option className='text-black' value={orderConstant.desc}>
            Giá cao đến thấp
          </option>
        </select>
      </div>
      <div className='ml-auto flex gap-3 items-center'>
        <div>
          <span className='text-primary'>{page}</span>/{pageSize}
        </div>
        <div className='ml-auto flex'>
          {page === 1 ? (
            <span className='cursor-not-allowed rounded border bg-white/60 px-3 py-3  shadow-sm'>
              <svg viewBox='0 0 7 11' className='fill-gray-400 w-3 h-3'>
                <path
                  d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                  fillRule='nonzero'
                />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: routerMain.HOME,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className=' cursor-pointer rounded border bg-white px-3 py-3  shadow-sm'
            >
              <svg viewBox='0 0 7 11' className='fill-gray-400 w-3 h-3'>
                <path
                  d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                  fillRule='nonzero'
                />
              </svg>
            </Link>
          )}

          {page === pageSize ? (
            <span className=' cursor-not-allowed rounded border bg-white/60 px-3 py-3  shadow-sm'>
              <svg viewBox='0 0 7 11' className='fill-gray-400 w-3 h-3'>
                <path
                  d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                  fillRule='nonzero'
                />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: routerMain.HOME,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className=' cursor-pointer rounded border bg-white px-3 py-3  shadow-sm'
            >
              <svg viewBox='0 0 7 11' className='fill-gray-400 w-3 h-3'>
                <path
                  d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                  fillRule='nonzero'
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
