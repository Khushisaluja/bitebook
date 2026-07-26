import '@/styles/site.css'
import SiteNav from '@/components/site/SiteNav'
import Hero from '@/components/site/Hero'
import Marquee from '@/components/site/Marquee'
import Manifesto from '@/components/site/Manifesto'
import Walkthrough from '@/components/site/Walkthrough'
import Gallery from '@/components/site/Gallery'
import Details from '@/components/site/Details'
import TasteCard from '@/components/site/TasteCard'
import Closing from '@/components/site/Closing'

export default function LandingPage() {
  return (
    <div className="site">
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Walkthrough />
        <Gallery />
        <Details />
        <TasteCard />
      </main>
      <Closing />
    </div>
  )
}
