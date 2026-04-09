import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/',        label: 'Home'     },
  { to: '/projects',label: 'Projects' },
  { to: '/blogs',   label: 'Blog'     },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location])

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl shadow-sm border-b border-slate-200/60 dark:border-gray-800/60'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Prajwal Portfolio Home">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow-sm group-hover:scale-105 transition-all duration-300">
            <span className="text-white font-black text-sm leading-none select-none">PM</span>
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
            Prajwal<span className="text-primary-500">.</span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* ── Desktop right actions ── */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            id="theme-toggle"
            className="w-9 h-9 rounded-lg flex items-center justify-center
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-gray-800
                       hover:text-slate-900 dark:hover:text-white
                       transition-all duration-200 border border-transparent
                       hover:border-slate-200 dark:hover:border-gray-700"
          >
            {isDark
              ? <Sun  size={17} className="transition-transform duration-300 rotate-0 hover:rotate-12" />
              : <Moon size={17} className="transition-transform duration-300" />
            }
          </button>

          {/* Hire Me CTA */}
          <a
            href="mailto:prajwalmarapur1@gmail.com"
            id="hire-me-nav"
            className="px-4 py-2 text-sm font-semibold text-white
                       bg-gradient-to-r from-primary-600 to-primary-500
                       hover:from-primary-700 hover:to-primary-600
                       rounded-lg transition-all duration-200
                       shadow-sm hover:shadow-glow-sm"
          >
            Hire Me
          </a>

          {/* Admin link */}
          <Link
            to="/admin/login"
            id="admin-nav-link"
            className="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400
                       hover:text-slate-800 dark:hover:text-white
                       rounded-lg transition-all duration-200
                       hover:bg-slate-100 dark:hover:bg-gray-800"
          >
            Admin
          </Link>
        </div>

        {/* ── Mobile controls ── */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-lg flex items-center justify-center
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="w-9 h-9 rounded-lg flex items-center justify-center
                       text-slate-600 dark:text-slate-300
                       hover:bg-slate-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            {menuOpen
              ? <X    size={20} className="animate-scale-in" />
              : <Menu size={20} className="animate-scale-in" />
            }
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-gray-800 px-4 pb-4 pt-2">
          <div className="space-y-1 mb-3">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                  ${isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-gray-800">
            <a
              href="mailto:prajwalmarapur1@gmail.com"
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white
                         bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl"
            >
              📧 Hire Me — prajwalmarapur1@gmail.com
            </a>
            <Link
              to="/admin/login"
              className="flex items-center justify-center px-4 py-3 text-sm font-medium
                         text-slate-600 dark:text-slate-300
                         border border-slate-200 dark:border-gray-700 rounded-xl
                         hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
            >
              🔐 Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
