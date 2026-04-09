import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blogs from './pages/Blogs'
import SingleBlog from './pages/SingleBlog'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { initBlogStore } from './utils/blogStore'

// Layout wrapper for public pages (Navbar + page-enter animation + Footer)
function PublicLayout({ children }) {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <main className="min-h-screen page-enter" key={location.pathname}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  useEffect(() => {
    // Seed localStorage with sample blogs on first load
    initBlogStore()
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/"        element={<PublicLayout><Home       /></PublicLayout>} />
          <Route path="/projects"element={<PublicLayout><Projects   /></PublicLayout>} />
          <Route path="/blogs"   element={<PublicLayout><Blogs      /></PublicLayout>} />
          <Route path="/blog/:id"element={<PublicLayout><SingleBlog /></PublicLayout>} />

          {/* Admin routes (no public layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
