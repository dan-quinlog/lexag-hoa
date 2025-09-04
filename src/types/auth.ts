export interface User {
  id: string
  cognitoUserId: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  userType: UserType
  role?: BoardRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type UserType = 'RESIDENT' | 'OWNER' | 'BOARD'

export type BoardRole = 'PRESIDENT' | 'SECRETARY' | 'TREASURER' | 'MEDIA' | 'MEMBER'

export interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: SignUpData) => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

export interface SignUpData {
  firstName: string
  lastName: string
  phone?: string
  userType: UserType
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignUpFormData extends LoginFormData {
  firstName: string
  lastName: string
  phone?: string
  userType: UserType
  confirmPassword: string
}
