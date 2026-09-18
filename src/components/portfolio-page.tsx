// Shared portfolio page implementation (unchanged from v2). Rendered by "/" and "/v2".
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  FaArrowRight,
  FaBars,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGlobe,
  FaGraduationCap,
  FaLinkedinIn,
  FaOrcid,
  FaTimes,
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

// Constants
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
const GLASS_CARD = {
  background: 'rgba(26, 26, 40, 0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(232, 168, 124, 0.1)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
};
// Utility: Section number
const SectionNumber = ({ num }: { num: string }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="text-accent/60 font-mono text-xs font-bold tracking-widest">{num}</span>
    <span className="from-accent/20 h-px flex-1 bg-gradient-to-r to-transparent" />
  </div>
);
// Utility: Section heading
const SectionHeading = ({
  eyebrow,
  title,
  sectionNum,
}: {
  eyebrow: string;
  title: string;
  sectionNum?: string;
}) => (
  <div className="mb-6">
    {sectionNum && <SectionNumber num={sectionNum} />}
    <p className="eyebrow text-accent/70 mb-1 text-xs">{eyebrow}</p>
    <h2 className="text-ink font-serif text-3xl leading-[1.1] font-light tracking-tight md:text-4xl">
      {title}
    </h2>
    <div className="from-accent to-accent/20 mt-3 h-px w-16 bg-gradient-to-r" />
  </div>
);
// Utility: Section wrapper
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
// Utility: Glass card
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
    className={`rounded-lg ${GLASS_CARD} ${hover ? 'hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(232,168,124,0.06)]' : ''} ${className}`}
  >
    {children}
  </div>
);
// Utility: Status badge
const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${STATUS_COLORS[status] || 'bg-muted/50 text-muted-foreground border-border/50'}`}
  >
    {status}
  </span>
);
// Utility: Timeline item (for education & experience)
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
}) => (
  <li className="group relative">
    <span className="bg-accent ring-background group-hover:ring-accent/30 absolute top-1.5 -left-[30px] h-2.5 w-2.5 rounded-full ring-4 transition-all duration-300 group-hover:scale-125" />
    <div className="ml-0">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-ink font-serif text-lg leading-snug font-light">{title}</h3>
        {period && (
          <span className="text-accent/80 font-mono text-xs whitespace-nowrap">{period}</span>
        )}
      </div>
      <p className="text-muted-foreground/70 mt-1 text-sm">{subtitle}</p>
      {detail && <p className="text-muted-foreground/50 mt-0.5 text-xs">{detail}</p>}
      {children}
    </div>
  </li>
);
// Utility: Publication item
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
  <li className="group hover:bg-accent/5 -mx-3 grid grid-cols-[60px_1fr] gap-4 rounded-lg p-3 transition-colors duration-300">
    <div className="pt-0.5">
      <div className="text-accent/60 font-mono text-xl font-light">{year}</div>
      <div className="text-muted-foreground/40 mt-1 text-[9px] tracking-[0.15em] uppercase">
        {type}
      </div>
    </div>
    <div>
      <h4 className="text-ink font-serif text-base leading-snug font-light">{title}</h4>
      <p className="text-muted-foreground/60 mt-1 text-xs italic">{authors}</p>
      <p className="text-muted-foreground/50 mt-0.5 text-xs">{venue}</p>
      {doi && (
        <a
          href={`https://doi.org/${doi}`}
          target="_blank"
          rel="noreferrer"
          className="text-accent/70 hover:text-accent group/doi mt-2 inline-flex items-center gap-1.5 text-[10px] transition-colors"
        >
          DOI: {doi}{' '}
          <FaExternalLinkAlt className="text-[8px] opacity-0 transition-opacity group-hover/doi:opacity-100" />
        </a>
      )}
    </div>
  </li>
);
// Utility: Social link with brand colors - made larger with better hit areas
const SocialLink = ({ id, href, label }: { id: string; href: string; label: string }) => (
  <a
    key={id}
    href={href}
    target={id === 'email' ? undefined : '_blank'}
    rel="noreferrer"
    aria-label={label}
    className={`group border-border/30 bg-card/20 text-muted-foreground hover:bg-card/40 relative inline-flex items-center rounded-full border px-4 py-2 transition-all duration-300 hover:scale-105 ${BRAND_COLORS[id] || 'hover:text-accent'}`}
  >
    <span className="text-base">{ICON_MAP[id]}</span>
    <span className="max-w-0 overflow-hidden text-xs font-medium whitespace-nowrap transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[120px]">
      {DISPLAY_NAMES[id] || label}
    </span>
  </a>
);
// Utility: Stats card
const StatsCard = ({ value, label, index, countedStats, statId }: any) => {
  const sectionId = statToSectionMap[statId] || statId;
  const handleClick = () => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(232,168,124,0.1)]"
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
        className="p-4 text-center"
        hover={false}
      >
        <dt className="text-ink font-serif text-2xl font-light md:text-3xl">
          {value.includes('%') || value.includes('+') ? value : countedStats[index] || value}
        </dt>
        <dd className="text-muted-foreground/60 mt-1 text-[9px] tracking-[0.15em] uppercase">
          {label}
        </dd>
      </GlassCard>
    </div>
  );
};
// Utility: Filter buttons for publications
const FilterButton = ({ type, count, active, onClick }: any) => (
  <button
    onClick={() => onClick(type)}
    className={`rounded-full border px-4 py-1.5 text-[10px] font-medium transition-all duration-300 ${
      active
        ? 'bg-accent text-background border-accent shadow-[0_0_25px_rgba(232,168,124,0.15)]'
        : 'border-border/50 text-muted-foreground hover:border-accent/50 hover:text-accent'
    }`}
  >
    {type} <span className={active ? 'text-background/70' : 'opacity-50'}>({count})</span>
  </button>
);
export function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pubFilter, setPubFilter] = useState<PublicationType | 'All'>('All');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
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
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
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
  const goTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };
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
  // Render list sections dynamically
  const renderListSection = (s: any) => {
    if (s.id === 'technical-skills') {
      return (
        <div className="flex flex-wrap gap-1.5">
          {s.items.map((it: string) => (
            <span
              key={it}
              className="bg-muted/30 text-ink/80 border-border/30 hover:border-accent/30 rounded-lg border px-3 py-1.5 text-xs transition-colors duration-300"
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
            className="text-muted-foreground/60 group flex gap-3 text-xs"
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
      {/* Mobile top bar */}
      <div className="bg-surface/95 border-border/50 sticky top-0 z-40 flex h-14 items-center justify-between border-b px-4 backdrop-blur-xl lg:hidden">
        <div className="font-serif text-base font-light tracking-wide">Dr. K. S. Thakre</div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="border-border/50 hover:border-accent/50 flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
          aria-label="Toggle navigation"
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
            <p className="text-accent/80 mt-1 text-[10px] font-medium tracking-wider uppercase">
              {profile.title}
            </p>
            <p className="text-muted-foreground/70 mt-1 max-w-[200px] text-[10px] leading-snug">
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
            </div>
          </div>
          <nav className="p-4">
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => goTo(item.id)}
                      className={`group relative w-full rounded-lg px-3 py-2 text-left text-xs transition-all duration-300 ${
                        active ? 'text-accent font-medium' : 'text-muted-foreground hover:text-ink'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2.5">
                        <span
                          className={`font-mono text-[10px] transition-colors ${active ? 'text-accent' : 'text-muted-foreground/50'}`}
                        >
                          {String(navItems.indexOf(item) + 1).padStart(2, '0')}
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
            <p className="text-muted-foreground/50 text-[9px] tracking-wider">
              &copy; {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </aside>
        {/* Backdrop mobile */}
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
                <p className="text-muted-foreground/80 mt-4 max-w-2xl text-sm leading-relaxed font-light">
                  {profile.summary}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${profile.emails[0]}`}
                      className="bg-accent text-background hover:bg-accent/90 inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(232,168,124,0.25)]"
                    >
                      <FaEnvelope className="text-[10px]" /> Get in touch
                    </a>
                    <button
                      onClick={() => goTo('publications')}
                      className="border-border/50 hover:border-accent/50 hover:text-accent inline-flex items-center gap-2 rounded-md border px-6 py-2.5 text-xs font-medium transition-all duration-300 hover:scale-105"
                    >
                      View publications <FaArrowRight className="text-[10px]" />
                    </button>
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
                </div>
                {/* Stats section with proper id for linking */}
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
                <div className="text-muted-foreground/60 mt-8 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                  {profile.emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="hover:text-accent inline-flex items-center gap-1.5 transition-colors"
                    >
                      <FaEnvelope className="text-[10px]" /> {e}
                    </a>
                  ))}
                </div>
              </div>
            </Section>
            {/* Education - removed SSC and HSSC */}
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
            {/* Experience - updated with Dean role as current, HOD preserved */}
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
            {/* Research projects - removed "Submitted" entry */}
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
                  <GlassCard
                    key={p.id}
                    className="p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <h3 className="text-ink min-w-0 flex-1 font-serif text-lg leading-snug font-light">
                        {p.title}
                      </h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="text-muted-foreground/60 mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">
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
                    <p className="text-muted-foreground/70 mt-3 text-sm leading-relaxed">
                      {p.description}
                    </p>
                  </GlassCard>
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
                  <GlassCard
                    key={a.id}
                    className="p-4"
                  >
                    <div className="text-accent/40 font-mono text-2xl font-light">{a.year}</div>
                    <h3 className="text-ink mt-2 font-serif text-base leading-snug font-light">
                      {a.title}
                    </h3>
                    <p className="text-muted-foreground/50 mt-1 text-xs">{a.organization}</p>
                  </GlassCard>
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
              <p className="text-muted-foreground/60 mb-5 text-xs leading-relaxed">
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
                    <span className="text-muted-foreground/70 group-hover:text-ink/80 transition-colors">
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
                    className="text-muted-foreground/60 border-border/50 hover:border-accent/50 hover:text-ink/80 flex gap-3 border-l-2 py-1.5 pl-4 text-xs transition-colors duration-300"
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
                        className="text-muted-foreground/60 group flex gap-2.5 text-xs"
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
                        className="text-muted-foreground/60 group flex gap-2.5 text-xs"
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
                      <p className="text-muted-foreground/60 mb-5 text-xs leading-relaxed">
                        {s.intro}
                      </p>
                    )}
                    {renderListSection(s)}
                  </Section>
                </div>
              );
            })}
            {/* Footer */}
            <footer className="py-10 text-center">
              <div className="via-accent/20 mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent to-transparent" />
              <p className="text-muted-foreground/50 text-xs font-light tracking-wide">
                {profile.formalName} · {profile.institution}
              </p>
              <p className="text-muted-foreground/30 mt-2 text-[10px] tracking-wider">
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
`}</style>
    </div>
  );
}
