import { useEffect, useMemo, useRef } from 'react';

import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowUpRight, Search, X } from 'lucide-react';

import {
  type BlogPost,
  ensureLoaded,
  formatDate,
  getAllTags,
  getFeaturedPost,
  getVisiblePosts,
  searchPosts,
} from '@/lib/blog';

import {
  BlogHeader,
  BlogShell,
  PrivateMark,
  Tag,
  useBlogStore,
  useSession,
} from '@/components/blog-ui';

interface BlogSearch {
  q?: string;
  tag?: string;
}
export const Route = createFileRoute('/blog/')({
  loader: () => ensureLoaded(),
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    q: typeof search['q'] === 'string' && search['q'] ? search['q'] : undefined,
    tag: typeof search['tag'] === 'string' && search['tag'] ? search['tag'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Blog — notes on books, research and code' },
      {
        name: 'description',
        content:
          'A personal notebook: reading notes, essays on research and teaching, and occasional writing about technology.',
      },
      { property: 'og:title', content: 'Blog — notes on books, research and code' },
      {
        property: 'og:description',
        content: 'Reading notes, essays, and writing about research, teaching and technology.',
      },
    ],
  }),
  component: BlogIndex,
});
function BlogIndex() {
  const version = useBlogStore(); // ← Store version
  const session = useSession();
  const { q, tag } = Route.useSearch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const signedIn = Boolean(session);
  const filtering = Boolean(q || tag);

  // DEBUG LOGS
  // console.log('🔍 BLOG INDEX DEBUG:');
  // console.log('  version:', version);
  // console.log('  session:', session);
  // console.log('  signedIn:', signedIn);

  const tags = useMemo(() => {
    const result = getAllTags(signedIn);
    // console.log('  tags:', result);
    return result;
  }, [signedIn, version]); // ← ADD version

  const results = useMemo(() => {
    const result = searchPosts({
      query: q,
      tags: tag ? [tag] : [],
      includePrivate: signedIn,
    });
    // console.log('  results count:', result.length);
    // console.log('  results:', result.map(p => p.title));
    return result;
  }, [q, tag, signedIn, version]); // ← ADD version

  const featured = useMemo(() => {
    const result = getFeaturedPost(signedIn);
    // console.log('  featured:', result?.title);
    return result;
  }, [signedIn, version]); // ← ADD version

  const total = useMemo(() => {
    const result = getVisiblePosts(signedIn).length;
    // console.log('  total:', result);
    return result;
  }, [signedIn, version]); // ← ADD version

  // ... rest of your component stays the same
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const setSearch = (next: BlogSearch) =>
    navigate({ to: '/blog', search: { q, tag, ...next }, replace: true });
  const timeline = filtering ? results : results.filter((p) => p.id !== featured?.id);
  const recent = timeline.slice(0, 5);
  const older = timeline.slice(5);
  return (
    <BlogShell>
      <BlogHeader />
      <main className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {/* Identity + intro */}
        <section className="pt-14 sm:pt-20">
          <p className="text-[11px] tracking-[0.22em] text-[var(--blog-faint)] uppercase">
            Kalpana Thakre · writing
          </p>
          <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.08] font-medium tracking-[-0.03em] text-[var(--blog-text)] sm:text-[3.1rem]">
            Notes, mostly unfinished.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--blog-soft)]">
            Books I'm reading, research I'm thinking about, and the occasional essay on teaching,
            machine learning and the parts of the work nobody writes papers about.
          </p>
          <p
            className="mt-3 text-[13px] text-[var(--blog-faint)]"
            suppressHydrationWarning
          >
            {total} {total === 1 ? 'post' : 'posts'} ·{' '}
            <Link
              to="/"
              className="underline underline-offset-4 hover:text-[var(--blog-accent)]"
            >
              back to portfolio
            </Link>
          </p>
        </section>
        {/* Search + tags */}
        <section className="mt-10 border-y border-[var(--blog-border)] py-4">
          <div className="flex items-center gap-3">
            <Search className="size-4 shrink-0 text-[var(--blog-faint)]" />
            <input
              ref={inputRef}
              value={q ?? ''}
              onChange={(e) => setSearch({ q: e.target.value || undefined })}
              placeholder="Search posts…"
              className="w-full bg-transparent text-[15px] text-[var(--blog-text)] outline-none placeholder:text-[var(--blog-faint)]"
            />
            {q ? (
              <button
                type="button"
                onClick={() => setSearch({ q: undefined })}
                aria-label="Clear search"
                className="text-[var(--blog-faint)] transition-colors hover:text-[var(--blog-text)]"
              >
                <X className="size-4" />
              </button>
            ) : (
              <kbd className="hidden shrink-0 rounded border border-[var(--blog-border)] px-1.5 py-0.5 text-[10px] text-[var(--blog-faint)] sm:block">
                ⌘K
              </kbd>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <Tag
                key={t}
                tag={t}
                active={tag === t}
                onClick={() => setSearch({ tag: tag === t ? undefined : t })}
              />
            ))}
          </div>
        </section>
        {/* Active filters */}
        {filtering && (
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--blog-soft)]">
            <span>
              {results.length} {results.length === 1 ? 'result' : 'results'}
              {q && (
                <>
                  {' '}
                  for <span className="text-[var(--blog-text)]">“{q}”</span>
                </>
              )}
              {tag && (
                <>
                  {' '}
                  in <span className="text-[var(--blog-accent)]">#{tag}</span>
                </>
              )}
            </span>
            <button
              type="button"
              onClick={() =>
                navigate({ to: '/blog', search: { q: undefined, tag: undefined }, replace: true })
              }
              className="text-[var(--blog-faint)] underline underline-offset-4 transition-colors hover:text-[var(--blog-text)]"
            >
              clear filters
            </button>
          </div>
        )}
        {/* Featured */}
        {!filtering && featured && (
          <section className="mt-12">
            <p className="text-[11px] tracking-[0.2em] text-[var(--blog-faint)] uppercase">
              {featured.featured ? 'Featured' : 'Latest'}
            </p>
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group mt-4 block"
            >
              <h2 className="font-serif text-[1.75rem] leading-tight font-medium tracking-[-0.02em] text-[var(--blog-text)] transition-colors group-hover:text-[var(--blog-accent)] sm:text-[2rem]">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--blog-soft)]">
                {featured.excerpt}
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-[var(--blog-faint)]">
                <span>{formatDate(featured.publishedAt)}</span>
                <span>·</span>
                <span>{featured.readingTime} min read</span>
                <span className="inline-flex items-center gap-1 text-[var(--blog-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                  read <ArrowUpRight className="size-3.5" />
                </span>
              </p>
            </Link>
          </section>
        )}
        {/* Timeline */}
        {results.length === 0 ? (
          <section className="mt-16 border-t border-[var(--blog-border)] pt-12 text-center">
            <p className="font-serif text-xl text-[var(--blog-text)]">Nothing here.</p>
            <p className="mt-2 text-[14px] text-[var(--blog-soft)]">
              No posts match those filters.
            </p>
            <button
              type="button"
              onClick={() =>
                navigate({ to: '/blog', search: { q: undefined, tag: undefined }, replace: true })
              }
              className="mt-4 text-[13px] text-[var(--blog-accent)] underline underline-offset-4"
            >
              clear filters
            </button>
          </section>
        ) : (
          <>
            <PostList
              label={filtering ? 'Results' : 'Recent'}
              posts={recent}
              signedIn={signedIn}
              activeTag={tag}
            />
            {older.length > 0 && (
              <PostList
                label="Earlier"
                posts={older}
                signedIn={signedIn}
                activeTag={tag}
              />
            )}
          </>
        )}
        <footer className="mt-24 border-t border-[var(--blog-border)] pt-6 text-[12px] text-[var(--blog-faint)]">
          <p>
            © {new Date().getFullYear()} Kalpana Thakre ·{' '}
            <Link
              to="/"
              className="underline underline-offset-4 hover:text-[var(--blog-text)]"
            >
              portfolio
            </Link>
          </p>
        </footer>
      </main>
    </BlogShell>
  );
}
function PostList({
  label,
  posts,
  signedIn,
  activeTag,
}: {
  label: string;
  posts: BlogPost[];
  signedIn: boolean;
  activeTag?: string;
}) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-14">
      <p className="text-[11px] tracking-[0.2em] text-[var(--blog-faint)] uppercase">{label}</p>
      <ul className="mt-2 divide-y divide-[var(--blog-border)]">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group -mx-3 block rounded-lg px-3 py-6 transition-colors hover:bg-[var(--blog-raised)]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[12.5px] text-[var(--blog-faint)] tabular-nums">
                  {formatDate(post.publishedAt)}
                </span>
                {signedIn && post.visibility === 'private' && <PrivateMark />}
              </div>
              <h3 className="mt-1.5 flex items-start gap-1.5 font-serif text-[1.3rem] leading-snug font-medium tracking-[-0.015em] text-[var(--blog-text)] transition-colors group-hover:text-[var(--blog-accent)]">
                <span>{post.title}</span>
                <ArrowUpRight className="mt-1.5 size-4 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-[var(--blog-soft)]">
                {post.excerpt}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[var(--blog-faint)]">
                <span>{post.readingTime} min</span>
                <span>·</span>
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className={
                      activeTag === t ? 'text-[var(--blog-accent)]' : 'text-[var(--blog-faint)]'
                    }
                  >
                    #{t}
                  </span>
                ))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
