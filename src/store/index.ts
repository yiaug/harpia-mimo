import { create } from 'zustand'
import type { User, Book, Post, Community } from '@/types'

interface AppState {
  user: User | null
  setUser: (user: User | null) => void

  books: Book[]
  setBooks: (books: Book[]) => void

  posts: Post[]
  setPosts: (posts: Post[]) => void

  communities: Community[]
  setCommunities: (communities: Community[]) => void

  sidebarOpen: boolean
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  books: [],
  setBooks: (books) => set({ books }),

  posts: [],
  setPosts: (posts) => set({ posts }),

  communities: [],
  setCommunities: (communities) => set({ communities }),

  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
