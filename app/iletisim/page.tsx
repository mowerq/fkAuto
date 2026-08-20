import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "İletişim | FK Auto Araç Kaplama",
  description:
    "FK Auto ile iletişime geçin. Adres: Derebahçe, Gümüşeşik Sk No:3, 55060 İlkadım/Samsun. Telefon: 0505 504 00 55. Ücretsiz araç kaplama teklifi alın.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/iletisim",
  },
  openGraph: {
    title: "İletişim | FK Auto Araç Kaplama - Samsun İlkadım",
    description:
      "FK Auto'ya ulaşın. Derebahçe, Gümüşeşik Sk No:3, İlkadım/Samsun. Tel: 0505 504 00 55.",
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
