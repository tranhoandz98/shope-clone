interface Props {
  className?: string
}

export default function ChivonIcon({ className }: Props) {
  const classNameC = className || 'w-4 h-4'

  return (
    <svg viewBox='0 0 4 7' className={classNameC}>
      <polygon points='4 3.5 0 0 0 7' />
    </svg>
  )
}
