import experience from '../data/experience'
import ImagePlaceholder from './ImagePlaceholder'

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-ink sm:text-4xl">
          experience
        </h2>

        <div className="relative mt-14 space-y-10 border-l border-border pl-8 sm:pl-10">
          {experience.map((job) => (
            <div key={job.id} className="relative">
              {/* Timeline dot */}
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-bg sm:-left-[calc(2.5rem+5px)]" />

              <div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent-light/40">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-light p-1.5">
                    <ImagePlaceholder
                      src={job.logo}
                      label={job.company}
                      fit="contain"
                      compact
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold text-ink">
                        {job.title} · <span className="text-accent-light">{job.company}</span>
                      </h3>
                      <span className="text-xs font-medium text-ink-muted">{job.dates}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink-muted">{job.location}</p>

                    <ul className="mt-4 space-y-1.5">
                      {job.bullets.map((point) => (
                        <li key={point} className="flex gap-2 text-sm text-ink-secondary">
                          <span className="mt-1 text-accent-light">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-surface-light px-2.5 py-1 text-xs font-medium text-accent-light"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
