import { useMutation } from '@tanstack/react-query'
import { authApi } from '~/apis/auth.api'
import { FormDataLogin, FormDataRegister } from '~/types/auth.type'

export function useAuthLoginApi() {
  return useMutation({
    mutationFn: (body: FormDataLogin) => authApi.login(body)
  })
}

export function useAuthRegisterApi() {
  return useMutation({
    mutationFn: (body: Omit<FormDataRegister, 'confirm_password'>) => authApi.register(body)
  })
}

export function useAuthLogoutApi() {
  return useMutation({
    mutationFn: () => authApi.logout()
  })
}
