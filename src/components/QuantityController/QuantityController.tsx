import React, { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'
import classNames from 'classnames'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }

    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }

    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>): void => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }

  return (
    <div className={classNames('flex items-center', classNameWrapper)}>
      <button
        className='flex h-8 w-8 rounded-l-sm items-center justify-center border border-gray-300 text-gray-600
        disabled:opacity-70 disabled:bg-gray-200 disabled:cursor-not-allowed
        '
        onClick={decrease}
        disabled={value === 1}
      >
        -
      </button>
      <InputNumber
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t p-1 text-center out-line-none border-b border-gray-300 text-gray-600'
        onChange={handleChange}
        value={value || localValue}
        onBlur={handleBlur}
        {...rest}
      />
      <button
        className='flex h-8 w-8 rounded-r-sm items-center justify-center border border-gray-300 text-gray-600
        disabled:opacity-70  disabled:bg-gray-200 disabled:cursor-not-allowed
        '
        onClick={increase}
        disabled={value === max}
      >
        +
      </button>
    </div>
  )
}
