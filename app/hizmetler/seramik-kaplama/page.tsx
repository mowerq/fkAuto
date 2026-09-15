import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun Seramik Kaplama | FK Auto",
 description: "Aracınızın boyasına uzun süreli parlaklık ve koruma sağlayan seramik kaplama hizmeti. Samsun FK Auto güvencesiyle.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/seramik-kaplama",
 },
}

export default function SeramikKaplamaPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "Seramik Kaplama",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": "Aracınızın boyasına uzun süreli parlaklık ve koruma sağlayan seramik kaplama."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "Seramik Kaplama", "item": "https://www.fkautosamsun.com/hizmetler/seramik-kaplama" }
 ]
 };

 return (
 <main className="min-h-screen bg-background">
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
 <Navbar />
 
 <section className="py-12 md:py-20 bg-muted">
 <div className="container">
 <nav className="flex text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
 <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
 <ChevronRight className="h-4 w-4 mx-2" />
 <Link href="/hizmetler" className="hover:text-foreground transition-colors">Hizmetler</Link>
 <ChevronRight className="h-4 w-4 mx-2" />
 <span className="text-foreground">Seramik Kaplama</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun Seramik Kaplama
 </h1>
 <p className="text-lg text-muted-foreground">
 Aracınızın boyasını çevresel etkenlere karşı koruyarak uzun süreli derin bir parlaklık sağlayan seramik kaplama uygulaması.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2>Gelişmiş Boya Koruması: Seramik Kaplama</h2>
 <p>
 Seramik kaplama, aracınızın boya yüzeyine uygulanan ve kimyasal bir bağ kurarak kalıcı bir koruma katmanı oluşturan ileri teknoloji bir uygulamadır. Klasik wax veya cilalardan farklı olarak, çok daha uzun ömürlü ve dayanıklı bir koruma sağlar.
 </p>
 
 <h3>Seramik Kaplamanın Faydaları</h3>
 <ul>
 <li><strong>Derin Parlaklık:</strong> Aracınıza ayna benzeri derin ve göz alıcı bir parlaklık kazandırır.</li>
 <li><strong>Su İticilik (Hidrofobik Etki):</strong> Su ve kirin yüzeye tutunmasını zorlaştırır, aracınızın daha uzun süre temiz kalmasını ve daha kolay yıkanmasını sağlar.</li>
 <li><strong>Çevresel Koruma:</strong> Kuş pisliği, ağaç reçinesi ve UV ışınları gibi boyaya zarar veren etkenlere karşı güçlü bir direnç gösterir.</li>
 <li><strong>Kimyasal Direnç:</strong> Çeşitli temizlik kimyasallarına ve asit yağmurlarına karşı boyayı korur.</li>
 </ul>

 <p>
 Samsun FK Auto olarak, seramik kaplama uygulamasından önce aracınızın yüzeyini detaylı bir pasta cila işlemi ile kusursuz hale getiriyoruz. Doğru yüzey hazırlığı, seramik kaplamanın yüzeye tam tutunması ve maksimum ömür sunması için en önemli adımdır.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
