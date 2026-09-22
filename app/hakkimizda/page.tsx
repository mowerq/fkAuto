import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Hakkımızda | FK Auto Samsun",
  description:
    "Samsun İlkadım'da uzman kadrosuyla hizmet veren FK Auto, premium araç kaplama, cam filmi ve seramik bakımında kalite ve güvenin adresidir. Bizi tanıyın.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/hakkimizda",
  },
  openGraph: {
    title: "Hakkımızda | FK Auto Samsun",
    description:
      "Samsun İlkadım'da premium araç kaplama ve seramik bakımında kalite ve güvenin adresi. Bizi tanıyın.",
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
