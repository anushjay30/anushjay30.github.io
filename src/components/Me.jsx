import { useEffect, useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

// Cycles through these one at a time, icon only. Add/remove/edit freely —
// `icon` is any emoji; `label` is only used for screen readers.
const HOBBIES = [
  { icon: '🏀', label: 'basketball' },
  { icon: '🏋️', label: 'dumbbell' },
  { icon: '🎮', label: 'video game controller' },
  { icon: '👟', label: 'running shoes' },
]

// Purely decorative — the full list is announced once via the sr-only text
// below, so this doesn't need its own aria-live announcements.
function HobbyRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % HOBBIES.length), 2500)
    return () => clearInterval(id)
  }, [])

  const hobby = HOBBIES[index]

  return (
    <span
      key={hobby.label}
      aria-hidden="true"
      className="animate-fade flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-border bg-surface-light text-4xl"
    >
      {hobby.icon}
    </span>
  )
}

// Cycles through a few personal photos. Order here is display order — add,
// remove, or reorder entries freely, and put the real image files in
// `public/images/`.
const PHOTOS = [
  { src: '/images/me-circuit-board.png', alt: 'working on a circuit board' },
  { src: '/images/me-gym.jpg', alt: 'at the gym' },
  { src: '/images/me-graduation.png', alt: 'at graduation with friends' },
  { src: '/images/me-beanie.jpg', alt: 'wearing a beanie, sketching out notes' },
]

function PhotoRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % PHOTOS.length), 3500)
    return () => clearInterval(id)
  }, [])

  const photo = PHOTOS[index]

  return (
    <img
      key={photo.src}
      src={photo.src}
      alt={photo.alt}
      className="animate-fade h-full w-full object-cover"
    />
  )
}

export default function Me() {
  return (
    <section id="me" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-ink sm:text-4xl">
          me
        </h2>

        <div className="mt-12 grid items-start gap-12 md:grid-cols-2">
          <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border">
            <PhotoRotator />
          </div>

          <div>
            <p className="text-base leading-relaxed text-ink-secondary sm:text-lg">
              ee student at the university of waterloo — into rtl design,
              fpgas, and embedded systems. i like figuring out how hardware
              and firmware talk to each other.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-border bg-surface px-7 py-8">
                <span className="text-xl font-bold leading-snug text-ink sm:text-2xl">
                  outside engineering, i enjoy
                </span>
                <HobbyRotator />
                <span className="sr-only">
                  basketball, dumbbell, video game controller, and running
                  shoes
                </span>
              </div>

              <div className="rounded-2xl border border-border bg-surface px-6 py-5">
                <span className="text-sm font-semibold text-ink-muted">
                  education
                </span>
                <div className="mt-3 flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-light p-1.5">
                    <ImagePlaceholder
                      src="/images/uwaterloo-logo.webp"
                      label="university of waterloo"
                      fit="contain"
                      compact
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      university of waterloo
                    </h3>
                    <p className="mt-1 text-sm text-accent-light">
                      bachelor of applied science in electrical engineering
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
