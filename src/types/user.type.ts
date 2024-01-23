type Role = 'User' | 'Admin'

export default interface User {
  roles: Role[]
  _id: string
  email: string
  createdAt: string
  updatedAt: string
  avatar?: string
}
