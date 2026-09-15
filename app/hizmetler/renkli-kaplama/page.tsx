import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun Renkli Araç Kaplama | FK Auto",
 description: " vinil filmler kullanarak aracınızı tamamen yeni bir renge dönüştürme hizmeti. Mat, parlak veya saten yüzey seçenekleriyle Samsun FK Auto'da.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/renkli-kaplama",
 },
}

export default function RenkliKaplamaPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "Renkli Kaplama",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": " vinil filmler kullanarak aracınızı tamamen yeni bir renge dönüştürme hizmeti."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "Renkli Kaplama", "item": "https://www.fkautosamsun.com/hizmetler/renkli-kaplama" }
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
 <span className="text-foreground">Renkli Kaplama</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun Renkli Araç Kaplama
 </h1>
 <p className="text-lg text-muted-foreground">
 Aracınızı mat, parlak, saten veya özel yüzeylerle vinil filmler kullanarak tamamen yeni bir renge dönüştürüyoruz.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2>Tarzınızı Aracınıza Yansıtın</h2>
 <p>
 Aracınızın renginden sıkıldınız mı veya özel bir tasarımla farklılaşmak mı istiyorsunuz? Renkli araç kaplama (vinil kaplama), aracınızın orijinal boyasına zarar vermeden dış görünümünü tamamen değiştirmenizi sağlayan bir uygulamadır.
 </p>
 
 <h3>Renkli Kaplama Seçenekleri</h3>
 <ul>
 <li><strong>Mat ve Saten Renkler:</strong> Sportif ve agresif bir görünüm arayanlar için en popüler tercihler.</li>
 <li><strong>Parlak Renkler:</strong> Orijinal boya hissiyatı veren yüksek parlaklıktaki canlı renk seçenekleri.</li>
 <li><strong>Özel Yüzeyler:</strong> Karbon fiber, fırçalanmış metal veya sedefli renk değişimleri gibi özel dokular.</li>
 </ul>

 <p>
 Samsun FK Auto'da uyguladığımız renkli kaplama işlemleri, aracınızın hatlarına uygun esnekliğe sahip özel malzemelerle gerçekleştirilir. Hem estetik bir dönüşüm sağlar hem de altındaki orijinal boyayı yüzeysel çiziklere karşı korur. Kaplamayı dilediğiniz zaman sökerek aracınızı orijinal rengine geri döndürebilirsiniz.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
