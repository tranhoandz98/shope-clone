import { Schema } from '~/utils/rules'
import User from './user.type'
import { SuccessResponseApi } from './utils.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  expires: string
  user: User
}>

export type FormDataLogin = Pick<Schema, 'email' | 'password'>
export type FormDataRegister = Pick<Schema, 'email' | 'password' | 'confirm_password'>
