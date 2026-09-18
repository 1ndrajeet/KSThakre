# Kalpana's Chronicle

# Complete Project Context for Lovable

## Project Overview

This is a **dual-purpose personal website** combining:

1. **Academic Portfolio** - Dr. Kalpana Sunil Thakre's professional profile
2. **Blog System** - Personal blog with admin panel for writing/publishing

## Current Architecture

- **Framework**: TanStack React Router with file-based routing
- **State Management**: Custom store with `useSyncExternalStore`
- **Data Storage**: JSON files (in-memory with localStorage for auth)
- **Styling**: Tailwind CSS with custom design tokens
- **Authentication**: Simple mock auth with localStorage

## Files to Keep (Unchanged)

```
src/lib/portfolio-data.ts          # Static portfolio data (DO NOT CHANGE)
src/lib/utils.ts                   # Utility functions
src/styles.css                     # Global styles
src/components/portfolio-page.tsx  # Portfolio UI component
public/profile.png                 # Profile image
```

## Files to Convert to Supabase

```
src/lib/blog.ts                    # Blog data layer → Supabase
src/lib/blog-data.json             # Blog posts → Supabase table
src/components/blog-ui.tsx         # Blog UI components (auth integration)
src/routes/admin.tsx               # Admin panel
src/routes/blog.$slug.tsx          # Individual post page
src/routes/blog.index.tsx          # Blog listing page
src/routes/__root.tsx              # Root layout
src/routes/index.tsx               # Homepage (portfolio)
src/routes/v2.tsx                  # Alternative portfolio route
```

---

## Supabase Setup Guide

### 1. Database Schema (Single Table)

```sql
-- One table for all blog data
CREATE TABLE posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  reading_time INTEGER DEFAULT 1,
  cover_image TEXT,
  author_name TEXT NOT NULL,
  author_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_visibility ON posts(visibility);
CREATE INDEX idx_posts_featured ON posts(featured) WHERE featured = true;
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
```

### 2. Auth Setup (One Admin User)

```sql
-- Create admin user via Supabase Auth UI or API
-- Email: admin@blog.local
-- Password: letmewrite
-- OR any email/password you prefer

-- No additional tables needed - use built-in auth.users
```

### 3. Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public read access for public posts
CREATE POLICY "Public read access for public posts"
ON posts FOR SELECT
USING (visibility = 'public');

-- Authenticated users can read all posts
CREATE POLICY "Authenticated users can read all posts"
ON posts FOR SELECT
USING (auth.role() = 'authenticated');

-- Only authenticated users can write/update/delete
CREATE POLICY "Authenticated users can manage posts"
ON posts FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- OR more specific:
CREATE POLICY "Admin can insert posts"
ON posts FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update posts"
ON posts FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete posts"
ON posts FOR DELETE
USING (auth.role() = 'authenticated');
```

---

## New Supabase-Based Implementation

### 1. Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Client Setup (src/lib/supabase.ts)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  visibility: 'public' | 'private'
  featured: boolean
  published_at: string
  updated_at: string | null
  reading_time: number
  cover_image: string | null
  author_name: string
  author_email: string | null
  created_at: string
}
```

### 3. Blog Data Layer (src/lib/blog.ts) - Supabase Version

