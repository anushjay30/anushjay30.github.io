import { useState } from 'react'
import siteConfig from '../data/siteConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  // No backend required: this opens the user's email client pre-filled with
  // the form contents. To use a real form service instead (e.g. Formspree,
  // Getform), swap this handler for a `fetch()` POST to your form endpoint.
  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`portfolio contact from ${form.name || 'website visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">contact</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-secondary">
          i&apos;m currently interested in rtl design, fpga, digital
          hardware, embedded systems, and firmware internship opportunities.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            email me
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-ink-secondary transition-colors hover:border-accent-light hover:text-accent-light"
          >
            linkedin
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-ink-secondary transition-colors hover:border-accent-light hover:text-accent-light"
          >
            github
          </a>
        </div>

        {/* Optional contact form — sends via mailto, no backend needed */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex max-w-lg flex-col gap-4 text-left"
        >
          <input
            type="text"
            required
            placeholder="your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent-light focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent-light focus:outline-none"
          />
          <textarea
            required
            rows={4}
            placeholder="your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent-light focus:outline-none"
          />
          <button
            type="submit"
            className="self-start rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            send message
          </button>
        </form>
      </div>
    </section>
  )
}
