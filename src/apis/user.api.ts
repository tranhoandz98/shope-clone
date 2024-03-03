import UserType, { UserUpdateProfileType } from '~/types/user.type'
import { SuccessResponseApi } from '~/types/utils.type'
import http from '~/utils/http'

export const userApi = {
  getMe: () => {
    return http.get<SuccessResponseApi<UserType>>('me', {})
  },
  updateProfile: (body: UserUpdateProfileType) => {
    return http.put<SuccessResponseApi<UserType>>(`user`, body)
  },
  uploadAvatar: (body: FormData) => {
    return http.post<SuccessResponseApi<string>>(`user/upload-avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
