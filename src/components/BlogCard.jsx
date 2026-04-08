/**
 * BlogCard - reusable card for blog list
 */
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '../utils/blogStore'

function readingTime(text) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function BlogCard({ blog }) {
  return (
    <article className="card p-6 flex flex-col gap-4 group cursor-pointer">
      {/* Status badge */}
      <div className="flex items-center justify-between">
        <span className={blog.status === 'published' ? 'badge-success' : 'badge-warning'}>
          {blog.status === 'published' ? '● Published' : '○ Draft'}
        </span>
        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Clock size={12} />
          <span>{readingTime(blog.content)} min read</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
        {blog.title}
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
        {blog.excerpt}
      </p>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="badge-primary text-xs">{tag}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-gray-800">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <Calendar size={12} />
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <Link
          to={`/blog/${blog.id}`}
          className="flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:gap-2 transition-all duration-200"
        >
          Read more <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  )
}
