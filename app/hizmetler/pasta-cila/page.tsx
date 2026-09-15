import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun Pasta Cila Uygulaması | FK Auto",
 description: "Samsun'da pasta cila uygulaması ile aracınızın boyasını canlandırın ve çizikleri giderin. FK Auto uzmanlığı.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/pasta-cila",
 },
}

export default function PastaCilaPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "Pasta Cila",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": "Aracınızın boyasını canlandıran, çizikleri gideren pasta cila uygulaması."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "Pasta Cila", "item": "https://www.fkautosamsun.com/hizmetler/pasta-cila" }
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
 <span className="text-foreground">Pasta Cila</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun Pasta Cila Uygulaması
 </h1>
 <p className="text-lg text-muted-foreground">
 Zamanla matlaşan ve çizilen araç boyanızı pasta cila uygulaması ile ilk günkü parlaklığına kavuşturuyoruz.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2> Boya Düzeltme ve Pasta Cila</h2>
 <p>
 Aracınızın dış yüzeyi zamanla fırça çizikleri, dış etkenler, güneş ışınları ve asit yağmurları gibi nedenlerle parlaklığını yitirebilir. Pasta cila işlemi, boya yüzeyindeki bu kılcal çizikleri ve kusurları gidererek aracınızın estetik görünümünü yenileme işlemidir.
 </p>
 
 <h3>Neden Pasta Cila Yaptırmalısınız?</h3>
 <ul>
 <li><strong>Çizik Giderme:</strong> Yüzeydeki kılcal çizikleri ve hareleri ortadan kaldırır.</li>
 <li><strong>Parlaklık ve Canlılık:</strong> Matlaşan boyayı canlandırarak ilk günkü derin parlaklığına kavuşturur.</li>
 <li><strong>Yüzey Düzeltme:</strong> Boya yüzeyindeki pürüzleri gidererek kusursuz bir zemin hazırlar.</li>
 </ul>

 <p>
 Samsun FK Auto'da pasta cila işlemi, aşamalı polisaj teknikleri kullanılarak yapılır. Aracınızın boya durumuna göre uygun kalınlıkta pedler ve pastalar seçilir, boya inceltilmeden yüzeydeki kusurlar giderilir. Bu işlem genellikle seramik kaplama veya PPF kaplama öncesinde mükemmel bir zemin hazırlamak için de tercih edilmektedir.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
