import type { Metadata } from 'next'
import { Navigation } from '@/components/clyvo/navigation'
import { Footer } from '@/components/clyvo/footer'

export const metadata: Metadata = {
  title: 'How It Works | Clyvo AI',
  description: 'Our five-step process to building and deploying custom AI systems for your business — from discovery to live production.',
}

const STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    duration: '45 min',
    description:
      'We start by understanding your operations, goals, and current constraints. No templates. No generic pitch deck. Just an honest conversation about where AI can create real ROI for your specific business.',
    deliverable: 'Custom AI Opportunity Map',
  },
  {
    number: '02',
    title: 'Scoping & Proposal',
    duration: '3–5 days',
    description:
      'We scope the technical solution, define success metrics, and present a detailed proposal — timeline, milestones, pricing, and exactly what we\'ll build. No surprises.',
    deliverable: 'Detailed Technical Proposal',
  },
  {
    number: '03',
    title: 'Build & Integrate',
    duration: '4–10 weeks',
    description:
      'Our team builds your custom AI system in sprints, with weekly demos. We integrate directly into your existing tools and validate against your real data throughout.',
    deliverable: 'Production-Ready AI System',
  },
  {
    number: '04',
    title: 'Test & Deploy',
    duration: '1–2 weeks',
    description:
      'Full QA against edge cases, stress testing, and a staged rollout. We don\'t flip a switch and disappear — we\'re with you through the transition.',
    deliverable: 'Go-Live Sign-Off',
  },
  {
    number: '05',
    title: 'Monitor & Optimise',
    duration: 'Ongoing',
    description:
      'Post-launch dashboards, monthly performance reviews, and proactive iteration. AI systems improve over time — we make sure yours does.',
    deliverable: 'Monthly Performance Report',
  },
]

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects go from kickoff to production in 6–12 weeks depending on complexity. Simpler automations can be live in 4 weeks.',
  },
  {
    q: 'Do we need to provide data?',
    a: 'In most cases yes — the more relevant data you have, the better the result. We help you identify what\'s needed and how to prepare it. Some systems (like workflow automation) require minimal data.',
  },
  {
    q: 'Who owns the AI system once it\'s built?',
    a: 'You do. 100%. We don\'t retain any IP or lock you into our infrastructure. You can take the system and maintain it independently.',
  },
  {
    q: 'What if something breaks after launch?',
    a: 'All projects include a 30-day warranty period with free fixes. Ongoing maintenance retainers are available for clients who want continued support.',
  },
]

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen" style={{ background: '#000000' }}>
      <Navigation />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-40 pb-24 text-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,229,255,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="font-inter text-xs font-medium uppercase tracking-widest text-white/60">Our Process</span>
          </div>
          <h1
            className="font-syne font-bold text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, textShadow: '0 0 80px rgba(0,229,255,0.15)' }}
          >
            From idea to live AI — in weeks, not months.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-inter text-white/50" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: 1.7 }}>
            A clear, repeatable process that delivers real AI systems — not slide decks, not prototypes.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <div
              className="absolute left-[21px] top-12 h-[calc(100%-6rem)] w-px"
              style={{ background: 'rgba(0,229,255,0.15)' }}
            />
            <div className="flex flex-col gap-12">
              {STEPS.map((step, i) => (
                <div key={step.number} className="flex gap-7">
                  <div
                    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
                    style={{
                      background: i === 0 ? '#00E5FF' : '#0d0d0d',
                      border: `1px solid ${i === 0 ? '#00E5FF' : 'rgba(255,255,255,0.15)'}`,
                      color: i === 0 ? '#000' : 'rgba(255,255,255,0.60)',
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-1.5">
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <h2 className="font-syne text-lg font-bold text-white">{step.title}</h2>
                      <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-inter text-[11px] text-white/30">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mb-4 font-inter text-sm text-white/40 leading-relaxed">{step.description}</p>
                    <div className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
                      <span className="h-1 w-1 rounded-full bg-[#00E5FF]" />
                      <span className="font-inter text-[11px] text-white/40">{step.deliverable}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-10 text-center font-syne font-bold text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em' }}
          >
            Common Questions
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
            Ready to start your project?
          </h2>
          <p className="mb-10 font-inter text-white/40">Book a free discovery call — no commitment, just clarity.</p>
          <a
            href="/book"
            className="inline-block rounded-full bg-white px-10 py-4 font-inter text-base font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:scale-[1.03]"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }}
          >
            Book a Discovery Call
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
