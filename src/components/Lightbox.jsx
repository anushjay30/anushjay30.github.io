import { createPortal } from 'react-dom'

// Full-screen zoomed view of a single gallery image. Escape-key handling
// lives in ProjectModal (it needs to close the lightbox before the modal),
// so this component stays a dumb, portal-rendered overlay.
//
// React bubbles synthetic events through the *component* tree, not the DOM
// tree — so even though this renders into document.body via a portal, a
// click here would still reach ProjectModal's own backdrop onClick and close
// the whole modal underneath. Every click handler below stops propagation.
export default function Lightbox({ src, alt, onClose }) {
  if (!src) return null

  const close = (e) => {
    e.stopPropagation()
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-up"
      onClick={close}
    >
      <button
        type="button"
        onClick={close}
        aria-label="close zoomed image"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {alt && (
        <p className="absolute bottom-4 left-1/2 max-w-[90vw] -translate-x-1/2 truncate rounded-full bg-black/50 px-4 py-1.5 text-xs text-white/80">
          {alt}
        </p>
      )}
    </div>,
    document.body,
  )
}
