import type { Metadata } from "next"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Gallery from "@/components/gallery"
import Process from "@/components/process"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import About from "@/components/about"
import VisitorCounter from "@/components/visitor-counter"

export const metadata: Metadata = {
  title: "Samsun Araç Kaplama & Estetik Merkezi | FK Auto",
  description:
    "Samsun İlkadım'da garantili PPF, cam filmi, seramik kaplama ve pasta cila hizmetleri. Aracınıza değer katan profesyonel estetik merkezi FK Auto.",
  alternates: {
    canonical: "https://www.fkautosamsun.com",
  },
  openGraph: {
    title: "Samsun Araç Kaplama & Estetik Merkezi | FK Auto",
    description:
      "Samsun İlkadım'da garantili PPF, cam filmi, seramik kaplama ve pasta cila hizmetleri. Profesyonel araç estetiği.",
    url: "https://www.fkautosamsun.com",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <VisitorCounter />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