```typescript
import { supabase, type Post } from './supabase'

export type Visibility = 'public' | 'private'
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  visibility: Visibility
  featured?: boolean
  publishedAt: string
  updatedAt?: string
  readingTime: number
  coverImage?: string
  author: { name: string; email?: string }
}

export interface PostInput {
  title: string
  excerpt: string
  content: string
  tags: string[]
  visibility: Visibility
  featured?: boolean
  publishedAt: string
  coverImage?: string
}

// Auth
const AUTH_KEY = 'blog-session'

export interface Session {
  email: string
  name: string
  id: string
}

let session: Session | null = null

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (raw) session = JSON.parse(raw)
  } catch { session = null }
  return session
}

export async function login(email: string, password: string): Promise<Session> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  if (!data.user) throw new Error('Login failed')

  const user = data.user
  const sessionData = {
    email: user.email!,
    name: user.user_metadata?.name || user.email?.split('@')[0] || 'Admin',
    id: user.id,
  }

  session = sessionData
  localStorage.setItem(AUTH_KEY, JSON.stringify(sessionData))
  return sessionData
}

export function logout() {
  session = null
  localStorage.removeItem(AUTH_KEY)
  supabase.auth.signOut()
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

// Helpers
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function mapPost(row: Post): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags,
    visibility: row.visibility,
    featured: row.featured,
    publishedAt: row.published_at,
    updatedAt: row.updated_at || undefined,
    readingTime: row.reading_time,
    coverImage: row.cover_image || undefined,
    author: {
      name: row.author_name,
      email: row.author_email || undefined
    },
  }
}

function mapInput(input: PostInput, authorName: string): Partial<Post> {
  return {
    slug: slugify(input.title),
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    content: input.content,
    tags: input.tags,
    visibility: input.visibility,
    featured: input.featured || false,
    published_at: new Date(input.publishedAt).toISOString(),
    reading_time: calculateReadingTime(input.content),
    cover_image: input.coverImage || null,
    author_name: authorName,
  }
}

// Store subscription for React (simplified - use React Query or SWR for realtime)
let listeners = new Set<() => void>()
let version = 0

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getVersion() { return version }

function notify() {
  version++
  listeners.forEach(l => l())
}

// CRUD Operations
export async function getPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data || []).map(mapPost)
}

export async function getPublicPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('visibility', 'public')
    .order('published_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data || []).map(mapPost)
}

export async function getVisiblePosts(includePrivate = isAuthenticated()): Promise<BlogPost[]> {
  if (includePrivate) {
    return getPosts()
  }
  return getPublicPosts()
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return undefined
  return data ? mapPost(data) : undefined
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return undefined
  return data ? mapPost(data) : undefined
}

export async function getAllTags(includePrivate = isAuthenticated()): Promise<string[]> {
  const posts = await getVisiblePosts(includePrivate)
  const tags = new Set<string>()
  posts.forEach(p => p.tags.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
}

export async function getPostCounts() {
  const posts = await getPosts()
  const publicCount = posts.filter(p => p.visibility === 'public').length
  return { total: posts.length, public: publicCount, private: posts.length - publicCount }
}

export async function searchPosts(options: { query?: string; tags?: string[]; includePrivate?: boolean } = {}): Promise<BlogPost[]> {
  const { query, tags, includePrivate = isAuthenticated() } = options
  let posts = await getVisiblePosts(includePrivate)

  if (tags?.length) {
    posts = posts.filter(p => tags.every(t => p.tags.includes(t)))
  }

  const q = query?.trim().toLowerCase()
  if (!q) return posts

  return posts
    .map(post => {
      let score = 0
      if (post.title.toLowerCase().includes(q)) score += 100
      if (post.tags.some(t => t.toLowerCase().includes(q))) score += 50
      if (post.excerpt.toLowerCase().includes(q)) score += 20
      if (post.content.toLowerCase().includes(q)) score += 5
      if (post.author.name.toLowerCase().includes(q)) score += 5
      return { post, score }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.post)
}

export async function getFeaturedPost(includePrivate = isAuthenticated()): Promise<BlogPost | undefined> {
  const posts = await getVisiblePosts(includePrivate)
  return posts.find(p => p.featured) ?? posts[0]
}

export async function getAdjacentPosts(slug: string, includePrivate = isAuthenticated()) {
  const posts = await getVisiblePosts(includePrivate)
  const index = posts.findIndex(p => p.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }
  return {
    previous: posts[index + 1],
    next: posts[index - 1],
  }
}

export async function createPost(input: PostInput): Promise<BlogPost> {
  const session = getSession()
  if (!session) throw new Error('Not authenticated')

  const data = mapInput(input, session.name)

  const { data: inserted, error } = await supabase
    .from('posts')
    .insert(data)
    .select()
    .single()

  if (error) throw new Error(error.message)
  notify()
  return mapPost(inserted)
}

export async function updatePost(id: string, input: PostInput): Promise<BlogPost> {
  const session = getSession()
  if (!session) throw new Error('Not authenticated')

  const data = mapInput(input, session.name)
  data.updated_at = new Date().toISOString()

  const { data: updated, error } = await supabase
    .from('posts')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  notify()
  return mapPost(updated)
}

export async function deletePost(id: string): Promise<boolean> {
  const session = getSession()
  if (!session) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  notify()
  return true
}

export const DEMO_CREDENTIALS = {
  email: import.meta.env.VITE_DEMO_EMAIL || 'admin@blog.local',
  password: import.meta.env.VITE_DEMO_PASSWORD || 'letmewrite'
}
```

### 4. Blog UI Auth Integration (src/components/blog-ui.tsx)

Update the `LoginDialog` and `useSession` to use Supabase:

```typescript
// Update useSession to be async-friendly
export function useSession(): Session | null {
  const [hydrated, setHydrated] = useState(false)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setHydrated(true)
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const s = {
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Admin',
          id: session.user.id,
        }
        localStorage.setItem('blog-session', JSON.stringify(s))
        setSession(s)
        notify()
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('blog-session')
        setSession(null)
        notify()
      }
    })

    // Load initial session
    const raw = localStorage.getItem('blog-session')
    if (raw) {
      try { setSession(JSON.parse(raw)) } catch {}
    }

    return () => subscription.unsubscribe()
  }, [])

  return hydrated ? session : null
}
```

### 5. Route Updates

**\__root.tsx**: Add Supabase provider or keep as-is since we use direct client

