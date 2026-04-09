import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ExternalLink, Github, MapPin, Briefcase, GraduationCap, Sparkles } from 'lucide-react'

/* ── Intersection-observer reveal hook ─────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

/* ── Skill groups ──────────────────────────────────────────────── */
const skillGroups = [
  {
    emoji: '⌨️',
    label: 'Languages',
    color: 'from-violet-500 to-purple-600',
    bg:    'bg-violet-50 dark:bg-violet-900/10',
    border:'border-violet-200 dark:border-violet-800/40',
    skills: ['Java', 'Python', 'JavaScript'],
  },
  {
    emoji: '⚙️',
    label: 'Backend',
    color: 'from-green-500 to-emerald-600',
    bg:    'bg-emerald-50 dark:bg-emerald-900/10',
    border:'border-emerald-200 dark:border-emerald-800/40',
    skills: ['FastAPI', 'Spring Boot', 'RESTful APIs', 'Hibernate'],
  },
  {
    emoji: '🎨',
    label: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    bg:    'bg-blue-50 dark:bg-blue-900/10',
    border:'border-blue-200 dark:border-blue-800/40',
    skills: ['React.js', 'Tailwind CSS', 'HTML5', 'JavaScript'],
  },
  {
    emoji: '🤖',
    label: 'AI / ML',
    color: 'from-pink-500 to-rose-500',
    bg:    'bg-rose-50 dark:bg-rose-900/10',
    border:'border-rose-200 dark:border-rose-800/40',
    skills: ['LLM Integration', 'RAG', 'Embeddings', 'YOLOv8', 'OpenCV', 'Gen AI'],
  },
  {
    emoji: '🗃️',
    label: 'Databases',
    color: 'from-amber-500 to-orange-500',
    bg:    'bg-amber-50 dark:bg-amber-900/10',
    border:'border-amber-200 dark:border-amber-800/40',
    skills: ['PostgreSQL', 'MySQL', 'PL/SQL', 'SQL'],
  },
  {
    emoji: '🚀',
    label: 'DevOps',
    color: 'from-slate-500 to-gray-700',
    bg:    'bg-slate-50 dark:bg-slate-900/30',
    border:'border-slate-200 dark:border-slate-700/40',
    skills: ['Docker', 'Git', 'CI/CD', 'AWS'],
  },
]

/* ── Experience timeline ───────────────────────────────────────── */
const timelineItems = [
  {
    year:    'Nov 2025 – Apr 2026',
    role:    'Software Developer',
    company: 'Brightpath Technology & Services',
    desc:    'Building production-grade web applications and AI-powered pipelines for enterprise clients. Architecting full-stack solutions with React.js frontends, FastAPI backends, and LLM/RAG integrations.',
    tech:    ['React.js', 'FastAPI', 'LLM', 'RAG', 'PostgreSQL', 'Python'],
    dot:     'bg-primary-500',
  },
  {
    year:    'Jul 2025 – Nov 2025',
    role:    'Intern',
    company: 'JSpider',
    desc:    'Built responsive UIs with React.js and implemented backend systems with Java, PostgreSQL using JDBC and Hibernate. Applied DevOps best practices.',
    tech:    ['React.js', 'JavaScript', 'Java', 'JDBC', 'Hibernate', 'PostgreSQL'],
    dot:     'bg-violet-500',
  },
  {
    year:    'Sep 2024 – Feb 2025',
    role:    'App Developer Intern',
    company: 'Rooman Technologies',
    desc:    'Developed a full-featured Task Management System with authentication, CRUD operations, and MySQL database management using Java and JDBC.',
    tech:    ['Java', 'JDBC', 'MySQL'],
    dot:     'bg-accent-500',
  },
]

