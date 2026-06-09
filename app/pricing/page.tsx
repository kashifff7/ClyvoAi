import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Navigation } from '@/components/clyvo/navigation'
import { Footer } from '@/components/clyvo/footer'

export const metadata: Metadata = {
  title: 'Pricing | Clyvo AI',
  description: 'Transparent project-based pricing for custom AI systems. No retainers, no surprise charges — fixed scope, fixed price.',
}

const TIERS = [
  {
    name: 'Starter AI',
    price: '£5,000',
    priceNote: 'one-time project',
    description: 'One focused AI system to solve a single, well-defined problem.',
    features: [
      'Single AI agent or automation pipeline',
      'Integration into 1–2 existing tools',
      'Discovery, build & deployment',
      '30-day post-launch support',
      'Basic performance dashboard',
    ],
    cta: 'Apply for Starter',
    highlighted: false,
  },
  {
    name: 'Growth AI',
    price: '£15,000',
    priceNote: 'one-time project',
    description: 'A comprehensive AI system covering multiple workflows or departments.',
    features: [
      'Up to 3 AI agents or automation pipelines',
      'Full CRM / ERP integration',
      'Custom model training on your data',
      '60-day post-launch support',
      'Advanced analytics dashboard',
      'Monthly strategy review (3 months)',
    ],
    cta: 'Apply for Growth',
    highlighted: true,
  },
  {
    name: 'Enterprise AI',
    price: 'Custom',
    priceNote: 'scoped per project',
    description: 'End-to-end AI transformation for complex operations and large teams.',
    features: [
      'Unlimited scope — we build what you need',
      'Multi-system integration architecture',
      'Dedicated project team',
      'Full IP transfer & documentation',
      'Ongoing retainer available',
      'Priority support & SLA',
    ],
    cta: 'Talk to Us',
    highlighted: false,
  },
]

const FAQS = [
  { q: 'Is pricing fixed or variable?', a: 'Fixed. We scope every project upfront and don\'t charge overages. What you agree to is what you pay.' },
  { q: 'Do you offer payment plans?', a: 'Yes — projects are typically split 50% upfront, 50% on delivery. Larger projects can be structured across milestones.' },
  { q: 'What\'s included in post-launch support?', a: 'Bug fixes, minor tweaks, and performance questions. Not new features — those are scoped separately.' },
  { q: 'Can I upgrade my tier mid-project?', a: 'Yes. If scope expands, we re-quote the delta and get your sign-off before proceeding.' },
]

export default function PricingPage() {
  return (
    <main className="relative min-h-screen" style={{ background: '#000000' }}>
      <Navigation />

      {/* Hero */}
      <section className="relative flex flex-col items-center px-6 pt-40 pb-20 text-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,229,255,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="font-inter text-xs font-medium uppercase tracking-widest text-white/60">Pricing</span>
          </div>
          <h1
            className="font-syne font-bold text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Simple, project-based pricing.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-inter text-white/50" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: 1.7 }}>
            No monthly retainers. No opaque hourly billing. Fixed scope, fixed price.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="relative flex flex-col rounded-2xl p-7 transition-all duration-300"
              style={{
                background: tier.highlighted ? 'rgba(0,229,255,0.04)' : '#0d0d0d',
                border: tier.highlighted ? '1px solid rgba(0,229,255,0.30)' : '1px solid rgba(255,255,255,0.10)',
              }}
            >
              {tier.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 font-inter text-[11px] font-semibold text-black"
                  style={{ background: '#00E5FF' }}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className="mb-1 font-syne text-sm font-semibold text-white/60">{tier.name}</h3>
                <div className="mb-1 font-syne text-3xl font-bold text-white" style={{ letterSpacing: '-0.04em' }}>
                  {tier.price}
                </div>
                <div className="font-inter text-xs text-white/30">{tier.priceNote}</div>
              </div>

              <p className="mb-6 font-inter text-sm text-white/40 leading-relaxed">{tier.description}</p>

              <ul className="mb-8 flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00E5FF]" />
                    <span className="font-inter text-xs text-white/50">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/apply"
                className="mt-auto block rounded-full py-3 text-center font-inter text-sm font-semibold transition-all duration-200"
                style={
                  tier.highlighted
                    ? { background: '#00E5FF', color: '#000' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.80)', border: '1px solid rgba(255,255,255,0.12)' }
                }
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-2xl">
          <h2
            className="mb-10 text-center font-syne font-bold text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em' }}
          >
            Pricing Questions
          </h2>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl p-6"
                style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <h3 className="mb-2 font-syne text-sm font-semibold text-white">{faq.q}</h3>
                <p className="font-inter text-sm text-white/40 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-40 text-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 mx-auto max-w-xl">
          <h2 className="mb-5 font-syne text-3xl font-bold text-white" style={{ letterSpacing: '-0.03em' }}>
            Not sure which tier fits?
          </h2>
          <p className="mb-10 font-inter text-white/40">
            Book a discovery call — we&apos;ll scope exactly what you need and give you a fixed quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/book"
              className="rounded-full bg-white px-8 py-3.5 font-inter text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:scale-[1.03]"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }}
            >
              Book a Discovery Call
            </a>
            <a
              href="/apply"
              className="rounded-full border-2 border-white/20 px-8 py-3.5 font-inter text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/50 hover:text-white"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
