/**
 * ProjectCard - card for projects page
 */
import { ExternalLink, Github, Star } from 'lucide-react'

export default function ProjectCard({ project }) {
  return (
    <article className="card p-6 flex flex-col gap-5 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{project.emoji}</span>
            {project.featured && (
              <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs">
                <Star size={10} className="fill-amber-500 text-amber-500 mr-1" /> Featured
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="badge-primary text-xs font-mono">{t}</span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-gray-800">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <Github size={16} /> GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>
    </article>
  )
}
