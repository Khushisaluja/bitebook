import Hero from '@/components/landing/Hero'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import ValueStrip from '@/components/landing/ValueStrip'
import SocialProof from '@/components/landing/SocialProof'
import FeatureHighlights from '@/components/landing/FeatureHighlights'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <ValueStrip />
      <SocialProof />
      <FeatureHighlights />
      <MarqueeStrip />
      <Footer />
    </main>
  )
}
