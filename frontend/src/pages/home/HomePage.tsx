import Faq from './sections/Faq'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import PopularDestinations from './sections/PopularDestinations'
import Testimonials from './sections/Testimonials'
import WhyChooseUs from './sections/WhyChooseUs'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <PopularDestinations />
      <Testimonials />
      <Faq />
    </>
  )
}
