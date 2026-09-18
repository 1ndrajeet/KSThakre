import { useMemo, useState } from 'react';

import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Lock, ArrowLeft as Prev } from 'lucide-react';

import { ensureLoaded, formatDate, getAdjacentPosts, getPostBySlug } from '@/lib/blog';

import {
  BlogHeader,
  BlogShell,
  LoginDialog,
  Markdown,
  PrivateMark,
  Tag,
  useBlogStore,
  useSession,
} from '@/components/blog-ui';

export const Route = createFileRoute('/blog/$slug')({
  loader: () => ensureLoaded(),
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post || post.visibility === 'private') {
      return {
        meta: [
          { title: 'Private post — Blog' },
          { name: 'robots', content: 'noindex' },
          { name: 'description', content: 'This post is not public.' },
        ],
      };
    }
    return {
      meta: [
        { title: `${post.title} — Blog` },
        { name: 'description', content: post.excerpt },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.excerpt },
        { property: 'og:type', content: 'article' },
      ],
    };
  },
  component: PostPage,
});
function PostPage() {
  useBlogStore();
  const { slug } = Route.useParams();
  const session = useSession();
  const signedIn = Boolean(session);
  const [loginOpen, setLoginOpen] = useState(false);
  const post = useMemo(() => getPostBySlug(slug), [slug, signedIn]);
  const adjacent = useMemo(() => getAdjacentPosts(slug, signedIn), [slug, signedIn]);
  if (!post) {
    return (
      <BlogShell>
        <BlogHeader />
        <Centered
          title="Post not found"
          body="That link doesn't lead anywhere — it may have been renamed."
        />
      </BlogShell>
    );
  }
  if (post.visibility === 'private' && !signedIn) {
    return (
      <BlogShell>
        <BlogHeader />
        <main className="mx-auto max-w-xl px-5 py-32 text-center sm:px-8">
          <Lock className="mx-auto size-5 text-[var(--blog-faint)]" />
          <h1 className="mt-5 font-serif text-2xl font-medium tracking-tight text-[var(--blog-text)]">
            This one's private
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--blog-soft)]">
            A note kept for myself. Sign in if it's yours to read.
          </p>
          <div className="mt-6 flex justify-center gap-4 text-[13px]">
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
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
            open={loginOpen}
            onOpenChange={setLoginOpen}
          />
        </main>
      </BlogShell>
    );
  }
  return (
    <BlogShell>
      <BlogHeader />
      <main className="mx-auto w-full max-w-[46rem] px-5 pb-24 sm:px-8">
        <Link
          to="/blog"
          search={{ q: undefined, tag: undefined }}
          className="mt-10 inline-flex items-center gap-1.5 text-[13px] text-[var(--blog-faint)] transition-colors hover:text-[var(--blog-text)]"
        >
          <ArrowLeft className="size-3.5" /> all posts
        </Link>
        <header className="mt-8">
          <p className="flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--blog-faint)]">
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
            {post.visibility === 'private' && (
              <>
                <span>·</span>
                <PrivateMark />
              </>
            )}
          </p>
          <h1 className="mt-4 font-serif text-[2.1rem] leading-[1.12] font-medium tracking-[-0.03em] text-[var(--blog-text)] sm:text-[2.7rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--blog-soft)]">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Tag
                key={t}
                tag={t}
                asLink
              />
            ))}
          </div>
        </header>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mt-10 w-full rounded-lg border border-[var(--blog-border)] object-cover"
          />
        )}
        <hr className="my-10 border-[var(--blog-border)]" />
        <article>
          <Markdown content={post.content} />
        </article>
        <footer className="mt-16 border-t border-[var(--blog-border)] pt-6">
          <p className="text-[13px] text-[var(--blog-faint)]">
            {post.author.name}
            {post.updatedAt && <> · updated {formatDate(post.updatedAt)}</>}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Tag
                key={t}
                tag={t}
                asLink
              />
            ))}
          </div>
        </footer>
        <nav className="mt-12 grid gap-3 sm:grid-cols-2">
          {adjacent.previous ? (
            <Link
              to="/blog/$slug"
              params={{ slug: adjacent.previous.slug }}
              className="group rounded-lg border border-[var(--blog-border)] p-4 transition-colors hover:border-[var(--blog-accent)]/50"
            >
              <span className="flex items-center gap-1.5 text-[11px] tracking-[0.16em] text-[var(--blog-faint)] uppercase">
                <Prev className="size-3" /> older
              </span>
              <span className="mt-2 block font-serif text-[15px] leading-snug text-[var(--blog-text)] transition-colors group-hover:text-[var(--blog-accent)]">
                {adjacent.previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {adjacent.next && (
            <Link
              to="/blog/$slug"
              params={{ slug: adjacent.next.slug }}
              className="group rounded-lg border border-[var(--blog-border)] p-4 text-right transition-colors hover:border-[var(--blog-accent)]/50"
            >
              <span className="flex items-center justify-end gap-1.5 text-[11px] tracking-[0.16em] text-[var(--blog-faint)] uppercase">
                newer <ArrowRight className="size-3" />
              </span>
              <span className="mt-2 block font-serif text-[15px] leading-snug text-[var(--blog-text)] transition-colors group-hover:text-[var(--blog-accent)]">
                {adjacent.next.title}
              </span>
            </Link>
          )}
        </nav>
      </main>
    </BlogShell>
  );
}
function Centered({ title, body }: { title: string; body: string }) {
  return (
    <main className="mx-auto max-w-lg px-5 py-32 text-center sm:px-8">
      <h1 className="font-serif text-2xl font-medium tracking-tight text-[var(--blog-text)]">
        {title}
      </h1>
      <p className="mt-3 text-[15px] text-[var(--blog-soft)]">{body}</p>
      <Link
        to="/blog"
        search={{ q: undefined, tag: undefined }}
        className="mt-6 inline-block text-[13px] text-[var(--blog-accent)] underline underline-offset-4"
      >
        back to blog
      </Link>
    </main>
  );
}