/* ── Inline skill icons SVG ────────────────────────────────────── */
const TechIcon = ({ name, className = 'w-8 h-8' }) => {
  const icons = {
    'React':      <svg className={className} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1.2" fill="none"><ellipse rx="9" ry="3.5" cx="12" cy="12"/><ellipse rx="9" ry="3.5" cx="12" cy="12" transform="rotate(60 12 12)"/><ellipse rx="9" ry="3.5" cx="12" cy="12" transform="rotate(120 12 12)"/></g></svg>,
    'Python':     <svg className={className} viewBox="0 0 24 24"><path fill="#3776AB" d="M11.9 2C7.8 2 8 3.8 8 3.8v2.1h4v.6H5.8C4 6.5 2 7.4 2 11.9s2.2 4.5 2.2 4.5h1.3v-2.1c0-2.5 2.2-4.4 4.5-4.4h4.4c2 0 3.6-1.6 3.6-3.6V4.9c0-2-1.7-2.9-3.6-2.9H11.9zm-1.2 1.6c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z"/><path fill="#FFD43B" d="M12.1 22c4.1 0 3.9-1.8 3.9-1.8v-2.1h-4v-.6h6.2c1.8 0 3.8-.9 3.8-5.4s-2.2-4.5-2.2-4.5h-1.3v2.1c0 2.5-2.2 4.4-4.5 4.4H9.6c-2 0-3.6 1.6-3.6 3.6v3.5c0 2 1.7 2.8 3.6 2.8h2.5zm1.2-1.6c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"/></svg>,
    'JavaScript': <svg className={className} viewBox="0 0 24 24"><rect width="24" height="24" rx="2" fill="#F7DF1E"/><text x="4" y="20" fontFamily="monospace" fontWeight="bold" fontSize="14" fill="#000">JS</text></svg>,
    'Java':       <svg className={className} viewBox="0 0 24 24"><path fill="#ED8B00" d="M8.7 17.5s-.9.5.7.7c1.9.2 2.9.2 5-.2 0 0 .6.4 1.3.7-4.7 2-10.6-.3-7-1.2zm-.6-2.5s-1 .8.6.9c2 .2 3.6.2 6.4-.3 0 0 .4.4 1 .6-5.7 1.7-12-.2-8-1.2z"/><path fill="#007396" d="M13.5 8.5c1.2 1.4-.3 2.6-.3 2.6s3-1.5 1.6-3.4c-1.3-1.8-2.3-2.7 3.1-5.7 0 0-8.4 2.1-4.4 6.5z"/><path fill="#ED8B00" d="M19.3 19.8s.7.6-.7.9c-2.7.8-11.1 1-13.4.1-.8-.4.7-.8 1.2-.9.5-.1.8-.1.8-.1-.9-.7-6.1 1.3-2.6 1.9 9.5 1.5 17.3-.7 14.7-1.9zM9 14.2s-4.5 1.1-1.6 1.5c1.2.2 3.6.1 5.8-.1 1.8-.2 3.6-.5 3.6-.5s-.6.3-1.1.5c-4.3 1.1-12.6.6-10.2-.5 2-1 3.5-.9 3.5-.9zm7.8 4.4c4.4-2.3 2.4-4.5.9-4.2-.3.1-.5.2-.5.2s.1-.2.4-.4c3.1-1.1 5.5 3.2-1 4.9 0 0 .1-.1.2-.5z"/><path fill="#007396" d="M14.5 2S17 4.5 12 7.5c-3.9 2.3-.9 3.7 0 5.2-1.7-1.5-3-2.9-2.1-4.1C11.1 6.6 15.3 5.5 14.5 2z"/><path fill="#ED8B00" d="M10 21.9c4.2.3 10.7-.2 10.8-2.4 0 0-.3.8-3.5 1.3-3.6.7-8 .6-10.6.2 0 0 .5.5 3.3.9z"/></svg>,
    'SQL':        <svg className={className} viewBox="0 0 24 24"><rect width="24" height="24" rx="2" fill="#00758F"/><text x="3" y="16" fontFamily="monospace" fontWeight="bold" fontSize="10" fill="white">SQL</text></svg>,
  }
  return icons[name] || <span className="text-2xl">{name[0]}</span>
}

