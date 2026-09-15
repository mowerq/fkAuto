import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun Şeffaf PPF Kaplama | FK Auto",
 description: "Samsun'da aracınızın boyasını taş çiziklerine ve çevresel hasarlara karşı koruyan şeffaf PPF boya koruma filmi kaplaması.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/ppf-kaplama",
 },
}

export default function PpfKaplamaPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "PPF Kaplama",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": "Aracınızın boyasını taş çiziklerine ve çevresel hasarlara karşı koruyan şeffaf PPF koruma filmi uygulaması."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "Şeffaf PPF Kaplama", "item": "https://www.fkautosamsun.com/hizmetler/ppf-kaplama" }
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
 <span className="text-foreground">Şeffaf PPF Kaplama</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun Şeffaf PPF Kaplama
 </h1>
 <p className="text-lg text-muted-foreground">
 Aracınızın orijinal boyasını taş vuruklarına, çiziklere ve çevresel etkenlere karşı koruyan boya koruma filmi uygulaması.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2>Neden PPF (Boya Koruma Filmi) Yaptırmalısınız?</h2>
 <p>
 PPF (Paint Protection Film) yani Boya Koruma Filmi, aracınızın boyasını yolda oluşabilecek taş sekmelerine, çizilmelere ve çevresel hasarlara karşı koruyan en etkili yöntemdir. Şeffaf yapısı sayesinde aracınızın orijinal görünümünü ve rengini bozmadan maksimum koruma sağlar.
 </p>
 
 <h3>PPF Kaplamanın Sağladığı Faydalar</h3>
 <ul>
 <li><strong>Çizilme Direnci:</strong> Dış etkenlerden kaynaklanabilecek yüzeysel çiziklere karşı koruma kalkanı oluşturur.</li>
 <li><strong>Taş Vuruklarına Karşı Koruma:</strong> Özellikle otoyol sürüşlerinde sıklıkla karşılaşılan taş sekmelerine karşı boyayı korur.</li>
 <li><strong>Orijinal Görünüm:</strong> Şeffaf yapısı ile aracınızın orijinal boyasını kapatmaz, estetiğini bozmaz.</li>
 <li><strong>Değer Koruma:</strong> Orijinal boyanın korunması, aracınızın ikinci el değerini yüksek tutmanıza yardımcı olur.</li>
 </ul>

 <p>
 FK Auto olarak Samsun'da uyguladığımız PPF kaplama işlemleri, aracınızın hatlarına kusursuz bir şekilde uyum sağlaması için tekniklerle gerçekleştirilir. Komple araç kaplama veya bölgesel kaplama (kaput, çamurluk, tampon vb.) seçeneklerimiz mevcuttur.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
