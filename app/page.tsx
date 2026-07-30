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
  title: "FK Auto | Samsun Araç Kaplama, Cam Filmi, PPF ve Seramik Kaplama",
  description:
    "Samsun'da profesyonel araç kaplama hizmetleri. Cam filmi, PPF kaplama, seramik kaplama, renkli kaplama ve krom kaplama. FK Auto Araç Estetik Merkezi, İlkadım/Samsun.",
  alternates: {
    canonical: "https://www.fkautosamsun.com",
  },
  openGraph: {
    title: "FK Auto | Samsun Araç Kaplama, Cam Filmi, PPF ve Seramik Kaplama",
    description:
      "Samsun'da profesyonel araç kaplama hizmetleri. Cam filmi, PPF, seramik kaplama ve daha fazlası.",
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
