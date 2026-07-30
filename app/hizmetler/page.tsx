import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Process from "@/components/process"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Cam Filmi, PPF, Seramik ve Renkli Kaplama",
  description:
    "FK Auto Samsun araç kaplama hizmetleri: Cam filmi uygulaması, PPF boya koruma filmi, seramik kaplama, renkli kaplama, krom kaplama ve çekici hizmeti. Profesyonel montaj ve kaliteli malzemeler.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/hizmetler",
  },
  openGraph: {
    title: "Hizmetlerimiz | FK Auto Samsun Araç Kaplama",
    description:
      "Cam filmi, PPF kaplama, seramik kaplama, renkli kaplama, krom kaplama ve çekici hizmeti. Samsun'da profesyonel araç kaplama.",
    url: "https://www.fkautosamsun.com/hizmetler",
  },
}

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Services headingAs="h1" />
      <Process />
      <Footer />
    </main>
  )
}
