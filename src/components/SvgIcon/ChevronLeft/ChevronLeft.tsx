interface Props {
  className?: string
}

export default function ChevronLeft({ className }: Props) {
  const classNameC = className || 'w-6 h-6'

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={classNameC}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
    </svg>
  )
}
