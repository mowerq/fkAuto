import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun Detaylı Araç Temizliği ve Familya | FK Auto",
 description: "Aracınızın iç mekanında tam hijyen sağlayan detaylı iç temizlik ve familya uygulaması. Samsun FK Auto.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/detayli-arac-temizligi",
 },
}

export default function DetayliTemizlikPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "Detaylı Araç Temizliği (Familya)",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": "Aracınızın iç mekanında hijyen sağlayan kapsamlı detaylı temizlik ve familya uygulaması."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "Detaylı Araç Temizliği", "item": "https://www.fkautosamsun.com/hizmetler/detayli-arac-temizligi" }
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
 <span className="text-foreground">Detaylı Araç Temizliği (Familya)</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun Detaylı Araç Temizliği (Familya)
 </h1>
 <p className="text-lg text-muted-foreground">
 Aracınızın iç mekanında derinlemesine temizlik ve hijyen sağlayan detaylı araç içi temizliği uygulaması.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2>İç Mekanda Tam Hijyen</h2>
 <p>
 Zamanla aracınızın koltuklarında, tavanında ve taban halısında biriken kir, leke ve kötü kokular sıradan bir yıkama ile giderilemez. Detaylı araç temizliği (halk arasında bilinen adıyla familya) işlemi, aracınızın iç aksamını ilk günkü temizliğine kavuşturan kapsamlı bir uygulamadır.
 </p>
 
 <h3>Detaylı Temizlik Sürecimiz</h3>
 <ul>
 <li><strong>Koltuk Yıkama:</strong> Kumaş veya deri koltuklarınıza uygun özel ürünlerle derinlemesine temizlik yapılır ve inatçı lekeler çıkarılır.</li>
 <li><strong>Tavan ve Taban Temizliği:</strong> Tavan döşemesi sarkma riskine karşı dikkatlice temizlenir, taban halısı özel vakumlu makinelerle kirden arındırılır.</li>
 <li><strong>Plastik Aksam Bakımı:</strong> Torpido, kapı içleri ve tüm plastik aksamlar temizlendikten sonra koruyucu ürünler ile beslenerek ilk günkü mat/parlak görünümüne kavuşturulur.</li>
 <li><strong>Bagaj ve Ulaşılması Zor Alanlar:</strong> Bagaj içi, havalandırma kanalları ve koltuk araları gibi detay noktalar titizlikle temizlenir.</li>
 </ul>

 <p>
 Samsun FK Auto'da uyguladığımız detaylı temizlik işlemi, aracınızın içinde daha sağlıklı ve ferah bir sürüş alanı yaratırken kötü kokuların da önüne geçer.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
