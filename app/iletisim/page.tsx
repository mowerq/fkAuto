import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "İletişim | FK Auto Samsun İlkadım",
  description:
    "Samsun araç kaplama fiyatları ve randevu için bize ulaşın. İlkadım Derebahçe'deki estetik merkezimize gelin veya 0505 504 00 55 numarasından arayın.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/iletisim",
  },
  openGraph: {
    title: "İletişim | FK Auto Samsun İlkadım",
    description:
      "Samsun araç kaplama randevusu için bize ulaşın. Derebahçe, İlkadım. Tel: 0505 504 00 55.",
    url: "https://www.fkautosamsun.com/iletisim",
  },
}

export default function IletisimPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Contact headingAs="h1" />
      <Footer />
    </main>
  )
}
