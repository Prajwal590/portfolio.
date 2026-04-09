import { useState, useEffect } from 'react'
import { ExternalLink, Github, Star, Zap, Code2 } from 'lucide-react'
import { ProjectCardSkeleton } from '../components/Skeleton'
import ProjectCard from '../components/ProjectCard'

const PROJECTS = [
  {
    id: 1,
    emoji: '🎯',
    title: 'Real-Time Nail Disease Detection',
    description:
      'A real-time computer vision system that detects nail diseases via webcam using YOLOv8 and OpenCV, packaged in a clean Streamlit UI. Trained on a custom dataset achieving 90%+ detection accuracy — making dermatology accessible without clinic visits.',
    tech: ['YOLOv8', 'OpenCV', 'Streamlit', 'Python'],
    github: 'https://github.com/Prajwal590',
    demo: null,
    featured: true,
    metric: { value: '90%+', label: 'Accuracy' },
  },
  {
    id: 2,
    emoji: '🎬',
    title: 'Movie Recommendation System',
    description:
      'Content-based movie recommendation engine built with Flask and Scikit-learn. Uses TF-IDF vectorization and cosine similarity to compute movie similarity scores and deliver precise, personalized recommendations.',
    tech: ['Flask', 'Scikit-learn', 'Python', 'TF-IDF', 'Cosine Similarity'],
    github: 'https://github.com/Prajwal590',
    demo: null,
    featured: true,
    metric: { value: 'CB', label: 'Filtering' },
  },
  {
    id: 3,
    emoji: '🎓',
    title: 'Student Management System',
    description:
      'A full-featured admin panel for managing student records with complete CRUD functionality. Built with Java, JDBC, and MySQL — featuring a clean Swing UI, robust database operations, and role-based access control.',
    tech: ['Java', 'JDBC', 'MySQL', 'Swing'],
    github: 'https://github.com/Prajwal590',
    demo: null,
    featured: false,
    metric: { value: 'CRUD', label: 'Full Stack' },
  },
]

export default function Projects() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="pt-16">

      {/* ── Hero header ── */}
      <div className="relative bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/30
                      dark:from-gray-950 dark:via-indigo-950/30 dark:to-gray-950
                      border-b border-slate-200 dark:border-gray-800 overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-400/8 rounded-full blur-3xl" />
        </div>

        <div className="section pb-16 pt-16 relative z-10">
          {/* Label */}
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="section-label">
              <Code2 size={13} /> What I've Built
            </span>
          </div>

          <h1 className="section-title text-slate-900 dark:text-white">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="section-subtitle">
            Real-world projects showcasing my skills in AI/ML, full-stack development, and data-driven applications.
          </p>
        </div>
      </div>

      {/* ── Projects grid ── */}
      <div className="section">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* ── Stats ── */}
        {!loading && (
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-5 animate-slide-up">
            {[
              { value: '3+',  label: 'Projects Built',  icon: '💻' },
              { value: '1+',  label: 'Year Experience',  icon: '💼' },
              { value: '10+', label: 'Technologies',    icon: '🛠️' },
              { value: '90%+', label: 'AI Accuracy',    icon: '🎯' },
            ].map(({ value, label, icon }) => (
              <div key={label} className="card p-6 text-center group hover:shadow-glow-sm">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-3xl font-extrabold gradient-text mb-1">{value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── GitHub CTA ── */}
        {!loading && (
          <div className="mt-12 text-center animate-fade-in">
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl
                            bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-gray-900 dark:to-indigo-900/20
                            border border-slate-200 dark:border-gray-800 shadow-card max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white dark:text-slate-900">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">See More on GitHub</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">All my open-source work & experiments</p>
              </div>
              <a
                href="https://github.com/Prajwal590"
                target="_blank"
                rel="noopener noreferrer"
                id="github-profile-btn"
                className="btn-primary w-full justify-center"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
