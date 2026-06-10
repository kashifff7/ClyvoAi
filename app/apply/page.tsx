'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigation } from '@/components/clyvo/navigation'
import { Footer } from '@/components/clyvo/footer'
import { supabase } from '@/lib/supabase'
import type { ApplicationSubmission } from '@/lib/database.types'

const BUSINESS_TYPES = ['Agency', 'SaaS', 'E-commerce', 'Healthcare', 'Finance', 'Manufacturing', 'Other']
const EMPLOYEE_COUNTS = ['1–10', '11–50', '51–200', '201–1000', '1000+']
const BUDGET_RANGES = ['Under £5k', '£5k–£15k', '£15k–£30k', '£30k–£50k', '£50k+']
const TIMELINES = ['ASAP', '1–3 months', '3–6 months', '6+ months']

type FormState = Omit<ApplicationSubmission, 'id' | 'created_at'>

const EMPTY: FormState = {
  business_name: '',
  email: '',
  phone: '',
  business_type: '',
  employee_count: '',
  current_challenge: '',
  desired_outcome: '',
  budget_range: '',
  timeline: '',
}

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

export default function ApplyPage() {
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
    if (!form.business_name.trim()) next.business_name = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Invalid email'
    if (!form.phone.trim()) next.phone = 'Required'
    if (!form.business_type) next.business_type = 'Required'
    if (!form.employee_count) next.employee_count = 'Required'
    if (!form.current_challenge.trim()) next.current_challenge = 'Required'
    if (!form.desired_outcome.trim()) next.desired_outcome = 'Required'
    if (!form.budget_range) next.budget_range = 'Required'
    if (!form.timeline) next.timeline = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    const { error } = await supabase.from('application_submissions').insert([form])
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

  if (status === 'success') {
    return (
      <main className="relative min-h-screen" style={{ background: '#000000' }}>
        <Navigation />
        <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-full"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,229,255,0.07) 0%, transparent 70%)' }}
          />
          <div className="relative z-10 mx-auto max-w-lg">
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: 'rgba(0,229,255,0.10)', border: '1px solid rgba(0,229,255,0.30)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="mb-4 font-syne text-3xl font-bold text-white" style={{ letterSpacing: '-0.03em' }}>
              Application Received
            </h1>
            <p className="mb-3 font-inter text-white/50 leading-relaxed">
              Thank you — we&apos;ve received your application and will review it within 1 business day.
            </p>
            <p className="mb-10 font-inter text-sm text-white/30 leading-relaxed">
              Next steps: a member of our team will reach out to your email to schedule a discovery call and walk you through what we can build for you.
            </p>
            <a
              href="/"
              className="inline-block rounded-full bg-white px-8 py-3.5 font-inter text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90"
            >
              Back to Home
            </a>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

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
            <span className="font-inter text-xs font-medium uppercase tracking-widest text-white/60">Application</span>
          </div>
          <h1
            className="font-syne font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Apply to Work With Us
          </h1>
          <p className="mx-auto mt-5 max-w-lg font-inter text-white/45" style={{ lineHeight: 1.7 }}>
            Tell us about your business. We&apos;ll review your application and reach out within 1 business day.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 pb-40">
        <div className="mx-auto max-w-xl">
          <form onSubmit={handleSubmit} noValidate>
            <div
              className="flex flex-col gap-5 rounded-2xl p-8"
              style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Row 1 */}
              <Field label="Business Name *" error={errors.business_name}>
                <input
                  type="text"
                  value={form.business_name}
                  onChange={(e) => set('business_name', e.target.value)}
                  onFocus={() => setFocused('business_name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Acme Corp"
                  style={focusStyle('business_name')}
                />
              </Field>

              {/* Row 2: email + phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email *" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="you@company.com"
                    style={focusStyle('email')}
                  />
                </Field>
                <Field label="Phone *" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                    placeholder="+44 7700 900000"
                    style={focusStyle('phone')}
                  />
                </Field>
              </div>

              {/* Row 3: business type + employee count */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Business Type *" error={errors.business_type}>
                  <select
                    value={form.business_type}
                    onChange={(e) => set('business_type', e.target.value)}
                    onFocus={() => setFocused('business_type')}
                    onBlur={() => setFocused(null)}
                    style={{ ...focusStyle('business_type'), appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select type</option>
                    {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Employee Count *" error={errors.employee_count}>
                  <select
                    value={form.employee_count}
                    onChange={(e) => set('employee_count', e.target.value)}
                    onFocus={() => setFocused('employee_count')}
                    onBlur={() => setFocused(null)}
                    style={{ ...focusStyle('employee_count'), appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select range</option>
                    {EMPLOYEE_COUNTS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>

              {/* Current challenge */}
              <Field label="What's your biggest operational challenge? *" error={errors.current_challenge}>
                <textarea
                  value={form.current_challenge}
                  onChange={(e) => set('current_challenge', e.target.value)}
                  onFocus={() => setFocused('current_challenge')}
                  onBlur={() => setFocused(null)}
                  placeholder="Describe the problem you're trying to solve..."
                  rows={4}
                  style={{ ...focusStyle('current_challenge'), resize: 'vertical' }}
                />
              </Field>

              {/* Desired outcome */}
              <Field label="What would success look like in 6 months? *" error={errors.desired_outcome}>
                <textarea
                  value={form.desired_outcome}
                  onChange={(e) => set('desired_outcome', e.target.value)}
                  onFocus={() => setFocused('desired_outcome')}
                  onBlur={() => setFocused(null)}
                  placeholder="Describe your ideal outcome..."
                  rows={4}
                  style={{ ...focusStyle('desired_outcome'), resize: 'vertical' }}
                />
              </Field>

              {/* Row: budget + timeline */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Budget Range *" error={errors.budget_range}>
                  <select
                    value={form.budget_range}
                    onChange={(e) => set('budget_range', e.target.value)}
                    onFocus={() => setFocused('budget_range')}
                    onBlur={() => setFocused(null)}
                    style={{ ...focusStyle('budget_range'), appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select range</option>
                    {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label="Timeline *" error={errors.timeline}>
                  <select
                    value={form.timeline}
                    onChange={(e) => set('timeline', e.target.value)}
                    onFocus={() => setFocused('timeline')}
                    onBlur={() => setFocused(null)}
                    style={{ ...focusStyle('timeline'), appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select timeline</option>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              {status === 'error' && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-inter text-sm text-red-400">
                  Something went wrong: {errorMsg || 'Please try again.'}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-2 w-full rounded-full py-4 font-inter text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                style={{ background: status === 'loading' ? 'rgba(255,255,255,0.70)' : '#ffffff' }}
              >
                {status === 'loading' ? 'Submitting…' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
