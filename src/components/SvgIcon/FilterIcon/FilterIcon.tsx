interface Props {
  className?: string
}

export default function FilterIcon({ className }: Props) {
  const classNameC = 'w-6 h-6' + className

  return (
    <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={classNameC}>
      <g>
        <polyline
          fill='none'
          points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit={10}
        />
      </g>
    </svg>
  )
}
