import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import {
  LayoutDashboard, BookOpen, LogOut, Plus, Pencil, Trash2,
  Sun, Moon, Eye, EyeOff, Code2, Menu, X, Search,
  ToggleLeft, ToggleRight, TrendingUp, FileText,
  CheckCircle, Clock, ChevronRight, ArrowLeft, Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getAllBlogs, addBlog, updateBlog, deleteBlog, toggleBlogStatus, formatDate
} from '../../utils/blogStore'

const NAV = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard',    desc: 'Overview & stats' },
  { id: 'blogs',     icon: BookOpen,        label: 'Manage Blogs', desc: 'Posts & drafts'   },
]

/* ══════════════════════════ BLOG FORM MODAL ══════════════════════ */
function BlogModal({ blog, onClose, onSave }) {
  const isEdit = !!blog
  const [form, setForm] = useState({
    title:   blog?.title   || '',
    content: blog?.content || '',
    tags:    blog?.tags?.join(', ') || '',
    status:  blog?.status  || 'draft',
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and content are required.')
      return
    }
    setSaving(true)
    await new Promise(r => setTimeout(r, 400))
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    onSave({ ...form, tags })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl
                      border border-slate-200 dark:border-gray-800 flex flex-col max-h-[90vh]
                      animate-scale-in">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
              <Sparkles size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isEdit ? 'Edit Blog Post' : 'New Blog Post'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center
                       text-slate-400 hover:text-slate-700 dark:hover:text-slate-200
                       hover:bg-slate-100 dark:hover:bg-gray-800 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">

            {/* Title */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="My awesome blog post…"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="input"
                required
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tags <span className="font-normal text-slate-400">(comma-separated)</span>
              </label>
              <input
                type="text"
                placeholder="React, TypeScript, Tutorial"
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                className="input"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Status</label>
              <div className="flex gap-3">
                {['draft', 'published'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, status: s }))}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 capitalize
                      ${form.status === s
                        ? s === 'published'
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/25'
                          : 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25'
                        : 'bg-white dark:bg-gray-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-gray-700 hover:border-slate-300'
                      }`}
                  >
                    {s === 'published' ? '✅ ' : '📝 '}{s}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Content <span className="text-red-500">*</span>{' '}
                <span className="font-normal text-slate-400">(Markdown supported)</span>
              </label>
              <textarea
                placeholder={`## Introduction\n\nStart writing your post here…\n\n\`\`\`js\nconsole.log('Hello world')\n\`\`\``}
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                rows={14}
                className="input font-mono text-sm resize-none leading-relaxed"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 dark:border-gray-800 flex-shrink-0">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button
              id="blog-save-btn"
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-60"
            >
              {saving
                ? <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Saving…
                  </span>
                : isEdit ? '💾 Save Changes' : '🚀 Publish Post'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ══════════════════════════ DELETE CONFIRM ═══════════════════════ */
function ConfirmDelete({ blog, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl
                      border border-slate-200 dark:border-gray-800 p-8 animate-scale-in">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center
                          border border-red-200 dark:border-red-800/50">
            <Trash2 size={28} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete Post?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-700 dark:text-slate-200">"{blog.title}"</strong>?
              <br />This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <button onClick={onCancel} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button onClick={onConfirm} className="btn-danger flex-1 justify-center">
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════ DASHBOARD VIEW ═══════════════════════ */
function DashboardView({ blogs, onNewPost }) {
  const published = blogs.filter(b => b.status === 'published').length
  const drafts    = blogs.filter(b => b.status === 'draft').length
  const recent    = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  const stats = [
    { icon: FileText,    label: 'Total Posts',  value: blogs.length, color: 'from-blue-500 to-indigo-600',    shadow: 'shadow-blue-500/20' },
    { icon: CheckCircle, label: 'Published',    value: published,    color: 'from-emerald-500 to-teal-600',   shadow: 'shadow-emerald-500/20' },
    { icon: Clock,       label: 'Drafts',       value: drafts,       color: 'from-amber-500 to-orange-500',   shadow: 'shadow-amber-500/20' },
    { icon: TrendingUp,  label: 'Total Reads',  value: '∞',          color: 'from-pink-500 to-rose-600',      shadow: 'shadow-pink-500/20' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Welcome back, Admin! Here's what's happening. 👋
          </p>
        </div>
        <button onClick={onNewPost} className="btn-primary">
          <Plus size={17} /> New Post
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color, shadow }) => (
          <div key={label}
               className="bg-white dark:bg-gray-900 rounded-2xl p-5
                          border border-slate-200 dark:border-gray-800
                          shadow-card hover:shadow-card-lg
                          transition-all duration-300 hover:-translate-y-1 group">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg ${shadow} mb-4`}>
              <Icon size={20} className="text-white" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white group-hover:gradient-text transition-colors">{value}</div>
            <div className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-gray-800">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <BookOpen size={14} className="text-white" />
            </div>
            Recent Posts
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">{blogs.length} total</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-gray-800">
          {recent.map(b => (
            <div key={b.id}
                 className="flex items-center gap-4 px-6 py-4
                            hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${b.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{b.title}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{formatDate(b.createdAt)}</p>
              </div>
              <span className={`badge flex-shrink-0 text-xs ${b.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                {b.status}
              </span>
            </div>
          ))}
          {recent.length === 0 && (
            <div className="flex flex-col items-center py-12 gap-3">
              <span className="text-4xl">📝</span>
              <p className="text-sm text-slate-400 dark:text-slate-500">No posts yet. Create your first one!</p>
              <button onClick={onNewPost} className="btn-primary text-sm">
                <Plus size={15} /> Create Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════ BLOGS TABLE VIEW ═════════════════════ */
function BlogsView({ blogs, onNew, onEdit, onDelete, onToggle }) {
  const [search, setSearch] = useState('')
  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Blogs</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            {blogs.length} post{blogs.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button onClick={onNew} className="btn-primary flex-shrink-0">
          <Plus size={17} /> New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search posts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800
                        flex flex-col items-center justify-center py-20 gap-4 text-center shadow-card">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-3xl">
            📝
          </div>
          <div>
            <h3 className="font-bold text-slate-700 dark:text-slate-200">No posts found</h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              {search ? `No results for "${search}"` : 'Create your first blog post to get started.'}
            </p>
          </div>
          {!search && (
            <button onClick={onNew} className="btn-primary mt-2">
              <Plus size={16} /> Create Post
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-card overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-gray-800/60 border-b border-slate-200 dark:border-gray-800">
                  <th className="text-left px-6 py-4 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Title</th>
                  <th className="text-left px-4 py-4 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Status</th>
                  <th className="text-left px-4 py-4 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Date</th>
                  <th className="text-right px-6 py-4 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {filtered.map(blog => (
                  <tr key={blog.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-gray-800/40 transition-colors duration-150 group">
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{blog.title}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {(blog.tags || []).slice(0, 3).map(t => (
                          <span key={t} className="text-xs font-mono text-slate-400 dark:text-slate-500
                                                    bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={blog.status === 'published' ? 'badge-success' : 'badge-warning'}>
                        {blog.status === 'published' ? '✅ Published' : '📝 Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400 dark:text-slate-500 whitespace-nowrap text-sm">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Toggle */}
                        <button
                          onClick={() => onToggle(blog.id)}
                          title={blog.status === 'published' ? 'Set to Draft' : 'Publish'}
                          className="w-9 h-9 rounded-xl flex items-center justify-center
                                     text-slate-400 hover:text-emerald-500
                                     hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                                     transition-all duration-200"
                        >
                          {blog.status === 'published'
                            ? <ToggleRight size={19} className="text-emerald-500" />
                            : <ToggleLeft size={19} />
                          }
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => onEdit(blog)}
                          title="Edit"
                          className="w-9 h-9 rounded-xl flex items-center justify-center
                                     text-slate-400 hover:text-primary-600
                                     hover:bg-primary-50 dark:hover:bg-primary-900/20
                                     transition-all duration-200"
                        >
                          <Pencil size={15} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => onDelete(blog)}
                          title="Delete"
                          className="w-9 h-9 rounded-xl flex items-center justify-center
                                     text-slate-400 hover:text-red-500
                                     hover:bg-red-50 dark:hover:bg-red-900/20
                                     transition-all duration-200"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden divide-y divide-slate-100 dark:divide-gray-800">
            {filtered.map(blog => (
              <div key={blog.id} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug">{blog.title}</p>
                  <span className={`flex-shrink-0 ${blog.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">{formatDate(blog.createdAt)}</p>
                <div className="flex gap-2">
                  <button onClick={() => onToggle(blog.id)} className="btn-ghost text-xs px-3 py-2">
                    {blog.status === 'published' ? '📝 Unpublish' : '✅ Publish'}
                  </button>
                  <button onClick={() => onEdit(blog)} className="btn-ghost text-xs px-3 py-2">
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog)}
                    className="btn-ghost text-red-500 dark:text-red-400 text-xs px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════ MAIN DASHBOARD ═══════════════════════ */
export default function AdminDashboard() {
  const { logout }           = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate             = useNavigate()

  const [activeTab,    setActiveTab]    = useState('dashboard')
  const [blogs,        setBlogs]        = useState([])
  const [modal,        setModal]        = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [sidebarOpen,  setSidebarOpen]  = useState(false)

  const refreshBlogs = useCallback(() => setBlogs(getAllBlogs()), [])
  useEffect(() => { refreshBlogs() }, [refreshBlogs])

  const handleSave = (formData) => {
    if (modal.mode === 'new') {
      addBlog(formData)
      toast.success('Blog post created successfully! 🎉')
    } else {
      updateBlog(modal.blog.id, formData)
      toast.success('Blog post updated! ✅')
    }
    refreshBlogs()
    setModal(null)
  }

  const handleDelete = () => {
    deleteBlog(deleteTarget.id)
    toast.error(`"${deleteTarget.title}" deleted.`)
    refreshBlogs()
    setDeleteTarget(null)
  }

  const handleToggle = (id) => {
    const updated = toggleBlogStatus(id)
    toast.success(`Post ${updated.status === 'published' ? 'published ✅' : 'moved to drafts 📝'}`)
    refreshBlogs()
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully.')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-gray-950">

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════════════════════════ SIDEBAR ══════════════════════ */}
      <aside className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col
                         bg-white dark:bg-gray-900
                         border-r border-slate-200 dark:border-gray-800
                         shadow-xl transition-transform duration-300
                         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto md:shadow-none`}>

        {/* Logo */}
        <div className="p-5 border-b border-slate-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl
                            flex items-center justify-center shadow-md shadow-primary-500/25">
              <Code2 size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Prajwal's Blog</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          {NAV.map(({ id, icon: Icon, label, desc }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                          transition-all duration-200 text-left group
                          ${activeTab === id
                            ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/25'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white'
                          }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105
                              ${activeTab === id ? 'bg-white/20' : 'bg-slate-100 dark:bg-gray-800'}`}>
                <Icon size={16} className={activeTab === id ? 'text-white' : 'text-slate-500 dark:text-slate-400'} />
              </div>
              <div className="flex-1 min-w-0">
                <div>{label}</div>
                <div className={`text-xs font-normal mt-0.5 ${activeTab === id ? 'text-white/70' : 'text-slate-400 dark:text-slate-500'}`}>
                  {desc}
                </div>
              </div>
              {activeTab !== id && <ChevronRight size={14} className="opacity-30 group-hover:opacity-60 flex-shrink-0" />}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-slate-100 dark:border-gray-800 space-y-1">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-gray-800
                       hover:text-slate-700 dark:hover:text-slate-200
                       transition-all duration-200"
          >
            <ArrowLeft size={15} /> View Portfolio
          </a>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-gray-800
                       hover:text-slate-700 dark:hover:text-slate-200
                       transition-all duration-200"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                       text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                       transition-all duration-200"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* ══════════════════════════ MAIN ═════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white dark:bg-gray-900
                           border-b border-slate-200 dark:border-gray-800
                           px-6 h-16 flex items-center justify-between flex-shrink-0
                           shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center
                         text-slate-500 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">Admin</span>
              <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
              <h1 className="font-bold text-slate-900 dark:text-white capitalize">{activeTab}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* New post quick button */}
            <button
              onClick={() => setModal({ mode: 'new' })}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold
                         text-primary-600 dark:text-primary-400
                         bg-primary-50 dark:bg-primary-900/20
                         hover:bg-primary-100 dark:hover:bg-primary-900/30
                         rounded-xl transition-all duration-200 border border-primary-200 dark:border-primary-800/50"
            >
              <Plus size={15} /> New Post
            </button>

            {/* Admin badge */}
            <div className="flex items-center gap-2 px-3 py-1.5
                            bg-slate-100 dark:bg-gray-800 rounded-xl
                            border border-slate-200 dark:border-gray-700">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              blogs={blogs}
              onNewPost={() => { setModal({ mode: 'new' }); setActiveTab('blogs') }}
            />
          )}
          {activeTab === 'blogs' && (
            <BlogsView
              blogs={blogs}
              onNew={() => setModal({ mode: 'new' })}
              onEdit={blog => setModal({ mode: 'edit', blog })}
              onDelete={blog => setDeleteTarget(blog)}
              onToggle={handleToggle}
            />
          )}
        </main>
      </div>

      {/* ── Modals ── */}
      {modal && (
        <BlogModal
          blog={modal.blog || null}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <ConfirmDelete
          blog={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}
