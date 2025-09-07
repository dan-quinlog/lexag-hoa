export const HOA_NAME = 'Lexington Commons HOA'

export const ROUTES = {
  HOME: '/',
  AMENITIES: '/amenities',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 50,
} as const

export const AUDIENCE_TYPES = {
  PUBLIC: 'PUBLIC',
  RESIDENTS: 'RESIDENTS', 
  OWNERS: 'OWNERS',
  BOARD: 'BOARD',
} as const

export const USER_TYPES = {
  RESIDENT: 'RESIDENT',
  OWNER: 'OWNER', 
  BOARD: 'BOARD',
} as const

export const BOARD_ROLES = {
  PRESIDENT: 'PRESIDENT',
  SECRETARY: 'SECRETARY',
  TREASURER: 'TREASURER',
  MEDIA: 'MEDIA',
  MEMBER: 'MEMBER',
} as const
