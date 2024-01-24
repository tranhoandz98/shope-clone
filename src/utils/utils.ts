import axios, { AxiosError } from 'axios'
import HttpStatusCode from '~/constants/httpStatus.enum'
import userImage from '~/assets/images/user.svg'
import config from '~/constants/config'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userImage)

export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const reteSale = (original: number, sale: number) => {
  return Math.round(((original - sale) / original) * 100) + '%'
}
