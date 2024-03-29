interface Props {
  className?: string
}

export default function ChevronDownIcon({ className }: Props) {
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
      <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
    </svg>
  )
}
