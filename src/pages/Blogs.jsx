import { useState, useEffect, useMemo } from 'react'
import { Search, BookOpen, Filter, Rss } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import { BlogCardSkeleton } from '../components/Skeleton'
import { getAllBlogs } from '../utils/blogStore'

const FILTERS = [
  { value: 'published', label: 'Published', icon: '✅' },
  { value: 'draft',     label: 'Drafts',    icon: '📝' },
  { value: 'all',       label: 'All',       icon: '🗂️' },
]

export default function Blogs() {
  const [blogs,   setBlogs]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('published')

  useEffect(() => {
    const t = setTimeout(() => {
      setBlogs(getAllBlogs())
      setLoading(false)
    }, 700)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return blogs
      .filter(b => {
        if (filter === 'published') return b.status === 'published'
        if (filter === 'draft')     return b.status === 'draft'
        return true
      })
      .filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        (b.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
      )
  }, [blogs, search, filter])

  return (
    <div className="pt-16">

      {/* ── Hero header ── */}
      <div className="relative bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/40
                      dark:from-gray-950 dark:via-violet-950/20 dark:to-indigo-950/20
                      border-b border-slate-200 dark:border-gray-800 overflow-hidden">

        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-400/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-400/8 rounded-full blur-3xl" />
        </div>

        <div className="section pb-16 pt-16 relative z-10">
          {/* Label */}
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="section-label">
              <Rss size={13} /> Tech Blog
            </span>
          </div>

          <h1 className="section-title text-slate-900 dark:text-white">
            Tech <span className="gradient-text">Articles</span>
          </h1>
          <p className="section-subtitle">
            Deep dives into web development, software architecture, and the tools I use every day.
          </p>

          {/* ── Search + Filter ── */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles by title, tag..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 bg-slate-100 dark:bg-gray-800 rounded-xl p-1">
              {FILTERS.map(({ value, label, icon }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold
                              transition-all duration-200 whitespace-nowrap
                              ${filter === value
                                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                              }`}
                >
                  <span className="text-xs">{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Blog grid ── */}
      <div className="section">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)}
          </div>

        ) : filtered.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center animate-fade-in">
            <div className="relative">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20
                              flex items-center justify-center text-5xl shadow-inner border border-slate-200 dark:border-gray-700">
                📭
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-lg">
                🔍
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                {search ? 'No articles found' : 'No blogs available'}
              </h3>
              <p className="text-slate-400 dark:text-slate-500 max-w-sm leading-relaxed">
                {search
                  ? `No results match "${search}". Try a different search term or clear your search.`
                  : 'No blog posts in this category yet. Check back soon for new content! 📝'
                }
              </p>
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="btn-secondary"
              >
                ✕ Clear Search
              </button>
            )}
          </div>

        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {filtered.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* Count */}
        {!loading && filtered.length > 0 && (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-10">
            Showing <strong className="text-slate-700 dark:text-slate-300">{filtered.length}</strong> article{filtered.length !== 1 ? 's' : ''}
            {search && (
              <span> for "<strong className="text-primary-600 dark:text-primary-400">{search}</strong>"</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
