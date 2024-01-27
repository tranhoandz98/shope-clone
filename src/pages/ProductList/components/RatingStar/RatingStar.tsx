import { createSearchParams, useNavigate } from 'react-router-dom'
import StarIcon from '~/components/SvgIcon/StarIcon'
import { routerMain } from '~/constants/routerMain'
import { QueryConfig } from '~/hook/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStar({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handelFilterStar = (ratingFilter: number): void => {
    navigate({
      pathname: routerMain.HOME,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }
  return (
    <ul className='my-3'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='py-1 pl-2' key={index}>
            <div
              className='flex items-center text-sm cursor-pointer'
              onClick={() => handelFilterStar(5 - index)}
              role='button'
              tabIndex={0}
              aria-hidden='true'
            >
              {Array(5)
                .fill(0)
                .map((_, indexStar) => {
                  if (indexStar < 5 - index) {
                    return (
                      <div key={indexStar}>
                        <StarIcon className='w-5 h-5 ' isFill={true} />
                      </div>
                    )
                  } else {
                    return (
                      <div key={indexStar}>
                        <StarIcon className='w-5 h-5 ' isFill={false} />
                      </div>
                    )
                  }
                })}
              {index !== 0 && <>Trở lên</>}
            </div>
          </li>
        ))}
    </ul>
  )
}
