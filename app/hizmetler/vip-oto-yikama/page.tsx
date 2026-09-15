import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun VIP Oto Yıkama | FK Auto",
 description: "Aracınıza özel, standartların ötesinde özenli ve detaylı VIP oto yıkama hizmeti. FK Auto Samsun.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/vip-oto-yikama",
 },
}

export default function VipYikamaPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "VIP Oto Yıkama",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": "Aracınıza özel, standartların ötesinde özenli ve detaylı VIP oto yıkama hizmeti."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "VIP Oto Yıkama", "item": "https://www.fkautosamsun.com/hizmetler/vip-oto-yikama" }
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
 <span className="text-foreground">VIP Oto Yıkama</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun VIP Oto Yıkama
 </h1>
 <p className="text-lg text-muted-foreground">
 Aracınızın temizliğini sıradan bir yıkamanın ötesine taşıyan, detaylı ve özenli VIP yıkama hizmeti.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2>Standartların Ötesinde Temizlik</h2>
 <p>
 VIP Oto Yıkama hizmetimiz, aracınızın hem iç hem de dış temizliğinde en ince detaylara kadar özen gösterilen, standart yıkama işlemlerinden çok daha kapsamlı bir bakım sürecidir. Aracınızın yüzeyine zarar vermeyen ürünler ve ekipmanlar kullanılarak gerçekleştirilir.
 </p>
 
 <h3>Neden VIP Yıkama?</h3>
 <ul>
 <li><strong>Detaylı İlgi:</strong> Sadece görünen yüzeyler değil, kapı araları, jant detayları ve ulaşılması zor alanlar özenle temizlenir.</li>
 <li><strong> Ürünler:</strong> Kullanılan yıkama ürünleri aracınızın boyasına, plastik aksamlarına ve iç döşemelerine uygun serilerdir.</li>
 <li><strong>Çiziksiz Kurulama:</strong> Boya üzerinde kılcal çizikler oluşmasını önlemek amacıyla özel mikrofiber havlular ve hava ile kurulama teknikleri uygulanır.</li>
 </ul>

 <p>
 Samsun FK Auto'da gerçekleştirdiğimiz VIP yıkama işlemleri, seramik veya PPF kaplamalı araçların kaplama ömrünü uzatmak ve mevcut korumaya zarar vermemek için özellikle tavsiye edilmektedir.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
