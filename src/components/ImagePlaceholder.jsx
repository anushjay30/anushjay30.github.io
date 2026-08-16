/*
  ImagePlaceholder
  -----------------
  Shows a labeled placeholder box until you add a real image.

  HOW TO REPLACE WITH A REAL IMAGE:
  1. Drop your image file into `public/images/` (e.g. public/images/riscv-pipeline.png)
  2. Wherever this component is used, pass a `src` prop pointing to it:
       <ImagePlaceholder src="/images/riscv-pipeline.png" alt="RISC-V pipeline diagram" />
  3. Once `src` is set, the real image renders automatically and the placeholder box disappears.

  Pass fit="contain" for logos/wordmarks that shouldn't be cropped (default
  is "cover", which fills the box — good for photos and diagrams).

  Pass compact for small slots (e.g. a ~48px logo box) — swaps the icon+label
  placeholder for just a small icon, since the label text won't fit that small.
*/
export default function ImagePlaceholder({ src, alt, label, className = '', fit = 'cover', compact = false }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || label}
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
      />
    )
  }

  if (compact) {
    return (
      <div
        title={label}
        className={`flex h-full w-full items-center justify-center bg-surface-light ${className}`}
      >
        <svg
          className="h-1/2 w-1/2 text-accent-light/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 8.25V15a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 15V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-border bg-surface-light px-4 text-center ${className}`}
    >
      <svg
        className="h-8 w-8 text-accent-light/60"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 8.25V15a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 15V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18"
        />
      </svg>
      <span className="text-xs font-medium text-ink-muted">{label}</span>
    </div>
  )
}
