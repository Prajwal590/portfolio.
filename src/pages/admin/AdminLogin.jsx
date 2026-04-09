import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Eye, EyeOff, Lock, User, Sun, Moon, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth()
  const { isDark, toggleTheme }    = useTheme()
  const navigate = useNavigate()

  const [form,     setForm]     = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.username || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const result = login(form.username, form.password)
    setLoading(false)
    if (result.success) {
      toast.success('Welcome back, Admin! 👋')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid credentials. Try admin / admin123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden
                    bg-gradient-to-br from-slate-950 via-indigo-950 to-gray-950 px-4">

      {/* ── Animated background orbs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px]
                        bg-primary-600/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px]
                        bg-accent-500/15 rounded-full blur-3xl animate-glow-pulse"
             style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96
                        bg-violet-600/10 rounded-full blur-3xl animate-glow-pulse"
             style={{ animationDelay: '3s' }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* ── Top-right controls ── */}
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-10 h-10 rounded-xl flex items-center justify-center
                     text-slate-400 hover:text-white
                     bg-white/5 hover:bg-white/10
                     border border-white/10 hover:border-white/20
                     transition-all duration-200"
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>

      {/* ── Back link ── */}
      <a
        href="/"
        className="absolute top-5 left-5 flex items-center gap-2 text-sm
                   text-slate-400 hover:text-white transition-colors duration-200 group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
        Back to Portfolio
      </a>

      {/* ── Card ── */}
      <div className="w-full max-w-md animate-slide-up relative z-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500
                            rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/30">
              <ShieldCheck size={36} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full
                            border-2 border-slate-950 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to manage your portfolio</p>
        </div>

        {/* Glass card */}
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl
                        border border-white/10 shadow-2xl p-8 overflow-hidden">

          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-3xl" />

          <form onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4
                              bg-red-500/10 border border-red-500/20
                              rounded-xl animate-fade-in">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 font-medium">{error}</p>
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-slate-300">
                Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  autoComplete="username"
                  className="w-full px-4 py-3 pl-10 rounded-xl
                             bg-white/5 border border-white/10
                             text-white placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50
                             transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pl-10 pr-11 rounded-xl
                             bg-white/5 border border-white/10
                             text-white placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50
                             transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2
                             text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Demo hint */}
            <div className="p-3.5 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="text-xs text-primary-300 font-mono">
                🔑 Demo credentials: <strong className="text-primary-200">admin</strong> / <strong className="text-primary-200">admin123</strong>
              </p>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6
                         bg-gradient-to-r from-primary-600 to-primary-500
                         hover:from-primary-700 hover:to-primary-600
                         text-white font-bold text-base rounded-xl
                         shadow-lg shadow-primary-500/25
                         transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed
                         hover:shadow-glow active:scale-95"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  <ShieldCheck size={18} /> Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Secure admin-only access · Portfolio by Prajwal Marapur
        </p>
      </div>
    </div>
  )
}
