import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, BookOpen, Share2, ArrowRight } from 'lucide-react'
import { getBlogById, formatDate } from '../utils/blogStore'
import { SingleBlogSkeleton } from '../components/Skeleton'

/* Very simple markdown renderer */
function renderContent(raw) {
  const lines  = raw.split('\n')
  const html   = []
  let inCode   = false
  let codeBuf  = []
  let inList   = false
  let listItems= []

  const flushList = () => {
    if (listItems.length) {
      html.push(`<ul>${listItems.map(li => `<li>${li}</li>`).join('')}</ul>`)
      listItems = []
      inList    = false
    }
  }

  lines.forEach(line => {
    if (line.trim().startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${codeBuf.join('\n')}</code></pre>`)
        codeBuf = []; inCode = false
      } else { flushList(); inCode = true }
      return
    }
    if (inCode) { codeBuf.push(line); return }
    if (line.trim().startsWith('- ')) {
      inList = true; listItems.push(inline(line.trim().slice(2))); return
    } else { flushList() }
    if (line.startsWith('## '))  { html.push(`<h2>${inline(line.slice(3))}</h2>`); return }
    if (line.startsWith('### ')) { html.push(`<h3>${inline(line.slice(4))}</h3>`); return }
    if (line.startsWith('# '))   { html.push(`<h1>${inline(line.slice(2))}</h1>`); return }
    if (line.startsWith('> '))   { html.push(`<blockquote>${inline(line.slice(2))}</blockquote>`); return }
    if (line.trim() === '---')   { html.push('<hr />'); return }
    if (line.trim())             { html.push(`<p>${inline(line)}</p>`) }
  })
  flushList()
  return html.join('\n')
}

function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/`(.+?)`/g,       '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
}

function readingTime(text) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200))
}

export default function SingleBlog() {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [blog,     setBlog]     = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied,   setCopied]   = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      const found = getBlogById(id)
      if (!found) setNotFound(true)
      else setBlog(found)
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [id])

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const mins = blog ? readingTime(blog.content) : 0

  return (
    <div className="pt-16 min-h-screen bg-slate-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold
                     text-slate-500 dark:text-slate-400
                     hover:text-primary-600 dark:hover:text-primary-400
                     transition-all duration-200 mb-10 group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Blog
        </button>

        {/* Loading */}
        {loading && <SingleBlogSkeleton />}

        {/* Not found */}
        {!loading && notFound && (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-3xl bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-5xl">
              😕
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">Post not found</h2>
              <p className="text-slate-400 dark:text-slate-500 max-w-sm">
                This blog post doesn't exist or may have been removed.
              </p>
            </div>
            <Link to="/blogs" className="btn-primary">
              <BookOpen size={16} /> Browse all posts
            </Link>
          </div>
        )}

        {/* Article */}
        {!loading && blog && (
          <article className="animate-fade-in">

            {/* Header card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-slate-200 dark:border-gray-800
                            shadow-card p-8 mb-8">

              {/* Status + Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={blog.status === 'published' ? 'badge-success' : 'badge-warning'}>
                  {blog.status === 'published' ? '● Published' : '○ Draft'}
                </span>
                {(blog.tags || []).map(tag => (
                  <span key={tag} className="badge-primary text-xs">#{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white
                             leading-tight tracking-tight mb-6">
                {blog.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-4
                              text-sm text-slate-400 dark:text-slate-500">
                <div className="flex flex-wrap items-center gap-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {formatDate(blog.createdAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {mins} min read
                  </span>
                </div>

                {/* Share button */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                             bg-slate-100 dark:bg-gray-800
                             text-slate-600 dark:text-slate-400
                             hover:bg-primary-50 dark:hover:bg-primary-900/20
                             hover:text-primary-600 dark:hover:text-primary-400
                             border border-slate-200 dark:border-gray-700
                             transition-all duration-200"
                >
                  <Share2 size={12} />
                  {copied ? '✅ Copied!' : 'Share'}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-slate-200 dark:border-gray-800
                            shadow-card p-8 mb-8">
              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
              />
            </div>

            {/* Bottom nav */}
            <div className="flex items-center justify-between gap-4">
              <Link to="/blogs" className="btn-secondary text-sm">
                <ArrowLeft size={15} /> All Posts
              </Link>
              <Link to="/projects" className="btn-ghost text-sm group">
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
