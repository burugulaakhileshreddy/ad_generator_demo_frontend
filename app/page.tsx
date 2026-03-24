import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

import Hero from "@/sections/landing-page/hero"
import VisualDemo from "@/sections/landing-page/visual_demo"
import Services from "@/sections/landing-page/services"
import Testimonials from "@/sections/landing-page/testimonials"




export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <VisualDemo />
      <Services />
      <Testimonials />
      <Footer />
    </>
  )
}