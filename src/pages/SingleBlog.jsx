import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { getBlogById, formatDate } from '../utils/blogStore'
import { SingleBlogSkeleton } from '../components/Skeleton'

/** Very simple markdown-like renderer (no external lib needed) */
function renderContent(raw) {
  const lines = raw.split('\n')
  const html = []
  let inCode = false
  let codeBuffer = []
  let inList = false
  let listItems = []

  const flushList = () => {
    if (listItems.length) {
      html.push(`<ul>${listItems.map(li => `<li>${li}</li>`).join('')}</ul>`)
      listItems = []
      inList = false
    }
  }

  lines.forEach((line, i) => {
    // Code fences
    if (line.trim().startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${codeBuffer.join('\n')}</code></pre>`)
        codeBuffer = []
        inCode = false
      } else {
        flushList()
        inCode = true
      }
      return
    }
    if (inCode) { codeBuffer.push(line); return }

    // List items
    if (line.trim().startsWith('- ')) {
      inList = true
      listItems.push(inline(line.trim().slice(2)))
      return
    } else {
      flushList()
    }

    // Headings
    if (line.startsWith('## '))  { html.push(`<h2>${inline(line.slice(3))}</h2>`); return }
    if (line.startsWith('### ')) { html.push(`<h3>${inline(line.slice(4))}</h3>`); return }
    if (line.startsWith('# '))   { html.push(`<h1>${inline(line.slice(2))}</h1>`); return }

    // Blockquote
    if (line.startsWith('> ')) { html.push(`<blockquote>${inline(line.slice(2))}</blockquote>`); return }

    // HR
    if (line.trim() === '---') { html.push('<hr />'); return }

    // Paragraph
    if (line.trim()) {
      html.push(`<p>${inline(line)}</p>`)
    }
  })

  flushList()
  return html.join('\n')
}

function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
}

export default function SingleBlog() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      const found = getBlogById(id)
      if (!found) setNotFound(true)
      else setBlog(found)
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [id])

  const readingTime = blog
    ? Math.max(1, Math.ceil(blog.content.trim().split(/\s+/).length / 200))
    : 0

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Blog
        </button>

        {loading ? (
          <SingleBlogSkeleton />
        ) : notFound ? (
          /* 404 state */
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center animate-fade-in">
            <div className="text-7xl">😕</div>
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">Post not found</h2>
            <p className="text-slate-400 dark:text-slate-500">This blog post doesn't exist or may have been deleted.</p>
            <Link to="/blogs" className="btn-primary">Browse all posts</Link>
          </div>
        ) : (
          <article className="animate-fade-in">
            {/* Status */}
            <div className="flex items-center gap-3 mb-6">
              <span className={blog.status === 'published' ? 'badge-success' : 'badge-warning'}>
                {blog.status === 'published' ? '● Published' : '○ Draft'}
              </span>
              {(blog.tags || []).map(tag => (
                <span key={tag} className="badge-primary text-xs">{tag}</span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400 dark:text-slate-500 mb-10 pb-10 border-b border-slate-200 dark:border-gray-800">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {readingTime} min read
              </span>
            </div>

            {/* Content */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
            />

            {/* Footer nav */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-gray-800 flex items-center justify-between">
              <Link to="/blogs" className="btn-secondary text-sm">
                <ArrowLeft size={15} /> All Posts
              </Link>
              <Link to="/projects" className="btn-ghost text-sm">
                View Projects →
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
