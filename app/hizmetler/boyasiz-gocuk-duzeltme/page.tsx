import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun Boyasız Göçük Düzeltme | FK Auto",
 description: "Aracınızın orijinal boyasını bozmadan uygulanan boyasız göçük düzeltme (PDR) işlemi. Samsun FK Auto kalitesiyle.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/boyasiz-gocuk-duzeltme",
 },
}

export default function BoyasizGocukPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "Boyasız Göçük Düzeltme",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": "Aracınızın orijinal boyasını bozmadan uygulanan göçük düzeltme (PDR) işlemi."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "Boyasız Göçük Düzeltme", "item": "https://www.fkautosamsun.com/hizmetler/boyasiz-gocuk-duzeltme" }
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
 <span className="text-foreground">Boyasız Göçük Düzeltme</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun Boyasız Göçük Düzeltme
 </h1>
 <p className="text-lg text-muted-foreground">
 Aracınızın orijinal boyasına zarar vermeden uygulanan göçük düzeltme (PDR) işlemi ile değer kaybını önleyin.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2>Boyasız Göçük Düzeltme (PDR) Nedir?</h2>
 <p>
 Boyasız göçük düzeltme, dış darbeler sonucu (dolu yağışı, kapı çarpmaları, park hasarları vb.) araç kaportasında oluşan, boyanın zarar görmediği göçüklerin özel aletler yardımıyla eski haline getirilmesi işlemidir. Bu yöntem sayesinde aracınız kaporta ve boya işlemine girmeden onarılır.
 </p>
 
 <h3>Avantajları</h3>
 <ul>
 <li><strong>Orijinalliği Korur:</strong> Aracınız boya işlemi görmediği için orijinal yapısı bozulmaz.</li>
 <li><strong>Değer Kaybını Önler:</strong> İkinci el satışlarında aracınızın değer kaybı yaşamasını engeller.</li>
 <li><strong>Zaman Tasarrufu:</strong> Klasik kaporta boya işlemlerine göre çok daha kısa sürede tamamlanır.</li>
 <li><strong>Ekonomik:</strong> Boya ve macun maliyetleri olmadığı için genellikle daha uygun maliyetlidir.</li>
 </ul>

 <p>
 Samsun FK Auto'da uyguladığımız boyasız göçük düzeltme işlemleri, aracın kaporta yapısına ve göçüğün durumuna göre masaj yöntemi veya vakumlu çektirme yöntemleri ile titizlikle gerçekleştirilir. Göçüğün boyasız düzeltmeye uygun olup olmadığı uzman ekibimiz tarafından detaylıca incelendikten sonra işleme başlanır.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
