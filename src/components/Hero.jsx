import siteConfig from '../data/siteConfig'

// Decorative background gear — a plain circle + radial teeth, so it's crisp
// at any size with no external image. Purely visual, so it's hidden from
// screen readers.
function GearIcon({ className }) {
  const teethCount = 12
  const teeth = Array.from({ length: teethCount }, (_, i) => (
    <rect
      key={i}
      x="45"
      y="1"
      width="10"
      height="16"
      rx="2"
      transform={`rotate(${(360 / teethCount) * i} 50 50)`}
    />
  ))

  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-hidden="true">
      {teeth}
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="13" fill="var(--color-bg)" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Big slow-spinning gear, centered behind the text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <GearIcon className="h-[85vw] w-[85vw] max-h-[700px] max-w-[700px] text-accent opacity-[0.07] animate-spin-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center animate-fade-up">
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
          hi, i&apos;m anush.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-secondary sm:text-xl">
          ee @ university of waterloo. i enjoy building low level systems and
          hardware development
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-accent/30"
          >
            view projects
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink-secondary transition-colors hover:border-accent-light hover:text-accent-light"
          >
            github
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink-secondary transition-colors hover:border-accent-light hover:text-accent-light"
          >
            linkedin
          </a>
        </div>
      </div>
    </section>
  )
}
