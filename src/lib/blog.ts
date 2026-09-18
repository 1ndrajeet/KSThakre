/**
 * src/lib/blog.ts
 *
 * The single data abstraction for the blog.
 *
 *   BLOG UI  ->  blog.ts  ->  Lovable Cloud (Postgres + Auth)
 *
 * The exported API keeps the same synchronous shape the UI already uses: an
 * in-memory cache is filled from the database and every mutation writes to the
 * database first, then refreshes the cache and notifies subscribers.
 */
import { supabase } from '@/integrations/supabase/client';

export type Visibility = 'public' | 'private';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  visibility: Visibility;
  featured?: boolean;
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  coverImage?: string;
  author: { name: string; email?: string };
}

export interface PostInput {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  visibility: Visibility;
  featured?: boolean;
  publishedAt: string;
  coverImage?: string;
}

interface PostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[] | null;
  visibility: Visibility;
  featured: boolean | null;
  published_at: string;
  updated_at: string | null;
  reading_time: number | null;
  cover_image: string | null;
  author_name: string;
  author_email: string | null;
}

/* ------------------------------------------------------------------ */
/* Store — cached rows from the database                               */
/* ------------------------------------------------------------------ */

let store: BlogPost[] = [];
const listeners = new Set<() => void>();

/** Subscribe to store changes (used by useSyncExternalStore in the routes). */
export function subscribe(listener: () => void) {
  listeners.add(listener);
  void ensureLoaded();
  return () => {
    listeners.delete(listener);
  };
}

let version = 0;
export function getVersion() {
  return version;
}

function commit() {
  version += 1;
  listeners.forEach((l) => l());
}

function mapRow(row: PostRow): BlogPost {
  const post: BlogPost = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags ?? [],
    visibility: row.visibility,
    featured: row.featured ?? false,
    publishedAt: row.published_at,
    readingTime: row.reading_time ?? calculateReadingTime(row.content),
    author: { name: row.author_name },
  };
  if (row.updated_at) post.updatedAt = row.updated_at;
  if (row.cover_image) post.coverImage = row.cover_image;
  if (row.author_email) post.author.email = row.author_email;
  return post;
}

function mapInput(input: PostInput, slug: string, authorName: string) {
  return {
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    content: input.content,
    tags: input.tags,
    visibility: input.visibility,
    featured: Boolean(input.featured),
    published_at: new Date(input.publishedAt).toISOString(),
    reading_time: calculateReadingTime(input.content),
    cover_image: input.coverImage || null,
    author_name: authorName,
  };
}

let loadedAt = 0;
let inFlight: Promise<void> | null = null;

/** Fetch every post the current viewer may read into the cache. */
export async function refresh(): Promise<void> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) {
    console.error('[blog] failed to load posts', error.message);
    return;
  }
  store = ((data ?? []) as PostRow[]).map(mapRow);
  loadedAt = Date.now();
  commit();
}

/** Load once (or when stale). Safe to call from anywhere, including loaders. */
export function ensureLoaded(maxAgeMs = 30_000): Promise<void> {
  if (loadedAt && Date.now() - loadedAt < maxAgeMs) return Promise.resolve();
  if (!inFlight) {
    inFlight = refresh().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function byDateDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/* ------------------------------------------------------------------ */
/* Authentication — Lovable Cloud auth                                 */
/* ------------------------------------------------------------------ */

export const AUTH_KEY = 'blog-session';

export interface Session {
  email: string;
  name: string;
  id?: string;
}

let session: Session | null = null;
let sessionLoaded = false;
let authWired = false;

function nameFor(email: string | undefined, meta: Record<string, unknown> | undefined): string {
  const metaName = typeof meta?.['name'] === 'string' ? (meta['name'] as string) : '';
  return metaName || email?.split('@')[0] || 'Admin';
}

function persist(next: Session | null) {
  session = next;
  sessionLoaded = true;
  if (typeof window === 'undefined') return;
  if (next) window.localStorage.setItem(AUTH_KEY, JSON.stringify(next));
  else window.localStorage.removeItem(AUTH_KEY);
}

function loadSession() {
  if (sessionLoaded || typeof window === 'undefined') return;
  sessionLoaded = true;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (raw) session = JSON.parse(raw) as Session;
  } catch {
    session = null;
  }
  wireAuth();
}

/** Keeps the mirrored session in sync with the real auth session. */
function wireAuth() {
  if (authWired || typeof window === 'undefined') return;
  authWired = true;

  void supabase.auth.getSession().then(({ data }) => {
    const user = data.session?.user;
    const next: Session | null = user
      ? { email: user.email ?? '', name: nameFor(user.email, user.user_metadata), id: user.id }
      : null;
    const changed = JSON.stringify(next) !== JSON.stringify(session);
    persist(next);
    if (changed) {
      void refresh();
      commit();
    }
  });

  supabase.auth.onAuthStateChange((event, authSession) => {
    if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
      const user = authSession?.user;
      if (!user) return;
      persist({
        email: user.email ?? '',
        name: nameFor(user.email, user.user_metadata),
        id: user.id,
      });
      void refresh();
      commit();
    } else if (event === 'SIGNED_OUT') {
      persist(null);
      void refresh();
      commit();
    }
  });
}

