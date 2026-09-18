import { useEffect, useMemo, useState } from 'react';

import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';

import {
  type BlogPost,
  createPost,
  deletePost,
  ensureLoaded,
  formatDate,
  getAllTags,
  getPostById,
  getPostCounts,
  getPosts,
  isAuthenticated,
  logout,
  type PostInput,
  updatePost,
  type Visibility,
} from '@/lib/blog';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  BlogShell,
  LoginDialog,
  Markdown,
  PrivateMark,
  ThemeToggle,
  useBlogStore,
  useSession,
} from '@/components/blog-ui';

interface AdminSearch {
  view?: 'list' | 'editor';
  edit?: string;
}
export const Route = createFileRoute('/admin')({
  loader: () => ensureLoaded(),
  validateSearch: (search: Record<string, unknown>): AdminSearch => ({
    view: search['view'] === 'editor' ? 'editor' : 'list',
    edit: typeof search['edit'] === 'string' && search['edit'] ? search['edit'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Admin — writing room' },
      { name: 'description', content: 'Write, edit and publish blog posts.' },
      { name: 'robots', content: 'noindex' },
      { property: 'og:title', content: 'Admin — writing room' },
      { property: 'og:description', content: 'Write, edit and publish blog posts.' },
    ],
  }),
  component: AdminPage,
});
const EMPTY_FORM: PostInput & { id?: string } = {
  title: '',
  excerpt: '',
  content: '',
  tags: [],
  visibility: 'public',
  featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  coverImage: '',
};
function AdminPage() {
  useBlogStore();
  const session = useSession();
  const [checked, setChecked] = useState(false);
  // Route-level guard: the route itself verifies the session, not just the UI.
  useEffect(() => {
    const t = setTimeout(() => setChecked(true), 0);
    return () => clearTimeout(t);
  }, []);
  if (!session) {
    return (
      <BlogShell>
        <LockedOut ready={checked} />
      </BlogShell>
    );
  }
  return (
    <BlogShell>
      <AdminWorkspace />
    </BlogShell>
  );
}
function LockedOut({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (ready) setOpen(true);
  }, [ready]);
  return (
    <main className="mx-auto max-w-md px-5 py-32 text-center sm:px-8">
      <h1 className="font-serif text-2xl font-medium tracking-tight text-[var(--blog-text)]">
        Sign in to write
      </h1>
      <p className="mt-3 text-[15px] text-[var(--blog-soft)]">The writing room is private.</p>
      <div className="mt-6 flex justify-center gap-4 text-[13px]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[var(--blog-accent)] underline underline-offset-4"
        >
          sign in
        </button>
        <Link
          to="/blog"
          search={{ q: undefined, tag: undefined }}
          className="text-[var(--blog-faint)] underline underline-offset-4 hover:text-[var(--blog-text)]"
        >
          back to blog
        </Link>
      </div>
      <LoginDialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          // Only bounce out if the visitor closed the dialog without signing in.
          if (!v && !isAuthenticated()) {
            navigate({ to: '/blog', search: { q: undefined, tag: undefined } });
          }
        }}
      />
    </main>
  );
}
function AdminWorkspace() {
  const { view, edit } = Route.useSearch();
  const navigate = useNavigate({ from: '/admin' });
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--blog-border)] bg-[var(--blog-bg)]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[15px] font-medium tracking-tight text-[var(--blog-text)]">
              Admin
            </span>
            <Link
              to="/blog"
              search={{ q: undefined, tag: undefined }}
              className="text-[13px] text-[var(--blog-faint)] transition-colors hover:text-[var(--blog-text)]"
            >
              view blog
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => {
                logout();
                navigate({ to: '/blog', search: { q: undefined, tag: undefined } });
              }}
              className="rounded-full px-2.5 py-1 text-[13px] text-[var(--blog-faint)] transition-colors hover:text-[var(--blog-text)]"
            >
              log out
            </button>
          </div>
        </div>
      </header>
      {view === 'editor' ? <Editor editId={edit} /> : <PostManager />}
    </>
  );
}
/* ------------------------------------------------------------------ */
/* Post list                                                           */
/* ------------------------------------------------------------------ */
function PostManager() {
  useBlogStore();
  const [query, setQuery] = useState('');
  const [visibility, setVisibility] = useState<Visibility | 'all'>('all');
  const [tag, setTag] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null);
  const counts = getPostCounts();
  const tags = useMemo(() => getAllTags(true), []);
  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return getPosts().filter((p) => {
      if (visibility !== 'all' && p.visibility !== visibility) return false;
      if (tag && !p.tags.includes(tag)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, visibility, tag]);
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <section className="flex flex-wrap items-end justify-between gap-4 pt-12">
        <div>
          <h1 className="font-serif text-[2rem] font-medium tracking-[-0.02em] text-[var(--blog-text)]">
            Writing room
          </h1>
          <p className="mt-2 text-[13.5px] text-[var(--blog-soft)]">
            {counts.total} posts · {counts.public} public · {counts.private} private
          </p>
        </div>
        <Link
          to="/admin"
          search={{ view: 'editor', edit: undefined }}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--blog-accent)] px-4 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" /> New post
        </Link>
      </section>
      <section className="mt-8 flex flex-wrap items-center gap-3 border-y border-[var(--blog-border)] py-3">
        <div className="flex min-w-[200px] flex-1 items-center gap-2">
          <Search className="size-4 text-[var(--blog-faint)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter posts…"
            className="w-full bg-transparent text-[14px] text-[var(--blog-text)] outline-none placeholder:text-[var(--blog-faint)]"
          />
        </div>
        <div className="flex gap-1">
          {(['all', 'public', 'private'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVisibility(v)}
              className={`rounded-full px-3 py-1 text-[12.5px] transition-colors ${
                visibility === v
                  ? 'bg-[var(--blog-accent-soft)] text-[var(--blog-accent)]'
                  : 'text-[var(--blog-faint)] hover:text-[var(--blog-text)]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </section>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(tag === t ? null : t)}
            className={`rounded-full border px-2.5 py-[3px] text-[12px] transition-colors ${
              tag === t
                ? 'border-transparent bg-[var(--blog-accent-soft)] text-[var(--blog-accent)]'
                : 'border-[var(--blog-border)] text-[var(--blog-soft)] hover:border-[var(--blog-accent)]/50'
            }`}
          >
            #{t}
          </button>
        ))}
      </div>
      <ul className="mt-6 divide-y divide-[var(--blog-border)] border-t border-[var(--blog-border)]">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-wrap items-start justify-between gap-4 py-4 transition-colors hover:bg-[var(--blog-raised)]"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-[16.5px] font-medium text-[var(--blog-text)]">
                  {post.title}
                </h2>
                {post.featured && (
                  <span className="rounded-full bg-[var(--blog-accent-soft)] px-2 py-[1px] text-[10.5px] tracking-wide text-[var(--blog-accent)] uppercase">
                    featured
                  </span>
                )}
                {post.visibility === 'private' && <PrivateMark />}
              </div>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[var(--blog-faint)]">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readingTime} min</span>
                <span>·</span>
                {post.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                aria-label="View post"
                className="grid size-8 place-items-center rounded-full text-[var(--blog-faint)] transition-colors hover:bg-[var(--blog-bg)] hover:text-[var(--blog-text)]"
              >
                <Eye className="size-4" />
              </Link>
              <Link
                to="/admin"
                search={{ view: 'editor', edit: post.id }}
                aria-label="Edit post"
                className="grid size-8 place-items-center rounded-full text-[var(--blog-faint)] transition-colors hover:bg-[var(--blog-bg)] hover:text-[var(--blog-text)]"
              >
                <Pencil className="size-4" />
              </Link>
              <button
                type="button"
                aria-label="Delete post"
                onClick={() => setPendingDelete(post)}
                className="grid size-8 place-items-center rounded-full text-[var(--blog-faint)] transition-colors hover:bg-[var(--blog-bg)] hover:text-red-500"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="py-12 text-center text-[14px] text-[var(--blog-soft)]">
            No posts match those filters.
          </li>
        )}
      </ul>
      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(o) => !o && setPendingDelete(null)}
      >
        <AlertDialogContent className="blog-scope border-[var(--blog-border)] bg-[var(--blog-bg)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-[var(--blog-text)]">
              Delete “{pendingDelete?.title}”?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[var(--blog-soft)]">
              This removes the post for the current session. It can't be undone here.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[var(--blog-border)] bg-transparent text-[var(--blog-text)]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDelete) void deletePost(pendingDelete.id).catch(console.error);
                setPendingDelete(null);
              }}
              className="bg-red-600 text-white hover:bg-red-600/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
/* ------------------------------------------------------------------ */
/* Editor                                                              */
/* ------------------------------------------------------------------ */
function Editor({ editId }: { editId?: string }) {
  const navigate = useNavigate({ from: '/admin' });
  const existing = editId ? getPostById(editId) : undefined;
  const [form, setForm] = useState<PostInput>(() =>
    existing
      ? {
          title: existing.title,
          excerpt: existing.excerpt,
          content: existing.content,
          tags: existing.tags,
          visibility: existing.visibility,
          featured: Boolean(existing.featured),
          publishedAt: existing.publishedAt.slice(0, 10),
          coverImage: existing.coverImage ?? '',
        }
      : { ...EMPTY_FORM },
  );
  const [tagInput, setTagInput] = useState(existing ? existing.tags.join(', ') : '');
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof PostInput>(key: K, value: PostInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));
  const save = async () => {
    if (!form.title.trim()) return setError('A title is required.');
    if (!form.content.trim()) return setError('The post has no content.');
    const tags = tagInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);
    const payload: PostInput = {
      ...form,
      tags,
      excerpt: form.excerpt.trim() || `${form.content.trim().slice(0, 140)}…`,
    };
    try {
      if (existing) await updatePost(existing.id, payload);
      else await createPost(payload);
    } catch (err) {
      return setError(err instanceof Error ? err.message : 'Could not save the post.');
    }
    navigate({ search: { view: 'list', edit: undefined } });
    return undefined;
  };
  const inputClass =
    'h-10 rounded-lg border-[var(--blog-border)] bg-[var(--blog-raised)] text-[var(--blog-text)] placeholder:text-[var(--blog-faint)]';
  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pt-10">
        <Link
          to="/admin"
          search={{ view: 'list', edit: undefined }}
          className="inline-flex items-center gap-1.5 text-[13px] text-[var(--blog-faint)] transition-colors hover:text-[var(--blog-text)]"
        >
          <ArrowLeft className="size-3.5" /> all posts
        </Link>
        <div className="flex items-center gap-3">
          {error && <span className="text-[13px] text-red-500">{error}</span>}
          <Button
            onClick={() => void save()}
            className="h-9 rounded-full bg-[var(--blog-accent)] px-4 text-[13.5px] text-white hover:bg-[var(--blog-accent)]/90"
          >
            {existing ? 'Save changes' : 'Publish'}
          </Button>
        </div>
      </div>
      <h1 className="mt-6 font-serif text-[1.75rem] font-medium tracking-[-0.02em] text-[var(--blog-text)]">
        {existing ? 'Edit post' : 'New post'}
      </h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Editor */}
        <div className="space-y-4">
          <Field label="Title">
            <Input
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="An honest title"
              className={inputClass}
            />
          </Field>
          <Field label="Excerpt">
            <Textarea
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="One or two sentences."
              rows={2}
              className="rounded-lg border-[var(--blog-border)] bg-[var(--blog-raised)] text-[var(--blog-text)] placeholder:text-[var(--blog-faint)]"
            />
          </Field>
          <Field label="Content (Markdown)">
            <Textarea
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              placeholder={'## A heading\n\nWrite in Markdown.'}
              rows={20}
              className="rounded-lg border-[var(--blog-border)] bg-[var(--blog-raised)] font-mono text-[13.5px] leading-relaxed text-[var(--blog-text)] placeholder:text-[var(--blog-faint)]"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tags (comma separated)">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="books, thoughts"
                className={inputClass}
              />
            </Field>
            <Field label="Published date">
              <Input
                type="date"
                value={form.publishedAt}
                onChange={(e) => set('publishedAt', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Cover image URL (optional)">
            <Input
              value={form.coverImage ?? ''}
              onChange={(e) => set('coverImage', e.target.value)}
              placeholder="https://…"
              className={inputClass}
            />
          </Field>
          <div className="flex flex-wrap items-center gap-6 pt-1">
            <div className="flex items-center gap-1">
              {(['public', 'private'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set('visibility', v)}
                  className={`rounded-full px-3 py-1 text-[12.5px] transition-colors ${
                    form.visibility === v
                      ? 'bg-[var(--blog-accent-soft)] text-[var(--blog-accent)]'
                      : 'text-[var(--blog-faint)] hover:text-[var(--blog-text)]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[var(--blog-soft)]">
              <input
                type="checkbox"
                checked={Boolean(form.featured)}
                onChange={(e) => set('featured', e.target.checked)}
                className="size-3.5 accent-[var(--blog-accent)]"
              />
              Featured
            </label>
          </div>
        </div>
        {/* Preview — same renderer as the public article */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <p className="text-[11px] tracking-[0.2em] text-[var(--blog-faint)] uppercase">Preview</p>
          <div className="mt-4 rounded-lg border border-[var(--blog-border)] p-5 lg:max-h-[75vh] lg:overflow-y-auto">
            <h2 className="font-serif text-[1.6rem] leading-tight font-medium tracking-[-0.02em] text-[var(--blog-text)]">
              {form.title || 'Untitled'}
            </h2>
            {form.excerpt && (
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--blog-soft)]">
                {form.excerpt}
              </p>
            )}
            <hr className="my-5 border-[var(--blog-border)]" />
            {form.content ? (
              <Markdown content={form.content} />
            ) : (
              <p className="text-[14px] text-[var(--blog-faint)]">Nothing to preview yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] tracking-[0.16em] text-[var(--blog-faint)] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