/* ── Section wrapper with reveal ──────────────────────────────── */
function Section({ children, className = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/* ── Main component ────────────────────────────────────────────── */
export default function Home() {
  const [typedText, setTypedText] = useState('')
  const titles = ['Full Stack Developer', 'AI Engineer', 'React Specialist', 'FastAPI Developer', 'LLM/RAG Builder']
  const [titleIdx, setTitleIdx] = useState(0)
  const [charIdx,  setCharIdx]  = useState(0)
  const [deleting, setDeleting] = useState(false)

  /* Typewriter */
  useEffect(() => {
    const cur   = titles[titleIdx]
    const speed = deleting ? 45 : 95
    const t = setTimeout(() => {
      if (!deleting && charIdx < cur.length) {
        setTypedText(cur.slice(0, charIdx + 1)); setCharIdx(c => c + 1)
      } else if (deleting && charIdx > 0) {
        setTypedText(cur.slice(0, charIdx - 1)); setCharIdx(c => c - 1)
      } else if (!deleting && charIdx === cur.length) {
        setTimeout(() => setDeleting(true), 1800)
      } else if (deleting && charIdx === 0) {
        setDeleting(false); setTitleIdx(i => (i + 1) % titles.length)
      }
    }, speed)
    return () => clearTimeout(t)
  }, [charIdx, deleting, titleIdx])

  return (
    <>
      {/* ════════════════════════════════════════════ HERO ══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden
                          bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/30
                          dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30 pt-16">

        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-primary-400/10 dark:bg-primary-600/8 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] bg-accent-400/8 dark:bg-accent-600/8 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay:'1.5s'}} />
          <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-violet-400/8 dark:bg-violet-600/8 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay:'3s'}} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
               style={{backgroundImage:'linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />
        </div>

        <div className="section relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 w-full py-24">

          {/* ── Text side ── */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2
                            bg-emerald-50 dark:bg-emerald-900/20
                            text-emerald-700 dark:text-emerald-300
                            text-sm font-semibold rounded-full mb-6
                            border border-emerald-200 dark:border-emerald-800/60
                            shadow-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
              👋 Available for Opportunities
            </div>

            {/* H1 */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold
                           text-slate-900 dark:text-white leading-[1.05] mb-4 tracking-tight">
              Hi, I'm{' '}
              <span className="gradient-text">Prajwal</span>
            </h1>

            {/* Typewriter subtitle */}
            <div className="h-12 sm:h-14 mb-6">
              <p className="text-2xl sm:text-3xl font-semibold text-slate-600 dark:text-slate-300">
                {typedText}
                <span className="animate-pulse ml-0.5 text-primary-500 font-light">|</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Crafting intelligent, scalable systems — from sleek{' '}
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">React.js</strong> frontends
              to powerful{' '}
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">FastAPI</strong> backends
              and{' '}
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">LLM-powered AI pipelines</strong>.
              Based in Bangalore, India.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <Link
                to="/projects"
                id="hero-view-projects"
                className="btn-primary text-base px-8 py-4 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-glow"
              >
                View Projects <ArrowRight size={18} />
              </Link>
              <Link
                to="/blogs"
                id="hero-view-blogs"
                className="btn-secondary text-base px-8 py-4 rounded-xl group"
              >
                <BookOpen size={18} className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                View Blogs
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-10">
              {[
                { label: 'GitHub',    href: 'https://github.com/Prajwal590',                     path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' },
                { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/prajwal-m-615984280/', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl border border-slate-200 dark:border-gray-700
                             flex items-center justify-center
                             text-slate-500 dark:text-slate-400
                             hover:text-primary-600 dark:hover:text-primary-400
                             hover:border-primary-300 dark:hover:border-primary-700
                             hover:bg-primary-50 dark:hover:bg-primary-900/20
                             hover:shadow-glow-sm
                             transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d={path} />
                  </svg>
                </a>
              ))}
              <a
                href="mailto:prajwalmarapur1@gmail.com"
                aria-label="Email"
                className="w-11 h-11 rounded-xl border border-slate-200 dark:border-gray-700
                           flex items-center justify-center text-lg
                           hover:border-primary-300 dark:hover:border-primary-700
                           hover:bg-primary-50 dark:hover:bg-primary-900/20
                           hover:shadow-glow-sm transition-all duration-200"
              >
                📧
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-8 justify-center lg:justify-start">
              {[
                { value: '1+',  label: 'Years Exp.' },
                { value: '3+',  label: 'Projects' },
                { value: '10+', label: 'Technologies' },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-10 bg-slate-200 dark:bg-gray-700" />}
                  <div className="text-center">
                    <div className="text-2xl font-extrabold gradient-text leading-none">{value}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Profile image side ── */}
          <div className="relative flex-shrink-0 animate-fade-in" style={{animationDelay:'0.3s'}}>
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">

              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 blur-3xl opacity-20 animate-glow-pulse" />

              {/* Spinning decorative ring */}
              <div className="absolute inset-[-8px] rounded-full border-2 border-dashed border-primary-300/40 dark:border-primary-500/20 animate-spin-slow" />

              {/* Photo container */}
              <div className="relative w-full h-full rounded-full
                              border-4 border-white dark:border-gray-800
                              shadow-2xl overflow-hidden
                              bg-gradient-to-br from-primary-100 to-indigo-200 dark:from-primary-900 dark:to-indigo-900">
                <img
                  src="/profile.jpg"
                  alt="Prajwal Marapur — Full Stack Developer & AI Engineer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('flex','items-center','justify-center')
                    e.target.parentElement.innerHTML += '<span class="text-9xl select-none">👨‍💻</span>'
                  }}
                />
              </div>

              {/* Floating badge — React */}
              <div className="absolute -top-3 -right-4 bg-white dark:bg-gray-800 rounded-2xl px-4 py-2
                              shadow-lg border border-slate-100 dark:border-gray-700
                              flex items-center gap-2 animate-float">
                <span className="text-xl">⚛️</span>
                <span className="font-bold text-sm text-slate-700 dark:text-slate-200">React.js</span>
              </div>

              {/* Floating badge — AI */}
              <div className="absolute -bottom-3 -left-4 bg-white dark:bg-gray-800 rounded-2xl px-4 py-2
                              shadow-lg border border-slate-100 dark:border-gray-700
                              flex items-center gap-2 animate-float-delay">
                <span className="text-xl">🤖</span>
                <span className="font-bold text-sm text-slate-700 dark:text-slate-200">LLM / RAG</span>
              </div>

              {/* Floating badge — AI Engineer label */}
              <div className="absolute top-1/2 -right-16 -translate-y-1/2
                              bg-gradient-to-r from-primary-600 to-primary-500
                              rounded-2xl px-4 py-2 shadow-lg shadow-primary-500/30 animate-float"
                   style={{animationDelay:'1s'}}>
                <span className="font-bold text-white text-sm whitespace-nowrap">AI Engineer ✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                        text-slate-400 dark:text-slate-600 animate-bounce-soft">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-slate-300 dark:border-slate-700 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ ABOUT ══ */}
      <section className="section" id="about">
        <Section>
          <div className="text-center mb-16">
            <span className="section-label"><Sparkles size={13} /> About Me</span>
            <h2 className="section-title text-slate-900 dark:text-white">
              Who I <span className="gradient-text">Am</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 flex flex-col md:flex-row gap-10 items-start">

              {/* Left: Avatar + info */}
              <div className="flex flex-col items-center gap-5 flex-shrink-0 md:w-48">
                <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-primary-200 dark:border-primary-800
                                bg-gradient-to-br from-primary-100 to-indigo-200 dark:from-primary-900 dark:to-indigo-900">
                  <img
                    src="/profile.jpg"
                    alt="Prajwal Marapur"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML='<div class="w-full h-full flex items-center justify-center text-5xl">👨‍💻</div>' }}
                  />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5
                                bg-emerald-50 dark:bg-emerald-900/20
                                border border-emerald-200 dark:border-emerald-800/50 rounded-full">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Open to Work</span>
                </div>
                <div className="space-y-2.5 text-sm w-full">
                  {[
                    { icon: <MapPin size={13} />,       text: 'Bangalore, India' },
                    { icon: <Briefcase size={13} />,    text: 'Brightpath Technology' },
                    { icon: <GraduationCap size={13} />,text: 'B.E. CS, VTU — 8.5 CGPA' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <span className="text-primary-500 flex-shrink-0">{icon}</span>
                      <span className="text-xs">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Bio */}
              <div className="flex-1 space-y-5">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                  I'm a <strong className="text-slate-900 dark:text-white font-semibold">Full Stack Developer & AI Engineer</strong> with
                  a passion for building powerful, scalable web applications and intelligent AI-driven systems.
                  Currently working at <strong className="text-slate-900 dark:text-white font-semibold">Brightpath Technology & Services</strong> in
                  Bangalore, where I architect end-to-end solutions using modern tech stacks.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  My expertise spans <strong className="text-slate-900 dark:text-white font-semibold">React.js</strong> frontends,{' '}
                  <strong className="text-slate-900 dark:text-white font-semibold">FastAPI</strong> backends, and{' '}
                  <strong className="text-slate-900 dark:text-white font-semibold">LLM & RAG pipelines</strong>.
                  I love the intersection of software engineering and AI — building systems that are not just functional, but genuinely intelligent.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['🚀 Problem Solver', '🤖 AI Enthusiast', '💻 Open Source', '📐 Clean Code'].map(t => (
                    <span key={t} className="badge-primary">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="mailto:prajwalmarapur1@gmail.com" className="btn-primary text-sm">
                    Hire Me →
                  </a>
                  <a href="https://github.com/Prajwal590" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* ═══════════════════════════════════════ SKILLS ══ */}
      <section className="section pt-0" id="skills">
        <Section>
          <div className="text-center mb-16">
            <span className="section-label">🛠️ Tech Stack</span>
            <h2 className="section-title text-slate-900 dark:text-white">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="section-subtitle">Everything I use to build full-stack web apps and AI-powered systems.</p>
          </div>

          {/* Top row: skill icon cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { name: 'React',      color: 'text-cyan-500',    bg: 'bg-cyan-50  dark:bg-cyan-900/10',    label: 'React.js'    },
              { name: 'Python',     color: 'text-blue-500',    bg: 'bg-blue-50  dark:bg-blue-900/10',    label: 'Python'      },
              { name: 'JavaScript', color: 'text-yellow-500',  bg: 'bg-yellow-50 dark:bg-yellow-900/10', label: 'JavaScript'  },
              { name: 'Java',       color: 'text-orange-500',  bg: 'bg-orange-50 dark:bg-orange-900/10', label: 'Java'        },
              { name: 'SQL',        color: 'text-sky-500',     bg: 'bg-sky-50   dark:bg-sky-900/10',     label: 'SQL'         },
            ].map(({ name, color, bg, label }) => (
              <div key={name}
                   className={`skill-card w-28 ${bg} border`}>
                <TechIcon name={name} className="w-10 h-10" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{label}</span>
              </div>
            ))}
          </div>

          {/* Skill group cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {skillGroups.map(({ emoji, label, color, bg, border, skills }) => (
              <div key={label}
                   className={`card p-6 ${bg} border ${border}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md text-lg flex-shrink-0`}>
                    {emoji}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">{label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s} className="tech-badge">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* ══════════════════════════════════ EXPERIENCE ══ */}
      <section className="section pt-0" id="experience">
        <Section>
          <div className="text-center mb-16">
            <span className="section-label"><Briefcase size={13} /> Career</span>
            <h2 className="section-title text-slate-900 dark:text-white">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="section-subtitle">My professional journey so far.</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary-400 via-violet-400 to-accent-400 rounded-full" />
            <div className="space-y-8">
              {timelineItems.map((item, i) => (
                <div key={i} className="flex gap-8 pl-16 relative group">
                  {/* Dot */}
                  <div className={`timeline-dot ${item.dot} left-3.5 top-4 group-hover:scale-125 transition-transform duration-200`} />
                  <div className="card p-6 flex-1 group-hover:shadow-glow-sm group-hover:border-primary-200 dark:group-hover:border-primary-800/60">
                    <span className="text-xs font-mono font-bold text-primary-500 dark:text-primary-400">{item.year}</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{item.role}</h3>
                    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">{item.company}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map(t => (
                        <span key={t} className="tech-badge">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ═══════════════════════════════════ EDUCATION ══ */}
      <section className="section pt-0" id="education">
        <Section>
          <div className="text-center mb-16">
            <span className="section-label"><GraduationCap size={13} /> Education</span>
            <h2 className="section-title text-slate-900 dark:text-white">
              <span className="gradient-text">Education</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600
                              flex items-center justify-center text-3xl shadow-lg shadow-primary-500/20 flex-shrink-0">
                🎓
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Bachelor of Engineering — Computer Science
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                  Visvesvaraya Technological University (VTU)
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span>📅 2021 – 2025</span>
                  <span>🏆 CGPA: <strong className="text-slate-800 dark:text-slate-200">8.5 / 10</strong></span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Focused on software engineering, data structures, algorithms, operating systems, and ML foundations.
                  Completed hands-on projects in AI, web development, and database management.
                </p>
              </div>
              <div className="flex-shrink-0 text-center">
                <div className="w-20 h-20 rounded-full
                                bg-gradient-to-br from-primary-100 to-indigo-100 dark:from-primary-900/40 dark:to-indigo-900/40
                                border-2 border-primary-200 dark:border-primary-800
                                flex flex-col items-center justify-center shadow-sm">
                  <span className="text-2xl font-extrabold gradient-text leading-none">8.5</span>
                  <span className="text-xs text-slate-400">/10</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* ══════════════════════════════════════════ CTA ══ */}
      <section className="section pt-0">
        <Section>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-violet-600 to-indigo-600" />
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10"
                 style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)',backgroundSize:'30px 30px'}} />
            {/* Glow blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/10 rounded-full blur-2xl" />

            <div className="relative z-10 p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold mb-6">
                ✨ Let's create something great together
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Let's Build Something Amazing
              </h2>
              <p className="text-indigo-100 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                I'm open to full-time roles, freelance projects, and interesting collaborations
                in web dev & AI.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="mailto:prajwalmarapur1@gmail.com"
                  id="cta-hire-me"
                  className="px-8 py-4 bg-white text-primary-700 font-bold rounded-xl
                             hover:bg-indigo-50 transition-all duration-200 shadow-xl hover:shadow-2xl
                             hover:-translate-y-0.5"
                >
                  ✉️ Hire Me
                </a>
                <a
                  href="https://wa.me/8867851979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-xl
                             hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  💬 WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </Section>
      </section>
    </>
  )
}