export function getSession(): Session | null {
  loadSession();
  return session;
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export async function login(email: string, password: string): Promise<Session> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error || !data.user) {
    throw new Error(error?.message ?? "Those credentials don't match.");
  }
  const next: Session = {
    email: data.user.email ?? email.trim(),
    name: nameFor(data.user.email, data.user.user_metadata),
    id: data.user.id,
  };
  persist(next);
  wireAuth();
  await refresh();
  commit();
  return next;
}

export function logout() {
  persist(null);
  void supabase.auth.signOut().then(() => refresh());
  commit();
}

/* ------------------------------------------------------------------ */
/* Reads                                                               */
/* ------------------------------------------------------------------ */

/** Every post the viewer is allowed to see (private ones only when signed in). */
export function getPosts(): BlogPost[] {
  return [...store].sort(byDateDesc);
}

/** Public posts only — safe for logged-out surfaces. */
export function getPublicPosts(): BlogPost[] {
  return getPosts().filter((p) => p.visibility === 'public');
}

/** Posts visible to the current viewer. */
export function getVisiblePosts(includePrivate = isAuthenticated()): BlogPost[] {
  // Force reload if store is empty
  if (store.length === 0) {
    ensureLoaded();
  }
  return includePrivate ? getPosts() : getPublicPosts();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return store.find((p) => p.slug === slug);
}

export function getPostById(id: string): BlogPost | undefined {
  return store.find((p) => p.id === id);
}

export function getAllTags(includePrivate = isAuthenticated()): string[] {
  const tags = new Set<string>();
  getVisiblePosts(includePrivate).forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getPostCounts() {
  const all = store.length;
  const publicCount = store.filter((p) => p.visibility === 'public').length;
  return { total: all, public: publicCount, private: all - publicCount };
}

export interface SearchOptions {
  query?: string;
  tags?: string[];
  includePrivate?: boolean;
  visibility?: Visibility | 'all';
}

/** Ranked search: title > tags > excerpt > content. */
export function searchPosts(options: SearchOptions = {}): BlogPost[] {
  const { query, tags, visibility = 'all' } = options;
  let results = getVisiblePosts(options.includePrivate);
  if (visibility !== 'all') results = results.filter((p) => p.visibility === visibility);
  if (tags?.length) results = results.filter((p) => tags.every((t) => p.tags.includes(t)));
  const q = query?.trim().toLowerCase();
  if (!q) return results;
  const scored = results
    .map((post) => {
      let score = 0;
      if (post.title.toLowerCase().includes(q)) score += 100;
      if (post.tags.some((t) => t.toLowerCase().includes(q))) score += 50;
      if (post.excerpt.toLowerCase().includes(q)) score += 20;
      if (post.content.toLowerCase().includes(q)) score += 5;
      if (post.author.name.toLowerCase().includes(q)) score += 5;
      return { post, score };
    })
    .filter((r) => r.score > 0);
  return scored.sort((a, b) => b.score - a.score || byDateDesc(a.post, b.post)).map((r) => r.post);
}

/** Featured post if one is flagged and visible, otherwise the latest. */
export function getFeaturedPost(includePrivate = isAuthenticated()): BlogPost | undefined {
  const visible = getVisiblePosts(includePrivate);
  return visible.find((p) => p.featured) ?? visible[0];
}

/** Adjacent posts in the visible timeline, for prev/next navigation. */
export function getAdjacentPosts(slug: string, includePrivate = isAuthenticated()) {
  const visible = getVisiblePosts(includePrivate);
  const index = visible.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    // "previous" = older, "next" = newer
    previous: visible[index + 1],
    next: visible[index - 1],
  };
}

/* ------------------------------------------------------------------ */
/* Writes                                                              */
/* ------------------------------------------------------------------ */

function uniqueSlug(title: string, ignoreId?: string): string {
  const base = slugify(title) || 'untitled';
  let slug = base;
  let n = 2;
  while (store.some((p) => p.slug === slug && p.id !== ignoreId)) slug = `${base}-${n++}`;
  return slug;
}

async function clearFeatured(exceptId?: string) {
  const others = store.filter((p) => p.featured && p.id !== exceptId).map((p) => p.id);
  if (!others.length) return;
  await supabase.from('posts').update({ featured: false }).in('id', others);
}

export async function createPost(input: PostInput): Promise<BlogPost> {
  const current = getSession();
  if (!current) throw new Error('Not authenticated');

  const payload = mapInput(input, uniqueSlug(input.title), current.name || 'Kalpana Thakre');
  const { data, error } = await supabase.from('posts').insert(payload).select().single();
  if (error) throw new Error(error.message);
  if (payload.featured) await clearFeatured((data as PostRow).id);
  await refresh();
  return mapRow(data as PostRow);
}

export async function updatePost(id: string, input: PostInput): Promise<BlogPost | undefined> {
  const current = getSession();
  if (!current) throw new Error('Not authenticated');

  const existing = getPostById(id);
  const payload = {
    ...mapInput(input, uniqueSlug(input.title, id), existing?.author.name ?? current.name),
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from('posts')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  if (payload.featured) await clearFeatured(id);
  await refresh();
  return data ? mapRow(data as PostRow) : undefined;
}

export async function deletePost(id: string): Promise<boolean> {
  const current = getSession();
  if (!current) throw new Error('Not authenticated');

  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
  await refresh();
  return true;
}

export const DEMO_CREDENTIALS = { email: 'admin@blog.local', password: 'letmewrite' };
