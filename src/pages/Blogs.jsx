import { useState, useEffect, useMemo } from 'react'
import { Search, BookOpen, Filter } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import { BlogCardSkeleton } from '../components/Skeleton'
import { getAllBlogs } from '../utils/blogStore'

export default function Blogs() {
  const [blogs, setBlogs]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('published')   // 'published' | 'draft' | 'all'

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
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-gray-950 dark:to-indigo-950/20 border-b border-slate-200 dark:border-gray-800">
        <div className="section pb-16">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Blog</span>
          </div>
          <h1 className="section-title text-slate-900 dark:text-white">
            Tech <span className="gradient-text">Articles</span>
          </h1>
          <p className="section-subtitle">
            Deep dives into web development, software architecture, and the tools I use every day.
          </p>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
            <div className="flex gap-2">
              {[
                { value: 'published', label: 'Published' },
                { value: 'draft',     label: 'Drafts' },
                { value: 'all',       label: 'All' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border
                    ${filter === value
                      ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                      : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog grid */}
      <div className="section">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-5xl">
              📭
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">No articles found</h3>
            <p className="text-slate-400 dark:text-slate-500 max-w-sm">
              {search
                ? `No results match "${search}". Try a different search term.`
                : 'No blog posts in this category yet. Check back soon!'}
            </p>
            {search && (
              <button onClick={() => setSearch('')} className="btn-secondary">
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filtered.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-8">
            Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}