**admin.tsx**: Update to use async functions with React Query or
useState+useEffect

**blog.index.tsx**: Use React Query for data fetching

**blog.$slug.tsx**: Use React Query for data fetching

---

## UI/UX Context

- **Portfolio**: Dark theme with glass-morphism, warm accent (#e8a87c), serif
  typography
- **Blog**: Light/dark theme toggle with warm accent, clean typography
- **Design Tokens**: Custom CSS variables in `.blog-scope` scope to avoid
  conflicts

## Key Features to Preserve

1. **Portfolio**: All sections, stats, publications filter, glass cards
2. **Blog**: Public/private posts, featured posts, search, tags, admin panel
3. **Admin**: Create/edit/delete posts, markdown editor with preview
4. **Auth**: Login dialog, session persistence, admin-only routes

## Migration Steps

1. Set up Supabase project
2. Create `posts` table with schema above
3. Enable RLS and create policies
4. Create admin user in Supabase Auth
5. Copy existing blog posts from `blog-data.json` to Supabase
6. Replace `blog.ts` with Supabase version
7. Update components to use async data fetching
8. Test all features

---

## Complete Lovable Prompt

````
I need you to rebuild my personal portfolio and blog website using Supabase as the backend while preserving all UI and functionality exactly as shown below.

## Project Structure
The project has two main parts:
1. Academic Portfolio (static content from portfolio-data.ts)
2. Blog System with admin panel (dynamically stored in Supabase)

## Existing Files (Keep Exactly As-Is)
- src/lib/portfolio-data.ts - DO NOT MODIFY
- src/lib/utils.ts - Utility functions
- src/styles.css - Global styles
- src/components/portfolio-page.tsx - Portfolio UI
- public/profile.png - Profile image

## Files to Replace with Supabase Version
- src/lib/blog.ts - Replace with Supabase CRUD
- src/lib/blog-data.json - Migrate to Supabase
- src/components/blog-ui.tsx - Update auth to use Supabase
- src/routes/admin.tsx - Use async data with React Query
- src/routes/blog.$slug.tsx - Use React Query
- src/routes/blog.index.tsx - Use React Query
- src/routes/__root.tsx - Add Supabase client if needed

## Supabase Setup

### Table Schema (Single Table)
```sql
CREATE TABLE posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  reading_time INTEGER DEFAULT 1,
  cover_image TEXT,
  author_name TEXT NOT NULL,
  author_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
````

### RLS Policies

- Public: SELECT on public posts only
- Authenticated: Full CRUD on all posts
- Admin user created via Supabase Auth

### Environment Variables

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_DEMO_EMAIL (default: admin@blog.local)
- VITE_DEMO_PASSWORD (default: letmewrite)

## Blog API (src/lib/blog.ts)

Must export these async functions:

- getPosts(): BlogPost[]
- getPublicPosts(): BlogPost[]
- getVisiblePosts(includePrivate): BlogPost[]
- getPostBySlug(slug): BlogPost
- getPostById(id): BlogPost
- getAllTags(includePrivate): string[]
- getPostCounts(): { total, public, private }
- searchPosts({ query, tags, includePrivate }): BlogPost[]
- getFeaturedPost(includePrivate): BlogPost
- getAdjacentPosts(slug, includePrivate): { previous, next }
- createPost(input): BlogPost
- updatePost(id, input): BlogPost
- deletePost(id): boolean
- login(email, password): Session
- logout(): void
- getSession(): Session
- isAuthenticated(): boolean
- subscribe(listener): unsubscribe

## Auth Flow

1. User clicks "log in" in blog header
2. LoginDialog opens with email/password
3. Supabase auth validates credentials
4. On success, session stored in localStorage
5. UI updates to show admin links
6. Private posts become visible
7. Admin panel accessible

## Data Migration

Copy all posts from src/lib/blog-data.json into Supabase posts table. Ensure all
fields map correctly (publishedAt → published_at, etc.)

## UI Requirements

- DO NOT change any visual styling
- Keep all CSS classes, design tokens, and animations
- Preserve blog-scope to avoid conflicts with portfolio
- Maintain responsive design
- Keep glass-morphism and warm accent colors

## Technology Stack to Use

- React with TanStack Router
- Tailwind CSS
- Supabase (PostgreSQL + Auth)
- React Query for data fetching
- Keep existing UI components and structure

## Critical Constraints

1. Portfolio data stays in portfolio-data.ts (not in DB)
2. Blog posts go to Supabase
3. No UI changes whatsoever
4. One admin user with full permissions
5. All blog operations should work offline after initial load (caching)

Please rebuild this with Supabase while preserving every pixel of the existing
UI. Provide the complete implementation including all necessary files, migration
scripts, and setup instructions.

````

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kalpana-creates-worlds.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d913df1c-32ca-4b1d-8168-a586a9bd8625).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
````
