'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigation } from '@/components/clyvo/navigation'
import { Footer } from '@/components/clyvo/footer'
import { supabase } from '@/lib/supabase'
import type { ContactSubmission } from '@/lib/database.types'

const TRUST_POINTS = [
  { icon: '⏱', title: 'Free 45-min call', desc: 'No charge, no commitment.' },
  { icon: '🤝', title: 'No hard sell', desc: 'We only work with the right fit.' },
  { icon: '🗺', title: 'Custom AI roadmap', desc: 'Leave with a clear action plan.' },
]

type FormState = Omit<ContactSubmission, 'id' | 'created_at' | 'type'>

const EMPTY: FormState = { name: '', email: '', company: '', role: '', message: '' }

const inputBase: React.CSSProperties = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 10,
  color: '#fff',
  fontFamily: 'var(--font-inter)',
  fontSize: 16,
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-inter text-xs font-medium text-white/50">{label}</label>
      {children}
      {error && <span className="font-inter text-[11px] text-red-400">{error}</span>}
    </div>
  )
}

export default function BookPage() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  function set(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  function validate(): boolean {
    const next: typeof errors = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Invalid email'
    if (!form.company.trim()) next.company = 'Required'
    if (!form.message.trim()) next.message = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    const payload: ContactSubmission = { ...form, type: 'discovery_call' }
    const { error } = await supabase.from('contact_submissions').insert([payload])
    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === field ? 'rgba(0,229,255,0.50)' : errors[field as keyof FormState] ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.10)',
    boxShadow: focused === field ? '0 0 0 3px rgba(0,229,255,0.08)' : 'none',
  })

  return (
    <main className="relative min-h-screen" style={{ background: '#000000' }}>
      <Navigation />

      {/* Hero */}
      <section className="relative px-6 pt-40 pb-16 text-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
          style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,229,255,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 mx-auto max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="font-inter text-xs font-medium uppercase tracking-widest text-white/60">Discovery Call</span>
          </div>
          <h1
            className="font-syne font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Book Your Free Discovery Call
          </h1>
          <p className="mx-auto mt-5 max-w-lg font-inter text-white/45" style={{ lineHeight: 1.7 }}>
            45 minutes. No commitment. Just clarity on how AI can transform your operations.
          </p>
        </div>
      </section>

      {/* Trust points */}
      <section className="px-6 pb-16">
        <div className="mx-auto flex max-w-2xl justify-center gap-6 flex-wrap">
          {TRUST_POINTS.map((p) => (
            <div
              key={p.title}
              className="flex items-center gap-3 rounded-xl px-5 py-3"
              style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="text-xl">{p.icon}</span>
              <div>
                <div className="font-inter text-xs font-semibold text-white">{p.title}</div>
                <div className="font-inter text-[11px] text-white/35">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendly embed placeholder */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl">
          <div
            id="calendly-placeholder"
            className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl text-center"
            style={{ background: '#0a0a0a', border: '1px dashed rgba(0,229,255,0.25)' }}
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.20)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p className="font-inter text-sm font-medium text-white/40">Calendly embed goes here</p>
            <p className="mt-1 font-inter text-xs text-white/20">
              Paste your Calendly inline embed script to replace this placeholder
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto mb-16 max-w-2xl px-6">
        <div className="flex items-center gap-4">
          <div className="flex-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span className="font-inter text-xs text-white/25">or send us a message below</span>
          <div className="flex-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>

      {/* Fallback contact form */}
      <section className="px-6 pb-40">
        <div className="mx-auto max-w-xl">
          {status === 'success' ? (
            <div
              className="flex flex-col items-center rounded-2xl px-8 py-12 text-center"
              style={{ background: '#0a0a0a', border: '1px solid rgba(0,229,255,0.20)' }}
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'rgba(0,229,255,0.10)', border: '1px solid rgba(0,229,255,0.30)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="mb-2 font-syne text-xl font-bold text-white">Message Sent</h3>
              <p className="font-inter text-sm text-white/40">
                We&apos;ll be in touch within 1 business day to book your call.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div
                className="flex flex-col gap-5 rounded-2xl p-8"
                style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h2 className="font-syne text-lg font-bold text-white">Send a Message</h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your Name *" error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="Jane Smith"
                      style={focusStyle('name')}
                    />
                  </Field>
                  <Field label="Email *" error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="jane@company.com"
                      style={focusStyle('email')}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Company *" error={errors.company}>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => set('company', e.target.value)}
                      onFocus={() => setFocused('company')}
                      onBlur={() => setFocused(null)}
                      placeholder="Acme Corp"
                      style={focusStyle('company')}
                    />
                  </Field>
                  <Field label="Your Role">
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => set('role', e.target.value)}
                      onFocus={() => setFocused('role')}
                      onBlur={() => setFocused(null)}
                      placeholder="CEO, CTO, Head of Ops…"
                      style={focusStyle('role')}
                    />
                  </Field>
                </div>

                <Field label="Message *" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us briefly what you're looking to solve…"
                    rows={4}
                    style={{ ...focusStyle('message'), resize: 'vertical' }}
                  />
                </Field>

                {status === 'error' && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-inter text-sm text-red-400">
                    Something went wrong: {errorMsg || 'Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-1 w-full rounded-full py-4 font-inter text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{ background: status === 'loading' ? 'rgba(255,255,255,0.70)' : '#ffffff' }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
