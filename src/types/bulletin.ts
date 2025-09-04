import type { User } from './auth'

export interface Bulletin {
  id: string
  title: string
  content: string
  author?: User
  audience: AudienceType
  subjectTags: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export type AudienceType = 'PUBLIC' | 'RESIDENTS' | 'OWNERS' | 'BOARD'

export interface BulletinConnection {
  items: Bulletin[]
  nextToken?: string
}

export interface BulletinFilters {
  subjectTags?: string[]
  audience?: AudienceType
}

export interface BulletinQueryVariables {
  limit?: number
  nextToken?: string
  subjectTags?: string[]
}
