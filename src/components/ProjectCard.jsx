import ImagePlaceholder from './ImagePlaceholder'

export default function ProjectCard({ project, onViewDetails }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent-light/50 hover:shadow-xl hover:shadow-accent/10">
      <div className="aspect-video w-full overflow-hidden">
        <ImagePlaceholder
          src={project.image}
          label={project.imageLabel}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-surface-light px-2.5 py-1 text-xs font-medium text-accent-light"
            >
              {tech}
            </span>
          ))}
        </div>

        <ul className="mt-4 space-y-1.5">
          {project.accomplishments.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-ink-secondary">
              <span className="mt-1 text-accent-light">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-ink-secondary transition-colors hover:border-accent-light hover:text-accent-light"
            >
              github
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-ink-secondary transition-colors hover:border-accent-light hover:text-accent-light"
            >
              video demo
            </a>
          )}
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            view details
          </button>
        </div>
      </div>
    </div>
  )
}
