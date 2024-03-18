import { useMutation, useQuery } from '@tanstack/react-query'
import { authApi } from '~/apis/auth.api'
import { userApi } from '~/apis/user.api'
import { queryKeyApi } from '~/constants/queryKeyApi'
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
    mutationFn: authApi.logout
  })
}

export function useUserGetMeApi() {
  return useQuery({
    queryKey: [queryKeyApi.user],
    queryFn: userApi.getMe
  })
}

export function useUserUpdateProfileApi() {
  return useMutation({
    mutationFn: userApi.updateProfile
  })
}

export function useUserUpdateAvatarApi() {
  return useMutation({
    mutationFn: userApi.uploadAvatar
  })
}
