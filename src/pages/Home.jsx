import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Code2, Server, Database, Globe,
  Layers, Terminal, Cpu, Zap, Brain, Camera, Wrench
} from 'lucide-react'

// ── Real Skills (from portfolio HTML) ───────────────────────────────────────
const skillGroups = [
  {
    icon: '⌨️',
    label: 'Languages',
    color: 'from-violet-500 to-purple-600',
    skills: ['Java', 'Python'],
  },
  {
    icon: '⚙️',
    label: 'Backend',
    color: 'from-green-500 to-emerald-600',
    skills: ['FastAPI', 'RESTful APIs', 'Hibernate', 'Spring Boot'],
  },
  {
    icon: '🎨',
    label: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    skills: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML5'],
  },
  {
    icon: '🤖',
    label: 'AI / ML',
    color: 'from-pink-500 to-rose-500',
    skills: ['LLM Integration', 'RAG', 'Embeddings', 'YOLOv8', 'OpenCV', 'Gen AI'],
  },
  {
    icon: '🗃️',
    label: 'Databases',
    color: 'from-amber-500 to-orange-500',
    skills: ['PostgreSQL', 'MySQL', 'PL/SQL', 'SQL'],
  },
  {
    icon: '🚀',
    label: 'DevOps',
    color: 'from-slate-500 to-gray-700',
    skills: ['Docker', 'Git', 'CI/CD', 'AWS'],
  },
]

