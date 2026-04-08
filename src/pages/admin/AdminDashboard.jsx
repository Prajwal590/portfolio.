import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import {
  LayoutDashboard, BookOpen, LogOut, Plus, Pencil, Trash2,
  Sun, Moon, Eye, EyeOff, Code2, Menu, X, Search, ToggleLeft,
  ToggleRight, TrendingUp, FileText, CheckCircle, Clock, ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getAllBlogs, addBlog, updateBlog, deleteBlog, toggleBlogStatus, formatDate
} from '../../utils/blogStore'

// ── Sidebar nav items ────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'blogs',     icon: BookOpen,        label: 'Manage Blogs' },
]

// ── Blog Form Modal ──────────────────────────────────────────────────────────
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-gray-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isEdit ? 'Edit Blog Post' : 'New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Title *</label>
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
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 capitalize
                      ${form.status === s
                        ? s === 'published'
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white dark:bg-gray-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Content * <span className="font-normal text-slate-400">(Markdown supported)</span>
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
                ? <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Saving…</span>
                : isEdit ? 'Save Changes' : 'Publish Post'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Confirm Delete Modal ─────────────────────────────────────────────────────
function ConfirmDelete({ blog, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-gray-800 p-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center">
            <Trash2 size={28} className="text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete Post?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Are you sure you want to delete <strong className="text-slate-700 dark:text-slate-200">"{blog.title}"</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 w-full pt-2">
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

// ── Dashboard Stats ──────────────────────────────────────────────────────────
function DashboardView({ blogs, onNewPost }) {
  const published = blogs.filter(b => b.status === 'published').length
  const drafts    = blogs.filter(b => b.status === 'draft').length
  const recent    = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)

  const stats = [
    { icon: FileText,     label: 'Total Posts',  value: blogs.length,  color: 'from-blue-500 to-indigo-500' },
    { icon: CheckCircle,  label: 'Published',    value: published,     color: 'from-emerald-500 to-teal-500' },
    { icon: Clock,        label: 'Drafts',        value: drafts,        color: 'from-amber-500 to-orange-500' },
    { icon: TrendingUp,   label: 'Total Reads',  value: '∞',           color: 'from-pink-500 to-rose-500' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Welcome back, Admin! Here's what's happening.</p>
        </div>
        <button onClick={onNewPost} className="btn-primary">
          <Plus size={17} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card p-5">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md mb-4`}>
              <Icon size={20} className="text-white" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{value}</div>
            <div className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <BookOpen size={18} className="text-primary-500" /> Recent Posts
        </h3>
        <div className="space-y-3">
          {recent.map(b => (
            <div key={b.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${b.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{b.title}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{formatDate(b.createdAt)}</p>
              </div>
              <span className={`badge flex-shrink-0 ${b.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                {b.status}
              </span>
            </div>
          ))}
          {recent.length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">No posts yet. Create your first one!</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Blog Table ───────────────────────────────────────────────────────────────
function BlogsView({ blogs, onNew, onEdit, onDelete, onToggle }) {
  const [search, setSearch] = useState('')
  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Blogs</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{blogs.length} posts total</p>
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

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="text-5xl">📝</div>
          <h3 className="font-bold text-slate-700 dark:text-slate-200">No posts found</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {search ? `No results for "${search}"` : 'Create your first blog post to get started.'}
          </p>
          {!search && <button onClick={onNew} className="btn-primary mt-2"><Plus size={16} /> Create Post</button>}
        </div>
      ) : (
        <div className="card overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-gray-800/60 border-b border-slate-200 dark:border-gray-800">
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 dark:text-slate-400">Title</th>
                  <th className="text-left px-4 py-4 font-semibold text-slate-500 dark:text-slate-400">Status</th>
                  <th className="text-left px-4 py-4 font-semibold text-slate-500 dark:text-slate-400">Date</th>
                  <th className="text-right px-5 py-4 font-semibold text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {filtered.map(blog => (
                  <tr key={blog.id} className="hover:bg-slate-50/70 dark:hover:bg-gray-800/40 transition-colors duration-150 group">
                    <td className="px-5 py-4 max-w-xs">
                      <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{blog.title}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {(blog.tags || []).slice(0, 3).map(t => (
                          <span key={t} className="text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={blog.status === 'published' ? 'badge-success' : 'badge-warning'}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle status */}
                        <button
                          onClick={() => onToggle(blog.id)}
                          title={blog.status === 'published' ? 'Set to Draft' : 'Publish'}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                        >
                          {blog.status === 'published' ? <ToggleRight size={19} className="text-emerald-500" /> : <ToggleLeft size={19} />}
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => onEdit(blog)}
                          title="Edit"
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                        >
                          <Pencil size={15} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => onDelete(blog)}
                          title="Delete"
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
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
              <div key={blog.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug">{blog.title}</p>
                  <span className={`flex-shrink-0 ${blog.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">{formatDate(blog.createdAt)}</p>
                <div className="flex gap-2">
                  <button onClick={() => onToggle(blog.id)} className="btn-ghost text-xs px-3 py-1.5">
                    {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => onEdit(blog)} className="btn-ghost text-xs px-3 py-1.5">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => onDelete(blog)} className="btn-ghost text-red-500 dark:text-red-400 text-xs px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-900/20">
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

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [activeTab,   setActiveTab]   = useState('dashboard')
  const [blogs,       setBlogs]       = useState([])
  const [modal,       setModal]       = useState(null)   // null | { mode:'new'|'edit', blog? }
  const [deleteTarget,setDeleteTarget]= useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Load blogs
  const refreshBlogs = useCallback(() => setBlogs(getAllBlogs()), [])
  useEffect(() => { refreshBlogs() }, [refreshBlogs])

  // CRUD handlers
  const handleSave = (formData) => {
    if (modal.mode === 'new') {
      addBlog(formData)
      toast.success('Blog post created successfully! 🎉')
    } else {
      updateBlog(modal.blog.id, formData)
      toast.success('Blog post updated successfully! ✅')
    }
    refreshBlogs()
    setModal(null)
  }

  const handleDelete = () => {
    deleteBlog(deleteTarget.id)
    toast.error(`"${deleteTarget.title}" has been deleted.`)
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
      {/* ── Sidebar ── */}
      <>
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-slate-200 dark:border-gray-800 flex flex-col z-40 transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto`}
        >
          {/* Logo */}
          <div className="p-6 border-b border-slate-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Prajwal's Portfolio</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            {NAV.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left
                  ${activeTab === id
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                <Icon size={18} />
                {label}
                {activeTab !== id && <ChevronRight size={14} className="ml-auto opacity-40" />}
              </button>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-slate-100 dark:border-gray-800 space-y-2">
            <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all duration-200">
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200">
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </aside>
      </>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 px-6 h-16 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all"
          >
            <Menu size={20} />
          </button>
          <div className="hidden md:block">
            <h1 className="font-bold text-slate-900 dark:text-white capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-gray-800 rounded-xl">
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

      {/* Modals */}
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
