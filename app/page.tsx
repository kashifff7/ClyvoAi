import dynamic from 'next/dynamic'
import { Navigation } from '@/components/clyvo/navigation'
import { HeroContent } from '@/components/clyvo/hero-content'
import { Footer } from '@/components/clyvo/footer'
import { GlobalBackground } from '@/components/clyvo/global-background'

const ProblemScene = dynamic(() =>
  import('@/components/clyvo/scenes/problem-scene').then((m) => ({ default: m.ProblemScene }))
)
const TransformationScene = dynamic(() =>
  import('@/components/clyvo/scenes/transformation-scene').then((m) => ({ default: m.TransformationScene }))
)
const OperatingLayerScene = dynamic(() =>
  import('@/components/clyvo/scenes/operating-layer-scene').then((m) => ({ default: m.OperatingLayerScene }))
)
const CommandCenterScene = dynamic(() =>
  import('@/components/clyvo/scenes/command-center-scene').then((m) => ({ default: m.CommandCenterScene }))
)
const ImpactScene = dynamic(() =>
  import('@/components/clyvo/scenes/impact-scene').then((m) => ({ default: m.ImpactScene }))
)
const FutureScene = dynamic(() =>
  import('@/components/clyvo/scenes/future-scene').then((m) => ({ default: m.FutureScene }))
)

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed ambient background — orbs + grid */}
      <GlobalBackground />

      {/* All content above background */}
      <div className="relative z-10">
        {/* Navigation — fixed, floats above everything */}
        <Navigation />

        {/* Hero */}
        <div id="home">
          <HeroContent />
        </div>

        {/* Problem */}
        <div id="solutions">
          <ProblemScene />
        </div>

        {/* Services */}
        <div id="services">
          <TransformationScene />
        </div>

        {/* How It Works */}
        <div id="how-it-works">
          <OperatingLayerScene />
        </div>

        {/* Who We Work With */}
        <div id="about">
          <CommandCenterScene />
        </div>

        {/* Pricing */}
        <div id="pricing">
          <ImpactScene />
        </div>

        {/* Final CTA */}
        <div id="contact">
          <FutureScene />
        </div>

        <Footer />
      </div>
    </main>
  )
}
