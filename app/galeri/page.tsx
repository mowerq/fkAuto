import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Galeri | Araç Kaplama Çalışmalarımız",
  description:
    "FK Auto tarafından tamamlanan araç kaplama projelerini inceleyin. Cam filmi, PPF, seramik kaplama, renkli kaplama ve krom kaplama çalışmalarımızın fotoğrafları. Samsun araç kaplama örnekleri.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/galeri",
  },
  openGraph: {
    title: "Galeri | FK Auto Araç Kaplama Çalışmaları - Samsun",
    description:
      "FK Auto araç kaplama projelerini inceleyin. Cam filmi, PPF, seramik, renkli ve krom kaplama çalışma örnekleri.",
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
