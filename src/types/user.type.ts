type Role = 'User' | 'Admin'

export default interface UserType {
  roles: Role[]
  _id: string
  email: string
  createdAt: string
  updatedAt: string
  avatar?: string
  address?: string
  date_of_birth?: string
  name?: string
  phone?: string
}

export interface UserUpdateProfileType extends Omit<UserType, '_id' | 'email' | 'roles' | 'createdAt' | 'updatedAt'> {
  // password?: string
  // newPassword: string
}
