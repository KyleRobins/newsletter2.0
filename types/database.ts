export type User = {
  id: string
  email: string
  full_name?: string
  tech_track?: string
  created_at: string
}

export interface Newsletter {
  id: string
  title: string
  content: string
  tech_track: string
  published_at: string
  created_at: string
}

export interface ABTest {
  id: string
  name: string
  variant_a: {
    subject: string
    content: string
  }
  variant_b: {
    subject: string
    content: string
  }
  status: 'draft' | 'running' | 'completed'
  winner?: 'a' | 'b'
  created_at: string
}

export interface TestResult {
  id: string
  test_id: string
  variant: 'a' | 'b'
  opens: number
  clicks: number
  conversions: number
  created_at: string
}

export type Article = {
  id: string
  title: string
  content: string
  tech_track: string
  author_id: string
  published: boolean
  created_at: string
}

export type Subscription = {
  id: string
  user_id: string
  tech_track: string
  created_at: string
}