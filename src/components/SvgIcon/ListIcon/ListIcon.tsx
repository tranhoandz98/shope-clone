interface Props {
  className?: string
}

export default function ListIcon({ className }: Props) {
  const classNameC = 'w-4 h-4' + className

  return (
    <svg viewBox='0 0 12 10' className={classNameC}>
      <g fillRule='evenodd' stroke='none' strokeWidth={1}>
        <g transform='translate(-373 -208)'>
          <g transform='translate(155 191)'>
            <g transform='translate(218 17)'>
              <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
              <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
              <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
