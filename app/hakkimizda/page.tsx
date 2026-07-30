import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Hakkımızda | FK Auto Araç Estetik Merkezi",
  description:
    "FK Auto, Faruk Kalaycı tarafından kurulan Samsun İlkadım'ın profesyonel araç kaplama ve estetik merkezi. Yılların deneyimi ve uzman kadrosuyla araç kaplama, cam filmi, PPF ve seramik kaplama hizmetleri.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/hakkimizda",
  },
  openGraph: {
    title: "Hakkımızda | FK Auto Araç Estetik Merkezi - Samsun",
    description:
      "FK Auto, Faruk Kalaycı tarafından kurulan Samsun'un profesyonel araç kaplama ve estetik merkezi.",
    url: "https://www.fkautosamsun.com/hakkimizda",
  },
}

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <About headingAs="h1" />
      <Footer />
    </main>
  )
}
