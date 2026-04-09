/**
 * ProjectCard — premium card with scale animation, tech badges, gradient accent
 */
import { ExternalLink, Github, Star, ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project }) {
  return (
    <article className="group relative bg-white dark:bg-gray-900 rounded-2xl
                        border border-slate-200/80 dark:border-gray-800/80
                        shadow-card overflow-hidden
                        transition-all duration-300 ease-out
                        hover:-translate-y-2 hover:shadow-glow hover:border-primary-200 dark:hover:border-primary-800/60
                        flex flex-col">

      {/* Gradient accent top bar */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-violet-500 to-accent-500" />

      {/* Inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
           style={{background: 'radial-gradient(ellipse at top left, rgba(99,102,241,0.06) 0%, transparent 60%)'}} />

      <div className="p-6 flex flex-col gap-5 flex-1 relative z-10">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-indigo-100 dark:from-primary-900/30 dark:to-indigo-900/30
                            border border-primary-100 dark:border-primary-800/50
                            flex items-center justify-center text-2xl shadow-sm">
              {project.emoji}
            </div>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold
                               bg-amber-100 dark:bg-amber-900/30
                               text-amber-700 dark:text-amber-300
                               border border-amber-200 dark:border-amber-800/50">
                <Star size={10} className="fill-amber-500 text-amber-500" /> Featured
              </span>
            )}
          </div>
          {/* Metric badge */}
          <div className="text-right flex-shrink-0">
            <div className="text-xl font-extrabold gradient-text leading-none">{project.metric?.value}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">{project.metric?.label}</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white
                       group-hover:text-primary-600 dark:group-hover:text-primary-400
                       transition-colors duration-200 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-gray-800/80">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl
                         bg-slate-100 dark:bg-gray-800
                         text-slate-700 dark:text-slate-300
                         hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white
                         transition-all duration-200"
            >
              <Github size={15} /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl
                         bg-primary-600 text-white
                         hover:bg-primary-700
                         shadow-md shadow-primary-500/20
                         transition-all duration-200"
            >
              <ExternalLink size={15} /> Live Demo <ArrowUpRight size={13} />
            </a>
          )}
          {!project.github && !project.demo && (
            <span className="text-xs text-slate-400 dark:text-slate-600 italic">Private repository</span>
          )}
        </div>
      </div>
    </article>
  )
}
