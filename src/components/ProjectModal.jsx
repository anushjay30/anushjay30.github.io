import { useEffect, useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'
import Lightbox from './Lightbox'

// Gallery image with a hover-to-zoom affordance; clicking (or Enter/Space
// when focused) opens it full-screen via the onZoom callback.
function GalleryImage({ img, onZoom }) {
  const zoomable = Boolean(img.src)

  return (
    <div
      role={zoomable ? 'button' : undefined}
      tabIndex={zoomable ? 0 : undefined}
      onClick={zoomable ? () => onZoom(img) : undefined}
      onKeyDown={
        zoomable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onZoom(img)
              }
            }
          : undefined
      }
      aria-label={zoomable ? `view larger: ${img.label}` : undefined}
      className={`group relative aspect-video overflow-hidden rounded-lg border border-border ${zoomable ? 'cursor-zoom-in' : ''}`}
    >
      <ImagePlaceholder
        src={img.src}
        label={img.label}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      {zoomable && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
  const [zoomedImage, setZoomedImage] = useState(null)

  // Close on Escape key, and lock page scroll while the modal is open.
  // If the lightbox is open, Escape closes that first rather than both at once.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return
      if (zoomedImage) {
        setZoomedImage(null)
      } else {
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, zoomedImage])

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
                    <GalleryImage key={img.label} img={img} onZoom={setZoomedImage} />
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
                  <GalleryImage key={img.label} img={img} onZoom={setZoomedImage} />
                ))}
              </div>
            </section>
          )}

          {(project.github || project.demo) && (
            <div className="flex flex-wrap gap-3">
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
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-ink-secondary transition-colors hover:border-accent-light hover:text-accent-light"
                >
                  watch video demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <Lightbox
        src={zoomedImage?.src}
        alt={zoomedImage?.label}
        onClose={() => setZoomedImage(null)}
      />
    </div>
  )
}
