// page.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { createFileRoute, Link } from '@tanstack/react-router';
import {
  FaArrowRight,
  FaBars,
  FaBook,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFlask,
  FaGlobe,
  FaGraduationCap,
  FaLightbulb,
  FaLinkedinIn,
  FaOrcid,
  FaTimes,
  FaTrophy,
  FaUsers,
} from 'react-icons/fa';
import { SiGooglescholar, SiScopus } from 'react-icons/si';

import {
  awards,
  coursesPG,
  coursesUG,
  education,
  experience,
  navItems,
  patents,
  pcMemberRoles,
  pgUgProjects,
  profile,
  publications,
  type PublicationType,
  publicationTypeOrder,
  researchProjects,
  socialLinks,
  stats,
  statToSectionMap,
  textListSections,
} from '@/lib/portfolio-data copy';

export const Route = createFileRoute('/index copy')({
  head: () => ({
    meta: [
      { title: 'Dr. Kalpana Sunil Thakre — HOD, Computer Engineering, MMCOE Pune' },
      {
        name: 'description',
        content:
          'Academic portfolio of Dr. Kalpana Sunil Thakre — Professor & HOD of Computer Engineering at MMCOE Pune, with 60+ publications across video retrieval, machine learning and database systems.',
      },
      { property: 'og:title', content: 'Dr. Kalpana Sunil Thakre — Academic Portfolio' },
      {
        property: 'og:description',
        content: 'Professor & Head of Computer Engineering, MMCOE Pune.',
      },
    ],
  }),
  component: PortfolioPage,
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, React.ReactNode> = {
  orcid: <FaOrcid />,
  linkedin: <FaLinkedinIn />,
  scopus: <SiScopus />,
  wos: <FaGlobe />,
  scholar: <FaGraduationCap />,
  email: <FaEnvelope />,
};

const BRAND_COLORS: Record<string, string> = {
  linkedin: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50',
  orcid: 'hover:text-[#A6CE39] hover:border-[#A6CE39]/50',
  scholar: 'hover:text-[#4285F4] hover:border-[#4285F4]/50',
  scopus: 'hover:text-[#E9711C] hover:border-[#E9711C]/50',
  wos: 'hover:text-[#8B008B] hover:border-[#8B008B]/50',
  email: 'hover:text-accent hover:border-accent/50',
};

const DISPLAY_NAMES: Record<string, string> = {
  linkedin: 'LinkedIn',
  orcid: 'ORCID',
  scholar: 'Google Scholar',
  scopus: 'Scopus',
  wos: 'Web of Science',
  email: 'Email',
};

const STATUS_COLORS: Record<string, string> = {
  Completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Ongoing: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Submitted: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

// Type tags for publications — small, muted, distinct hues per type so the
// eye can scan the list by kind without re-reading the label every time.
const PUB_TYPE_COLORS: Record<string, string> = {
  Journal: 'bg-sky-500/10 text-sky-500 border-sky-500',
  Conference: 'bg-violet-500/10 text-violet-500 border-violet-500',
  'Book Chapter': 'bg-teal-500/10 text-teal-500 border-teal-500',
  Patent: 'bg-amber-500/20 text-amber-500 border-amber-500',
};

// Best-effort icon per stat, matched by keywords in the label. Falls back to
// a generic document icon so this never breaks if the data file's labels
// change shape.
const STAT_ICON_RULES: Array<[RegExp, React.ReactNode]> = [
  [/public/i, <FaBook />],
  [/award|honor/i, <FaTrophy />],
  [/project|research|fund/i, <FaFlask />],
  [/student|guid|mentor/i, <FaUsers />],
  [/patent/i, <FaLightbulb />],
];
const getStatIcon = (label: string) =>
  STAT_ICON_RULES.find(([re]) => re.test(label))?.[1] ?? <FaFileAlt />;

const GLASS_CARD = {
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(232, 168, 124, 0.1)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
};

// ---------------------------------------------------------------------------
// Motion primitives (IntersectionObserver-based — no extra dependency)
// ---------------------------------------------------------------------------

/** Fires `true` once the element has entered the viewport, then stays true. */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion users by revealing immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView } as const;
}

/** Fades + lifts children into place the first time they scroll into view. */
const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

/** Thin accent progress bar pinned to the top of the viewport. */
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[2px] bg-transparent">
      <div
        className="bg-accent h-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Small presentational utilities
// ---------------------------------------------------------------------------

const SectionNumber = ({ num }: { num: string }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="text-accent/60 font-mono text-xs font-bold tracking-widest">{num}</span>
    <span className="from-accent/20 h-px flex-1 bg-gradient-to-r to-transparent" />
  </div>
);

const SectionHeading = ({
  eyebrow,
  title,
  sectionNum,
}: {
  eyebrow: string;
  title: string;
  sectionNum?: string;
}) => (
  <Reveal>
    <div className="mb-6">
      {sectionNum && <SectionNumber num={sectionNum} />}
      <p className="eyebrow text-accent/70 mb-1 text-xs">{eyebrow}</p>
      <h2 className="text-ink font-serif text-3xl leading-[1.1] font-light tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="from-accent to-accent/20 mt-3 h-px w-16 bg-gradient-to-r" />
    </div>
  </Reveal>
);

const Section = ({
  id,
  children,
  refCb,
  className = '',
}: {
  id: string;
  children: React.ReactNode;
  refCb: (el: HTMLElement | null) => void;
  className?: string;
}) => (
  <section
    id={id}
    ref={refCb}
    className={`border-border/40 scroll-mt-8 border-b py-12 md:py-16 ${className}`}
  >
    {children}
  </section>
);

const GlassCard = ({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => (
  <div
    className={`rounded-lg ${hover ? 'hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(232,168,124,0.06)]' : ''} ${className}`}
    style={GLASS_CARD}
  >
    {children}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase ${STATUS_COLORS[status] || 'bg-muted/50 text-muted-foreground border-border/50'}`}
  >
    {status}
  </span>
);

/** Parses "2015 – Present" / "2018–2021" style strings into a short badge. */
const getDuration = (period?: string): { label: string; isCurrent: boolean } | null => {
  if (!period) return null;
  const isCurrent = /present/i.test(period);
  const years = period.match(/\d{4}/g);
  if (!years) return null;
  const start = Number(years[0]);
  const end = isCurrent ? new Date().getFullYear() : Number(years[years.length - 1] ?? years[0]);
  const span = end - start;
  if (Number.isNaN(span) || span < 0) return null;
  if (span === 0) return { label: '< 1 yr', isCurrent };
  return { label: `${span}+ yr${span > 1 ? 's' : ''}`, isCurrent };
};

const TimelineItem = ({
  title,
  subtitle,
  period,
  detail,
  children,
}: {
  title: string;
  subtitle: string;
  period?: string;
  detail?: string;
  children?: React.ReactNode;
}) => {
  const duration = getDuration(period);
  return (
    <Reveal
      className="group relative"
      delay={40}
    >
      <li className="relative list-none">
        <span
          className={`ring-background absolute top-1.5 -left-[30px] h-2.5 w-2.5 rounded-full ring-4 transition-all duration-300 group-hover:scale-125 ${
            duration?.isCurrent
              ? 'bg-accent animate-pulse-slow'
              : 'bg-accent group-hover:ring-accent/30'
          }`}
        />
        <div className="ml-0">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-ink font-serif text-lg leading-snug font-light">{title}</h3>
            {period && (
              <span className="text-accent/80 font-mono text-xs whitespace-nowrap">{period}</span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <p className="text-muted-foreground 70 text-sm">{subtitle}</p>
            {duration && (
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] tracking-wider uppercase ${
                  duration.isCurrent
                    ? 'bg-accent/15 text-accent border-accent/30'
                    : 'bg-accent/5 text-accent/60 border-accent/15'
                }`}
              >
                {duration.isCurrent ? 'Current' : duration.label}
              </span>
            )}
          </div>
          {detail && <p className="text-muted-foreground 50 mt-0.5 text-xs">{detail}</p>}
          {children}
        </div>
      </li>
    </Reveal>
  );
};

