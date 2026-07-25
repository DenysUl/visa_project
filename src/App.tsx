import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhyChooseUs from './components/WhyChooseUs'
import PopularDestinations from './components/PopularDestinations'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhyChooseUs />
        <PopularDestinations />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

export default App
