import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Galeri | Samsun PPF ve Seramik Kaplama Örnekleri",
  description:
    "Samsun'da tamamladığımız premium PPF kaplama, cam filmi ve seramik uygulama projelerimizi inceleyin. Kusursuz işçilik detaylarımız galerimizde.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/galeri",
  },
  openGraph: {
    title: "Galeri | Samsun PPF ve Seramik Kaplama Örnekleri",
    description:
      "Samsun'da tamamladığımız premium PPF kaplama, cam filmi ve seramik uygulama projelerimizi inceleyin.",
    url: "https://www.fkautosamsun.com/galeri",
  },
}

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Gallery headingAs="h1" />
      <Footer />
    </main>
  )
}
