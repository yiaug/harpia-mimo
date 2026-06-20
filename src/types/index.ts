export interface User {
  id: string
  email: string
  username: string
  displayName?: string
  avatarUrl?: string
  bio?: string
  role: UserRole
  status: UserStatus
  createdAt: Date
}

export type UserRole = 'visitor' | 'user' | 'verified_member' | 'moderator' | 'admin' | 'super_admin'
export type UserStatus = 'pending' | 'active' | 'suspended' | 'banned'

export interface Book {
  id: string
  title: string
  slug: string
  author?: string
  description?: string
  coverUrl?: string
  pdfUrl?: string
  year?: number
  language?: string
  pages?: number
  difficulty?: string
  ratingAvg: number
  ratingCount: number
  categories: Category[]
  tags: Tag[]
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  parentId?: string
  children?: Category[]
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Community {
  id: string
  name: string
  slug: string
  description?: string
  bannerUrl?: string
  rules?: string
  memberCount: number
  postCount: number
  createdAt: Date
}

export interface Post {
  id: string
  communityId: string
  authorId?: string
  title: string
  slug: string
  body?: string
  bodyHtml?: string
  images: string[]
  links: string[]
  status: PostStatus
  upvotes: number
  downvotes: number
  commentCount: number
  createdAt: Date
  updatedAt: Date
}

export type PostStatus = 'draft' | 'published' | 'removed' | 'flagged'

export interface Comment {
  id: string
  postId: string
  authorId?: string
  parentId?: string
  body: string
  upvotes: number
  downvotes: number
  createdAt: Date
  replies?: Comment[]
}

export interface Room {
  id: string
  name: string
  description?: string
  type: RoomType
  communityId?: string
  createdAt: Date
}

export type RoomType = 'public' | 'private'

export interface Message {
  id: string
  roomId: string
  authorId?: string
  parentId?: string
  body: string
  edited: boolean
  deleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface VoiceChannel {
  id: string
  communityId: string
  name: string
  description?: string
  maxUsers: number
  createdAt: Date
}

export interface TarotCard {
  id: string
  name: string
  arcana: 'major' | 'minor'
  suit?: string
  number?: number
  imageUrl?: string
  meaningUpright: string
  meaningReversed: string
  keywords: string[]
  description?: string
  sortOrder: number
}

export type SpreadType = 'single' | 'three_cards' | 'celtic_cross' | 'custom'

export interface TarotDraw {
  id: string
  userId: string
  spreadType: SpreadType
  cards: TarotCard[]
  notes?: string
  createdAt: Date
}

export interface AuditLog {
  id: string
  userId?: string
  action: string
  entityType?: string
  entityId?: string
  details?: Record<string, unknown>
  ipAddress?: string
  createdAt: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
