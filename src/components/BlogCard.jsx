/**
 * BlogCard — premium card for blog list with hover animation, date, read-more
 */
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { formatDate } from '../utils/blogStore'

function readingTime(text) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// Deterministic color for tags based on tag text
function tagColor(tag) {
  const colors = [
    'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50',
    'bg-blue-100  dark:bg-blue-900/30  text-blue-700  dark:text-blue-300  border-blue-200  dark:border-blue-800/50',
    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
    'bg-amber-100 dark:bg-amber-900/30  text-amber-700  dark:text-amber-300  border-amber-200  dark:border-amber-800/50',
    'bg-rose-100  dark:bg-rose-900/30   text-rose-700   dark:text-rose-300   border-rose-200   dark:border-rose-800/50',
    'bg-cyan-100  dark:bg-cyan-900/30   text-cyan-700   dark:text-cyan-300   border-cyan-200   dark:border-cyan-800/50',
  ]
  const idx = tag.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length
  return colors[idx]
}

export default function BlogCard({ blog }) {
  const mins = readingTime(blog.content)
  const isPublished = blog.status === 'published'

  return (
    <article className="group relative bg-white dark:bg-gray-900 rounded-2xl
                        border border-slate-200/80 dark:border-gray-800/80
                        shadow-card overflow-hidden
                        transition-all duration-300 ease-out
                        hover:-translate-y-2 hover:shadow-card-lg hover:border-primary-200 dark:hover:border-primary-800/60
                        flex flex-col">

      {/* Top accent bar — gradient on hover */}
      <div className="h-1 w-full bg-gradient-to-r from-primary-400 via-violet-400 to-accent-400
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Status + read time row */}
        <div className="flex items-center justify-between">
          <span className={isPublished ? 'badge-success' : 'badge-warning'}>
            {isPublished ? '● Published' : '○ Draft'}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Clock size={12} />
            <span>{mins} min read</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug
                       group-hover:text-primary-600 dark:group-hover:text-primary-400
                       transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {blog.excerpt}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${tagColor(tag)}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-gray-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Calendar size={12} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <Link
            to={`/blog/${blog.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold
                       text-primary-600 dark:text-primary-400
                       hover:gap-2.5 transition-all duration-200
                       bg-primary-50 dark:bg-primary-900/20
                       px-3 py-1.5 rounded-lg
                       hover:bg-primary-100 dark:hover:bg-primary-900/30"
          >
            Read more <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  )
}
