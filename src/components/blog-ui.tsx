/**
 * src/components/blog-ui.tsx
 *
 * Shared blog chrome: theme handling, markdown rendering, header, login dialog
 * and a few small primitives used by /blog, /blog/$slug and /admin.
 */
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

import { Link, useNavigate } from '@tanstack/react-router';
import { Lock, LogOut, Moon, PenLine, Sun } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
  AUTH_KEY,
  DEMO_CREDENTIALS,
  login as doLogin,
  logout as doLogout,
  getSession,
  getVersion,
  type Session,
  subscribe,
} from '@/lib/blog';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

/* ------------------------------------------------------------------ */
/* Store binding                                                       */
/* ------------------------------------------------------------------ */
/** Re-renders whenever blog.ts data or the session changes. */
export function useBlogStore(): number {
  return useSyncExternalStore(
    (l) => subscribe(l),
    () => getVersion(),
    () => 0,
  );
}
/** Session, hydration-safe (always null on the server / first paint). */
export function useSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setSession(getSession());
  }, []);

  useBlogStore();

  return hydrated ? session : null;
}

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */
export type ThemeChoice = 'light' | 'dark' | 'system';
const THEME_KEY = 'blog-theme';
/** Inlined in the document head so the blog never flashes the wrong theme. */
export const themeScript = `(function(){try{var p=location.pathname;if(p!=="/blog"&&p.indexOf("/blog/")!==0&&p.indexOf("/admin")!==0)return;var s=localStorage.getItem("${THEME_KEY}")||"system";var d=s==="dark"||(s==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
function resolve(choice: ThemeChoice): 'light' | 'dark' {
  if (choice !== 'system') return choice;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
interface ThemeContextValue {
  choice: ThemeChoice;
  resolved: 'light' | 'dark';
  setChoice: (c: ThemeChoice) => void;
}
const ThemeContext = createContext<ThemeContextValue>({
  choice: 'system',
  resolved: 'light',
  setChoice: () => {},
});
/** Wraps every blog surface: applies the theme class and the scoped tokens. */
export function BlogShell({ children, className }: { children: ReactNode; className?: string }) {
  const [choice, setChoiceState] = useState<ThemeChoice>('system');
  const [resolved, setResolved] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeChoice | null;
    const initial: ThemeChoice =
      stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    setChoiceState(initial);
    setResolved(resolve(initial));
  }, []);

  useEffect(() => {
    const next = resolve(choice);
    setResolved(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    return () => {
      // leaving the blog: hand the document back to the portfolio
      document.documentElement.classList.remove('dark');
    };
  }, [choice]);
  useEffect(() => {
    if (choice !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      setResolved(mq.matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', mq.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [choice]);
  const setChoice = useCallback((c: ThemeChoice) => {
    window.localStorage.setItem(THEME_KEY, c);
    setChoiceState(c);
  }, []);
  const value = useMemo(() => ({ choice, resolved, setChoice }), [choice, resolved, setChoice]);
  return (
    <ThemeContext.Provider value={value}>
      <div className={cn('blog-scope min-h-screen antialiased', className)}>{children}</div>
    </ThemeContext.Provider>
  );
}
export function ThemeToggle() {
  const { choice, resolved, setChoice } = useContext(ThemeContext);
  const next: ThemeChoice = resolved === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      aria-label={`Switch to ${next} theme (currently ${choice})`}
      title={choice === 'system' ? 'Theme: system' : `Theme: ${choice}`}
      onClick={() => setChoice(next)}
      className="grid size-8 place-items-center rounded-full text-[var(--blog-soft)] transition-colors hover:bg-[var(--blog-raised)] hover:text-[var(--blog-text)]"
    >
      {resolved === 'dark' ? <Sun className="size-[15px]" /> : <Moon className="size-[15px]" />}
    </button>
  );
}
/* ------------------------------------------------------------------ */
/* Markdown — one renderer for the article and the admin preview       */
/* ------------------------------------------------------------------ */
export function Markdown({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn('prose-blog', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */
export function Tag({
  tag,
  active,
  onClick,
  asLink,
}: {
  tag: string;
  active?: boolean;
  onClick?: () => void;
  asLink?: boolean;
}) {
  const className = cn(
    'inline-flex items-center rounded-full border px-2.5 py-[3px] text-[12px] tracking-tight transition-colors',
    active
      ? 'border-transparent bg-[var(--blog-accent-soft)] text-[var(--blog-accent)]'
      : 'border-[var(--blog-border)] text-[var(--blog-soft)] hover:border-[var(--blog-accent)]/50 hover:text-[var(--blog-accent)]',
  );
  if (asLink) {
    return (
      <Link
        to="/blog"
        search={{ tag, q: undefined }}
        className={className}
      >
        #{tag}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      #{tag}
    </button>
  );
}
export function PrivateMark({ className }: { className?: string }) {
  return (
    <span
      title="Private post"
      className={cn(
        'inline-flex items-center gap-1 text-[11px] tracking-[0.14em] text-[var(--blog-faint)] uppercase',
        className,
      )}
    >
      <Lock className="size-3" /> private
    </span>
  );
}
/* ------------------------------------------------------------------ */
/* Header + login                                                      */
/* ------------------------------------------------------------------ */
export function BlogHeader({ right }: { right?: ReactNode }) {
  const session = useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  const signOut = () => {
    doLogout();
    navigate({ to: '/blog', search: { q: undefined, tag: undefined } });
  };
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--blog-border)] bg-[var(--blog-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/blog"
          search={{ q: undefined, tag: undefined }}
          className="group flex items-baseline gap-1.5 text-[15px]"
        >
          <span className="text-[var(--blog-faint)] transition-colors group-hover:text-[var(--blog-accent)]">
            /
          </span>
          <span className="font-serif font-medium tracking-tight text-[var(--blog-text)]">
            blog
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {right}
          <ThemeToggle />
          {session ? (
            <>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] text-[var(--blog-soft)] transition-colors hover:bg-[var(--blog-raised)] hover:text-[var(--blog-text)]"
              >
                <PenLine className="size-[13px]" /> admin
              </Link>
              <button
                type="button"
                onClick={signOut}
                aria-label="Log out"
                className="grid size-8 place-items-center rounded-full text-[var(--blog-faint)] transition-colors hover:bg-[var(--blog-raised)] hover:text-[var(--blog-text)]"
              >
                <LogOut className="size-[14px]" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="rounded-full px-2.5 py-1 text-[13px] text-[var(--blog-faint)] transition-colors hover:text-[var(--blog-text)]"
            >
              log in
            </button>
          )}
        </div>
      </div>
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
      />
    </header>
  );
}
export function LoginDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!open) {
      setError(null);
      setLoading(false);
    }
  }, [open]);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError('Both fields are required.');
      return;
    }
    setLoading(true);
    try {
      await doLogin(email, password);
      setEmail('');
      setPassword('');
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="blog-scope max-w-sm gap-0 rounded-xl border-[var(--blog-border)] bg-[var(--blog-bg)] p-6">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="font-serif text-xl font-medium tracking-tight text-[var(--blog-text)]">
            Sign in
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[var(--blog-faint)]">
            For writing and reading private notes.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={submit}
          className="mt-5 space-y-3"
        >
          <Input
            type="email"
            autoFocus
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-lg border-[var(--blog-border)] bg-[var(--blog-raised)] text-[var(--blog-text)] placeholder:text-[var(--blog-faint)]"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 rounded-lg border-[var(--blog-border)] bg-[var(--blog-raised)] text-[var(--blog-text)] placeholder:text-[var(--blog-faint)]"
          />
          {error && <p className="text-[13px] text-red-500">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-lg bg-[var(--blog-accent)] text-white hover:bg-[var(--blog-accent)]/90"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
          <p className="pt-1 text-center text-[11px] text-[var(--blog-faint)]">
            demo · {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
