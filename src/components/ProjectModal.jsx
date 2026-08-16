import { useEffect } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

export default function ProjectModal({ project, onClose }) {
  // Close on Escape key, and lock page scroll while the modal is open.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  const { details } = project

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="close project details"
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary transition-colors hover:bg-surface-light hover:text-ink"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 p-6">
          <section>
            <h4 className="text-sm font-semibold tracking-wide text-accent-light">
              overview
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{details.overview}</p>
          </section>

          <section>
            <h4 className="text-sm font-semibold tracking-wide text-accent-light">
              main features
            </h4>
            <ul className="mt-2 space-y-1.5">
              {details.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-ink-secondary">
                  <span className="mt-1 text-accent-light">▹</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold tracking-wide text-accent-light">
              architecture / design
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{details.architecture}</p>
          </section>

          <section>
            <h4 className="text-sm font-semibold tracking-wide text-accent-light">
              challenges
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{details.challenges}</p>
          </section>

          <section>
            <h4 className="text-sm font-semibold tracking-wide text-accent-light">
              testing &amp; verification
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{details.testing}</p>
          </section>

          <section>
            <h4 className="text-sm font-semibold tracking-wide text-accent-light">
              what i learned
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{details.learned}</p>
          </section>

          {details.imageGroups?.length > 0 &&
            details.imageGroups.map((group) => (
              <section key={group.heading}>
                <h4 className="text-sm font-semibold tracking-wide text-accent-light">
                  {group.heading}
                </h4>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.images.map((img) => (
                    <div
                      key={img.label}
                      className="aspect-video overflow-hidden rounded-lg border border-border"
                    >
                      <ImagePlaceholder src={img.src} label={img.label} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

          {!details.imageGroups && details.images?.length > 0 && (
            <section>
              <h4 className="text-sm font-semibold tracking-wide text-accent-light">
                gallery
              </h4>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {details.images.map((img) => (
                  <div
                    key={img.label}
                    className="aspect-video overflow-hidden rounded-lg border border-border"
                  >
                    <ImagePlaceholder src={img.src} label={img.label} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-ink-secondary transition-colors hover:border-accent-light hover:text-accent-light"
            >
              view on github
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
