export interface SuccessResponseApi<Data> {
  message: string
  data: Data
}

export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional
export type NoUndefineField<T> = {
  [P in keyof T]-?: NoUndefineField<NonNullable<T[P]>>
}