// ── Real Experience (from portfolio HTML) ────────────────────────────────────
const timelineItems = [
  {
    year: 'Nov 2025 – Apr 2026',
    role: 'Software Developer',
    company: 'Brightpath Technology & Services',
    desc: 'Building production-grade web applications and AI-powered pipelines for enterprise clients. Architecting full-stack solutions with React.js frontends, FastAPI backends, and LLM/RAG integrations that deliver intelligent, data-driven user experiences.',
    tech: ['React.js', 'FastAPI', 'LLM', 'RAG', 'PostgreSQL', 'Python'],
  },
  {
    year: 'Jul 2025 – Nov 2025',
    role: 'Intern',
    company: 'JSpider',
    desc: 'Built responsive and dynamic user interfaces using React.js, HTML, CSS, and JavaScript. Designed and implemented backend systems with Java, integrating PostgreSQL using JDBC and Hibernate. Applied DevOps practices for reliable and high-performing applications.',
    tech: ['React.js', 'JavaScript', 'Java', 'JDBC', 'Hibernate', 'PostgreSQL', 'DevOps'],
  },
  {
    year: 'Sep 2024 – Feb 2025',
    role: 'App Developer Intern',
    company: 'Rooman Technologies',
    desc: 'Developed a full-featured Task Management System with user authentication, CRUD operations, and database management using Java and JDBC, delivering a robust and scalable application.',
    tech: ['Java', 'JDBC', 'MySQL', 'Task Management'],
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [typedText, setTypedText] = useState('')
  const titles = [
    'Full Stack Developer',
    'AI Engineer',
    'React.js Specialist',
    'FastAPI Developer',
    'LLM/RAG Builder',
  ]
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex]   = useState(0)
  const [deleting, setDeleting]     = useState(false)

  // Typewriter effect
  useEffect(() => {
    const current = titles[titleIndex]
    const speed   = deleting ? 50 : 100
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setTypedText(current.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      } else if (deleting && charIndex > 0) {
        setTypedText(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1800)
      } else if (deleting && charIndex === 0) {
        setDeleting(false)
        setTitleIndex(i => (i + 1) % titles.length)
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, titleIndex])

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/20 pt-16">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/10 dark:bg-primary-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        <div className="section relative z-10 flex flex-col lg:flex-row items-center gap-16 w-full">
          {/* Text */}
          <div className="flex-1 animate-slide-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold rounded-full mb-6 border border-primary-200 dark:border-primary-800">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
              👋 Available for Opportunities
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
              Hi, I'm{' '}
              <span className="gradient-text">Prajwal</span>
            </h1>

            <div className="h-12 mb-6">
              <p className="text-2xl sm:text-3xl font-semibold text-slate-600 dark:text-slate-300">
                {typedText}
                <span className="animate-pulse ml-0.5 text-primary-500">|</span>
              </p>
            </div>

            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Crafting intelligent, scalable systems — from sleek <strong className="text-slate-700 dark:text-slate-200">React.js</strong> frontends
              to powerful <strong className="text-slate-700 dark:text-slate-200">FastAPI</strong> backends
              and <strong className="text-slate-700 dark:text-slate-200">LLM-powered AI pipelines</strong>.
              Based in Bangalore, India.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/projects" className="btn-primary text-base px-8 py-3.5">
                View My Work <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:prajwalmarapur1@gmail.com"
                className="btn-secondary text-base px-8 py-3.5"
              >
                Contact Me
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-10 justify-center lg:justify-start">
              {[
                { label: 'GitHub',    href: 'https://github.com/Prajwal590',                        svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/prajwal-m-615984280/',     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { label: 'Instagram', href: 'https://www.instagram.com/prajwal_102',                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
              {[
                { value: '1+',  label: 'Years Exp.' },
                { value: '3+',  label: 'Projects' },
                { value: '10+', label: 'Technologies' },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-10 bg-slate-200 dark:bg-gray-700" />}
                  <div className="text-center">
                    <div className="text-2xl font-extrabold gradient-text">{value}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="relative flex-shrink-0 animate-fade-in">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 blur-2xl opacity-30 animate-pulse-slow" />
              <div className="relative w-full h-full rounded-full border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-indigo-200 dark:from-primary-900 dark:to-indigo-900 flex items-center justify-center">
                <span className="text-9xl select-none">👨‍💻</span>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 shadow-lg border border-slate-100 dark:border-gray-700 flex items-center gap-2 animate-fade-in">
                <span className="text-xl">⚛️</span>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">React.js</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 shadow-lg border border-slate-100 dark:border-gray-700 flex items-center gap-2 animate-fade-in">
                <span className="text-xl">🤖</span>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">LLM / RAG</span>
              </div>
              <div className="absolute top-1/2 -right-14 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl px-4 py-2 shadow-lg animate-fade-in">
                <span className="font-bold text-white text-sm whitespace-nowrap">AI Engineer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 animate-bounce">
          <span className="text-xs font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-slate-300 dark:border-slate-700 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section">
        <h2 className="section-title text-slate-900 dark:text-white">
          Who I <span className="gradient-text">Am</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar + info */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-100 to-indigo-200 dark:from-primary-900 dark:to-indigo-900 flex items-center justify-center text-5xl shadow-md">
                👨‍💻
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Open to Work</span>
              </div>
              {/* Info items */}
              <div className="space-y-2 text-sm w-full">
                {[
                  { icon: '📍', text: 'Bangalore, India' },
                  { icon: '🏢', text: 'Brightpath Technology & Services' },
                  { icon: '🎓', text: 'B.E. CS, VTU — CGPA 8.5/10' },
                  { icon: '⚡', text: 'React.js · FastAPI · LLM/RAG' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span>{icon}</span><span className="text-xs">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 space-y-4">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                I'm a <strong className="text-slate-900 dark:text-white">Full Stack Developer & AI Engineer</strong> with a passion for building powerful, scalable web applications and intelligent AI-driven systems. Currently working at <strong className="text-slate-900 dark:text-white">Brightpath Technology and Services</strong> in Bangalore, where I architect end-to-end solutions using modern tech stacks.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                My expertise spans across <strong className="text-slate-900 dark:text-white">React.js</strong> frontends, <strong className="text-slate-900 dark:text-white">FastAPI</strong> backends, and cutting-edge <strong className="text-slate-900 dark:text-white">LLM & RAG pipelines</strong>. I love the intersection of software engineering and AI — building systems that are not just functional, but genuinely intelligent.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                When I'm not pushing commits, I'm exploring new ML research, contributing to open source, or fine-tuning language model integrations for real-world use cases.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['🚀 Problem Solver', '🤖 AI Enthusiast', '💻 Open Source', '📐 Clean Code'].map(t => (
                  <span key={t} className="badge-primary">{t}</span>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
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
      </section>

      {/* ── Skills ── */}
      <section className="section pt-0">
        <h2 className="section-title text-slate-900 dark:text-white">
          My <span className="gradient-text">Tech Stack</span>
        </h2>
        <p className="section-subtitle">Everything I use to build full-stack web apps and AI-powered systems.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skillGroups.map(({ icon, label, color, skills }) => (
            <div key={label} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md text-lg`}>
                  {icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="badge-primary font-mono text-xs">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience Timeline ── */}
      <section className="section pt-0">
        <h2 className="section-title text-slate-900 dark:text-white">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p className="section-subtitle">My professional journey so far.</p>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-accent-400 rounded-full" />
          <div className="space-y-10">
            {timelineItems.map((item, i) => (
              <div key={i} className="flex gap-8 pl-16 relative">
                <div className="absolute left-3.5 top-1.5 w-5 h-5 rounded-full border-4 border-white dark:border-gray-950 bg-primary-500 shadow-md shadow-primary-500/30" />
                <div className="card p-6 flex-1">
                  <span className="text-xs font-mono font-semibold text-primary-500 dark:text-primary-400">{item.year}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{item.role}</h3>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{item.company}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map(t => (
                      <span key={t} className="text-xs font-mono bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="section pt-0">
        <h2 className="section-title text-slate-900 dark:text-white">
          <span className="gradient-text">Education</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
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
                Focused on software engineering, data structures, algorithms, operating systems, and machine learning foundations. Completed several hands-on projects in AI, web development, and database management.
              </p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-indigo-100 dark:from-primary-900/40 dark:to-indigo-900/40 border-2 border-primary-200 dark:border-primary-800 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold gradient-text leading-none">8.5</span>
                <span className="text-xs text-slate-400">/10</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section pt-0">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-600 via-indigo-600 to-accent-600 p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDZ2Nmg2di02aC02em0xMiAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Let's Build Something Amazing</h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-lg mx-auto">
              I'm open to full-time roles, freelance projects, and interesting collaborations in web dev & AI.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="mailto:prajwalmarapur1@gmail.com"
                className="px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg"
              >
                Hire Me
              </a>
              <a
                href="https://wa.me/8867851979"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
              >
                WhatsApp Chat →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
