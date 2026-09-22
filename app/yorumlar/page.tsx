import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Müşteri Yorumları | FK Auto Samsun",
  description:
    "Samsun'da araç kaplama ve estetik hizmeti alan müşterilerimizin gerçek deneyimleri. FK Auto'nun güvenilir ve kaliteli hizmet anlayışını yorumlardan okuyun.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/yorumlar",
  },
  openGraph: {
    title: "Müşteri Yorumları | FK Auto Samsun",
    description:
      "Samsun'da araç kaplama ve estetik hizmeti alan müşterilerimizin gerçek deneyimleri.",
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