/** Bolds the profile owner's surname within a publication author list. */
const highlightAuthor = (authors: string) => {
  const surname = profile.name.trim().split(' ').slice(-1)[0];
  if (!surname) return authors;
  const parts = authors.split(new RegExp(`(${surname})`, 'i'));
  return parts.map((part, i) =>
    part.toLowerCase() === surname.toLowerCase() ? (
      <strong
        key={i}
        className="text-ink/90 font-medium not-italic"
      >
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const PublicationItem = ({
  year,
  type,
  title,
  authors,
  venue,
  doi,
}: {
  year: string;
  type: string;
  title: string;
  authors: string;
  venue: string;
  doi?: string;
}) => (
  <Reveal>
    <li className="group hover:bg-accent/5 -mx-3 grid grid-cols-[60px_1fr] gap-4 rounded-lg p-3 transition-colors duration-300">
      <div className="pt-0.5">
        <div className="text-accent/60 font-mono text-xl font-light">{year}</div>
      </div>
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase ${PUB_TYPE_COLORS[type] || 'bg-muted/30 text-muted-foreground border-border/40'}`}
          >
            {type}
          </span>
        </div>
        <h4 className="text-ink font-serif text-base leading-snug font-light">{title}</h4>
        <p className="text-muted-foreground 60 mt-1 text-xs italic">{highlightAuthor(authors)}</p>
        <p className="text-muted-foreground 50 mt-0.5 text-xs">{venue}</p>
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noreferrer"
            className="text-accent/70 hover:text-accent group/doi mt-2 inline-flex items-center gap-1.5 text-xs transition-colors"
          >
            <span className="border-accent/20 group-hover/doi:border-accent/40 rounded border px-1.5 py-0.5 transition-colors">
              DOI
            </span>{' '}
            {doi}{' '}
            <FaExternalLinkAlt className="text-[10px] opacity-0 transition-opacity group-hover/doi:opacity-100" />
          </a>
        )}
      </div>
    </li>
  </Reveal>
);

/** Underline-on-hover link wrapper used for nav-adjacent inline links. */
const UnderlineLink = ({
  href,
  children,
  className = '',
  target,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
}) => (
  <a
    href={href}
    target={target}
    rel={target ? 'noreferrer' : undefined}
    className={`after:bg-accent relative inline-flex items-center gap-1.5 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 hover:after:w-full ${className}`}
  >
    {children}
  </a>
);

const SocialLink = ({ id, href, label }: { id: string; href: string; label: string }) => (
  <a
    key={id}
    href={href}
    target={id === 'email' ? undefined : '_blank'}
    rel="noreferrer"
    aria-label={label}
    className={`border-border/30 bg-card/20 text-muted-foreground hover:bg-card/40 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 transition-all duration-300 hover:scale-105 ${BRAND_COLORS[id] || 'hover:text-accent'}`}
  >
    <span className="text-base">{ICON_MAP[id]}</span>
    <span className="text-xs font-medium whitespace-nowrap">{DISPLAY_NAMES[id] || label}</span>
  </a>
);

const StatsCard = ({ value, label, index, countedStats, statId }: any) => {
  const sectionId = statToSectionMap[statId] || statId;
  const handleClick = () => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <Reveal delay={index * 60}>
      <div
        onClick={handleClick}
        className="group cursor-pointer transition-all duration-300 hover:scale-105"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <GlassCard
          className="p-4 text-center hover:shadow-[0_0_30px_rgba(232,168,124,0.1)]"
          hover={false}
        >
          <div className="text-accent/50 group-hover:text-accent/80 flex justify-center text-sm transition-all duration-300 group-hover:scale-110">
            {getStatIcon(label)}
          </div>
          <dt className="text-ink mt-2 font-serif text-2xl font-light md:text-3xl">
            {value.includes('%') || value.includes('+') ? value : countedStats[index] || value}
          </dt>
          <dd className="text-muted-foreground 60 mt-1 text-[10px] tracking-[0.15em] uppercase">
            {label}
          </dd>
          <div className="bg-accent/30 mx-auto mt-2 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
        </GlassCard>
      </div>
    </Reveal>
  );
};

const FilterButton = ({ type, count, active, onClick }: any) => (
  <button
    onClick={() => onClick(type)}
    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
      active
        ? 'bg-accent text-background border-accent shadow-[0_0_25px_rgba(232,168,124,0.15)]'
        : 'border-border/50 text-muted-foreground hover:border-accent/50 hover:text-accent'
    }`}
  >
    {type} <span className={active ? 'text-background/70' : 'opacity-50'}>({count})</span>
  </button>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pubFilter, setPubFilter] = useState<PublicationType | 'All'>('All');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const filteredPublications = useMemo(() => {
    const list =
      pubFilter === 'All' ? publications : publications.filter((p) => p.type === pubFilter);
    return [...list].sort((a, b) => Number(b.year) - Number(a.year));
  }, [pubFilter]);

  const publicationCounts = useMemo(() => {
    const counts: Record<string, number> = { All: publications.length };
    publicationTypeOrder.forEach((t) => {
      counts[t] = publications.filter((p) => p.type === t).length;
    });
    return counts;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    navItems.forEach((item) => {
      const el = sectionRefs.current[item.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const goTo = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  }, []);

  // Keyboard navigation: Up/Down cycles through sections when the user
  // isn't typing into a form control.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const idx = navItems.findIndex((n) => n.id === activeSection);
      if (idx === -1) return;
      e.preventDefault();
      const nextIdx =
        e.key === 'ArrowDown' ? Math.min(idx + 1, navItems.length - 1) : Math.max(idx - 1, 0);
      goTo(navItems[nextIdx].id);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSection, goTo]);

  const [countedStats, setCountedStats] = useState(stats.map(() => 0));
  useEffect(() => {
    const timers = stats.map((s: { value: string }, i) => {
      const target = parseInt(s.value.replace(/[^0-9]/g, ''));
      if (isNaN(target)) return null;
      let current = 0;
      const increment = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCountedStats((prev: any) => {
          const newStats = [...prev];
          newStats[i] = current;
          return newStats;
        });
      }, 25);
      return timer;
    });
    return () => timers.forEach((t) => t && clearInterval(t));
  }, []);

  const getSectionNum = (id: string) => {
    const index = navItems.findIndex((item) => item.id === id);
    return index >= 0 ? String(index + 1).padStart(2, '0') : undefined;
  };

  const initials = 'KT';

  const renderListSection = (s: any) => {
    if (s.id === 'technical-skills') {
      return (
        <div className="flex flex-wrap gap-1.5">
          {s.items.map((it: string) => (
            <span
              key={it}
              className="bg-muted/30 text-ink/80 border-border/30 hover:border-accent/30 rounded-lg border px-3 py-1.5 text-xs transition-all duration-300 hover:-translate-y-0.5"
            >
              {it}
            </span>
          ))}
        </div>
      );
    }
    if (s.id === 'area-of-interest') {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {s.items.map((it: string) => (
            <div
              key={it}
              className="border-border/30 bg-card/30 text-ink/80 hover:border-accent/30 rounded-lg border p-4 font-serif text-sm transition-colors duration-300"
            >
              {it}
            </div>
          ))}
        </div>
      );
    }
    if (s.id === 'professional-membership') {
      return (
        <ul className="grid gap-3 md:grid-cols-3">
          {s.items.map((it: string) => (
            <li
              key={it}
              className="border-border/30 bg-card/30 text-ink/70 rounded-lg border p-4 text-xs"
            >
              {it}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="space-y-3">
        {s.items.map((it: string, i: number) => (
          <li
            key={i}
            className="text-muted-foreground 60 group flex gap-3 text-xs"
          >
            <span className="text-accent/30 group-hover:text-accent/60 shrink-0 transition-colors">
              ◆
            </span>
            <span className="group-hover:text-ink/80 transition-colors">{it}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <ScrollProgressBar />

      {/* Mobile top bar */}
      <div className="bg-surface/95 border-border/50 sticky top-0 z-40 flex h-14 items-center justify-between border-b px-4 backdrop-blur-xl lg:hidden">
        <div className="font-serif text-base font-light tracking-wide">Dr. K. S. Thakre</div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="border-border/50 hover:border-accent/50 flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes className="text-accent text-sm" /> : <FaBars className="text-sm" />}
        </button>
      </div>

      <div className="lg:flex">
        {/* Sidebar */}
        <aside
          className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} bg-surface/95 border-border/50 fixed top-0 z-30 h-screen w-[280px] overflow-y-auto border-r backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:sticky lg:translate-x-0`}
        >
          <div className="border-border/50 flex flex-col items-center border-b p-6 text-center">
            <div className="relative h-28 w-28">
              <div className="bg-accent/20 animate-pulse-slow absolute inset-0 rounded-full blur-2xl" />
              <div className="ring-accent/40 shadow-accent/10 from-accent/30 to-primary/30 relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br shadow-xl ring-2">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-accent flex h-full w-full items-center justify-center font-serif text-3xl font-light tracking-wider">
                    {initials}
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-ink mt-4 font-serif text-lg leading-tight font-light tracking-wide">
              {profile.name}
            </h1>
            <p className="text-accent/80 mt-1 text-xs font-medium tracking-wider uppercase">
              {profile.title}
            </p>
            <p className="text-muted-foreground 70 mt-1 max-w-[200px] text-xs leading-snug">
              {profile.institution}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.id === 'email' ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="border-border/50 text-muted-foreground hover:text-accent hover:border-accent/50 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
                >
                  <span className="text-sm">{ICON_MAP[s.id]}</span>
                </a>
              ))}
              <Link
                to="/blog"
                search={{ q: undefined, tag: undefined }}
                aria-label="Blog"
                className="border-border/50 text-muted-foreground hover:text-accent hover:border-accent/50 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
              >
                <FaBook className="text-sm" />
              </Link>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-0.5">
              {navItems.map((item, i) => {
                const active = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => goTo(item.id)}
                      aria-current={active ? 'true' : undefined}
                      className={`group focus-visible:outline-accent/60 relative w-full rounded-lg px-3 py-2 text-left text-xs transition-all duration-300 focus-visible:outline focus-visible:outline-2 ${
                        active ? 'text-accent font-medium' : 'text-muted-foreground hover:text-ink'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2.5">
                        <span
                          className={`font-mono text-xs transition-colors ${active ? 'text-accent' : 'text-muted-foreground 50'}`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{item.shortLabel ?? item.label}</span>
                      </span>
                      {active && (
                        <span className="bg-accent/10 border-accent/20 absolute inset-0 rounded-lg border" />
                      )}
                      <span
                        className={`absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full transition-all duration-300 ${
                          active ? 'bg-accent h-6' : 'bg-transparent group-hover:h-3'
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-border/50 border-t p-4">
            <p className="text-muted-foreground 50 text-[10px] tracking-wider">
              &copy; {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </aside>

        {menuOpen && (
          <div
            className="bg-ink/60 fixed inset-0 z-20 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 lg:ml-0">
          <div className="mx-auto max-w-4xl px-4 md:px-8 lg:px-12">
            {/* Hero */}
            <Section
              id="home"
              refCb={registerRef('home')}
              className="pt-8"
            >
              <div className="relative">
                <div className="bg-accent/5 absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl" />
                <p className="eyebrow text-accent/60 mb-2 text-xs tracking-[0.15em]">
                  ACADEMIC PORTFOLIO
                </p>
                <h1 className="text-ink font-serif text-4xl leading-[1.05] font-light tracking-tight md:text-6xl">
                  {profile.name.split(' ').map((word, i) => (
                    <span
                      key={i}
                      className="block md:mr-4 md:inline-block"
                    >
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="text-muted-foreground 80 mt-4 max-w-2xl text-sm leading-relaxed font-light">
                  {profile.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${profile.emails[0]}`}
                    className="bg-accent text-background hover:bg-accent/90 inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(232,168,124,0.25)]"
                  >
                    <FaEnvelope className="text-xs" /> Get in touch
                  </a>
                  <Link
                    to={'/blog'}
                    className="border-border/50 hover:border-accent/50 hover:text-accent inline-flex items-center gap-2 rounded-md border px-6 py-2.5 text-xs font-medium transition-all duration-300 hover:scale-105"
                  >
                    View blogs{' '}
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {socialLinks.map((s) => (
                    <SocialLink
                      key={s.id}
                      id={s.id}
                      href={s.href}
                      label={s.label}
                    />
                  ))}
                </div>

                <dl
                  id="stats"
                  className="mt-10 grid scroll-mt-8 grid-cols-2 gap-3 md:grid-cols-4"
                >
                  {stats.map((s: { id: any }, index: any) => (
                    <StatsCard
                      key={s.id}
                      {...s}
                      statId={s.id}
                      index={index}
                      countedStats={countedStats}
                    />
                  ))}
                </dl>

                <div className="text-muted-foreground 60 mt-8 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                  {profile.emails.map((e) => (
                    <UnderlineLink
                      key={e}
                      href={`mailto:${e}`}
                      className="hover:text-accent transition-colors"
                    >
                      <FaEnvelope className="text-xs" /> {e}
                    </UnderlineLink>
                  ))}
                </div>
              </div>
            </Section>

            {/* Education */}
            <Section
              id="education"
              refCb={registerRef('education')}
            >
              <SectionHeading
                eyebrow="Education"
                title="Academic Qualification"
                sectionNum={getSectionNum('education')}
              />
              <ol className="border-accent/30 relative space-y-6 border-l-2 pl-6">
                {education.map((e) => (
                  <TimelineItem
                    key={e.id}
                    title={e.degree}
                    subtitle={e.institution}
                    period={e.year}
                    detail={e.detail}
                  />
                ))}
              </ol>
            </Section>

            {/* Experience */}
            <Section
              id="experience"
              refCb={registerRef('experience')}
            >
              <SectionHeading
                eyebrow="Career"
                title="Academic Experience"
                sectionNum={getSectionNum('experience')}
              />
              <ol className="border-accent/30 relative space-y-6 border-l-2 pl-6">
                {experience.map((x) => (
                  <TimelineItem
                    key={x.id}
                    title={x.role}
                    subtitle={x.organization}
                    period={x.period}
                    detail={x.basis}
                  />
                ))}
              </ol>
            </Section>

            {/* Research projects */}
            <Section
              id="research-projects"
              refCb={registerRef('research-projects')}
            >
              <SectionHeading
                eyebrow="Funded Work"
                title="Research Projects"
                sectionNum={getSectionNum('research-projects')}
              />
              <div className="grid gap-4">
                {researchProjects.map((p) => (
                  <Reveal key={p.id}>
                    <GlassCard className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <h3 className="text-ink min-w-0 flex-1 font-serif text-lg leading-snug font-light">
                          {p.title}
                        </h3>
                        <StatusBadge status={p.status} />
                      </div>
                      <div className="text-muted-foreground 60 mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                        <span>
                          <strong className="text-ink/80 font-medium">Funder:</strong> {p.funder}
                        </span>
                        <span>
                          <strong className="text-ink/80 font-medium">Amount:</strong> {p.amount}
                        </span>
                        <span>
                          <strong className="text-ink/80 font-medium">Period:</strong> {p.period}
                        </span>
                      </div>
                      <p className="text-muted-foreground 70 mt-3 text-sm leading-relaxed">
                        {p.description}
                      </p>
                      {p.status === 'Ongoing' && (
                        <div className="bg-border/40 mt-4 h-1 overflow-hidden rounded-full">
                          <div className="from-accent/80 to-accent/30 h-full w-2/3 rounded-full bg-gradient-to-r" />
                        </div>
                      )}
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </Section>

            {/* Publications */}
            <Section
              id="publications"
              refCb={registerRef('publications')}
            >
              <SectionHeading
                eyebrow="Scholarship"
                title="Publications"
                sectionNum={getSectionNum('publications')}
              />
              <div className="mb-6 flex flex-wrap gap-1.5">
                {(['All', ...publicationTypeOrder] as const).map((t) => (
                  <FilterButton
                    key={t}
                    type={t}
                    count={publicationCounts[t]}
                    active={pubFilter === t}
                    onClick={setPubFilter}
                  />
                ))}
              </div>
              <ul className="space-y-5">
                {filteredPublications.map((p) => (
                  <PublicationItem
                    key={p.id}
                    {...p}
                  />
                ))}
              </ul>
            </Section>

            {/* Awards */}
            <Section
              id="awards"
              refCb={registerRef('awards')}
            >
              <SectionHeading
                eyebrow="Honors"
                title="Awards"
                sectionNum={getSectionNum('awards')}
              />
              <div className="grid gap-3 md:grid-cols-2">
                {awards.map((a) => (
                  <Reveal key={a.id}>
                    <GlassCard className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-accent/40 font-mono text-2xl font-light">{a.year}</div>
                        <FaTrophy className="text-accent/30 text-sm" />
                      </div>
                      <h3 className="text-ink mt-2 font-serif text-base leading-snug font-light">
                        {a.title}
                      </h3>
                      <p className="text-muted-foreground 50 mt-1 text-xs">{a.organization}</p>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </Section>

            {/* PG/UG Guidance */}
            <Section
              id="pg-ug-guidance"
              refCb={registerRef('pg-ug-guidance')}
            >
              <SectionHeading
                eyebrow="Mentorship"
                title="PG / UG Guidance"
                sectionNum={getSectionNum('pg-ug-guidance')}
              />
              <p className="text-muted-foreground 60 mb-5 text-xs leading-relaxed">
                Representative themes from research and projects guided at PG and UG levels.
              </p>
              <ul className="grid gap-x-6 gap-y-2.5 md:grid-cols-2">
                {pgUgProjects.map((t, i) => (
                  <li
                    key={i}
                    className="group flex gap-3 text-xs"
                  >
                    <span className="text-accent/50 group-hover:text-accent mt-0.5 shrink-0 transition-colors">
                      ◆
                    </span>
                    <span className="text-muted-foreground 70 group-hover:text-ink/80 transition-colors">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* PC Member */}
            <Section
              id="pc-member"
              refCb={registerRef('pc-member')}
            >
              <SectionHeading
                eyebrow="Service"
                title="PC Member / Editor / Reviewer"
                sectionNum={getSectionNum('pc-member')}
              />
              <ul className="space-y-3">
                {pcMemberRoles.map((r, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground 60 border-border/50 hover:border-accent/50 hover:text-ink/80 flex gap-3 border-l-2 py-1.5 pl-4 text-xs transition-colors duration-300"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Courses */}
            <Section
              id="courses-taught"
              refCb={registerRef('courses-taught')}
            >
              <SectionHeading
                eyebrow="Teaching"
                title="Courses Taught"
                sectionNum={getSectionNum('courses-taught')}
              />
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="eyebrow text-accent/60 mb-3 text-xs">Undergraduate</h3>
                  <ul className="space-y-2">
                    {coursesUG.map((c) => (
                      <li
                        key={c}
                        className="text-muted-foreground 60 group flex gap-2.5 text-xs"
                      >
                        <span className="text-accent/30 group-hover:text-accent/60 transition-colors">
                          ›
                        </span>{' '}
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow text-accent/60 mb-3 text-xs">Postgraduate</h3>
                  <ul className="space-y-2">
                    {coursesPG.map((c) => (
                      <li
                        key={c}
                        className="text-muted-foreground 60 group flex gap-2.5 text-xs"
                      >
                        <span className="text-accent/30 group-hover:text-accent/60 transition-colors">
                          ›
                        </span>{' '}
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            {/* Text list sections + Patents special */}
            {textListSections.map((s) => {
              const beforePatents = s.id === 'research-grants';
              return (
                <div key={s.id}>
                  {beforePatents && (
                    <Section
                      id="patents"
                      refCb={registerRef('patents')}
                    >
                      <SectionHeading
                        eyebrow="Intellectual Property"
                        title="Patents"
                        sectionNum={getSectionNum('patents')}
                      />
                      <ul className="space-y-5">
                        {patents.map((p) => (
                          <PublicationItem
                            key={p.id}
                            {...p}
                          />
                        ))}
                      </ul>
                    </Section>
                  )}
                  <Section
                    id={s.id}
                    refCb={registerRef(s.id)}
                  >
                    <SectionHeading
                      eyebrow={s.eyebrow}
                      title={s.title}
                      sectionNum={getSectionNum(s.id)}
                    />
                    {s.intro && (
                      <p className="text-muted-foreground 60 mb-5 text-xs leading-relaxed">
                        {s.intro}
                      </p>
                    )}
                    <Reveal>{renderListSection(s)}</Reveal>
                  </Section>
                </div>
              );
            })}

            {/* Footer */}
            <footer className="py-10 text-center">
              <div className="via-accent/20 mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent to-transparent" />
              <p className="text-muted-foreground 50 text-xs font-light tracking-wide">
                {profile.formalName} · {profile.institution}
              </p>
              <p className="text-muted-foreground 30 mt-2 text-xs tracking-wider">
                &copy; {new Date().getFullYear()} · All rights reserved
              </p>
            </footer>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow { animation: none; }
        }
      `}</style>
    </div>
  );
}
