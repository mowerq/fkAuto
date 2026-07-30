import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Müşteri Yorumları | FK Auto Araç Kaplama",
  description:
    "FK Auto müşterilerinin araç kaplama deneyimleri ve yorumları. Samsun'da güvenilir araç kaplama hizmeti için müşterilerimizin memnuniyet görüşlerini okuyun.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/yorumlar",
  },
  openGraph: {
    title: "Müşteri Yorumları | FK Auto Araç Kaplama - Samsun",
    description:
      "FK Auto müşterilerinin araç kaplama deneyimleri. Samsun'da güvenilir araç kaplama hizmeti.",
    url: "https://www.fkautosamsun.com/yorumlar",
  },
}

export default function YorumlarPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Testimonials headingAs="h1" />
      <Footer />
    </main>
  )
}
