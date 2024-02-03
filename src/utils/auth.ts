import User from '~/types/user.type'

export const setAccessTokenToLS = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const clearAuthFromLS = () => {
  localStorage.removeItem('profile')
  return localStorage.removeItem('access_token')
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')

  return result ? JSON.parse(result) : result
}

export const setProfileToLS = (profile: User) => {
  return localStorage.setItem('profile', JSON.stringify(profile))
}
