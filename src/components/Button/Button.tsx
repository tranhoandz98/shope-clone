import { ButtonHTMLAttributes } from 'react'
import LoadingIcon from '../SvgIcon/LoadingIcon'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export default function Button(props: ButtonProps) {
  const { isLoading, className, disabled, children, ...rest } = props
  const newClassName = disabled ? ' cursor-not-allowed bg-primary/80 ' + className : className
  return (
    <button
      className={' flex justify-center items-center ' + newClassName}
      disabled={disabled}
      {...rest}
      // className='  w-full text-center py-3 uppercase bg-primary text-white hover:bg-primary/80'
      type='submit'
    >
      <span className='mr-2'>{isLoading && <LoadingIcon />}</span>
      <span>{children}</span>
    </button>
  )
}
