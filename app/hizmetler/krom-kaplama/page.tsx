import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun Krom Araç Kaplama | FK Auto",
 description: "Aracınızın detaylarına veya tamamına lüks ve göz alıcı bir görünüm kazandıran krom kaplama hizmetleri. Samsun FK Auto'da.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/krom-kaplama",
 },
}

export default function KromKaplamaPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "Krom Kaplama",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": "Aracınızın detaylarına veya tamamına lüks ve göz alıcı bir görünüm kazandıran krom kaplama hizmetleri."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "Krom Kaplama", "item": "https://www.fkautosamsun.com/hizmetler/krom-kaplama" }
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
 <span className="text-foreground">Krom Kaplama</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun Krom Kaplama
 </h1>
 <p className="text-lg text-muted-foreground">
 Aracınızın detaylarına veya tamamına lüks ve göz alıcı bir görünüm kazandıran krom kaplama hizmeti.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2>Göz Alıcı Lüks Detaylar</h2>
 <p>
 Krom kaplama, yansıtıcı ve ayna benzeri yüzeyi ile aracınıza olağanüstü ve dikkat çekici bir görünüm katan özel bir uygulamadır. İster aracınızın tamamını iddialı bir renge büründürmek, ister belirli detaylarda vurgu yapmak isteyin, krom kaplama en lüks tercihlerden biridir.
 </p>
 
 <h3>Krom Kaplama Kullanım Alanları</h3>
 <ul>
 <li><strong>Komple Araç Kaplama:</strong> Aracınızın tamamen ayna görünümüne veya altın, gümüş, renkli krom seçeneklerine kavuşmasını sağlar.</li>
 <li><strong>Detay ve Trim Kaplama (Chrome Delete):</strong> Mevcut krom parçaların kaplanarak iptal edilmesi veya mat parçaların krom görünüme kavuşturulması (örneğin kapı kolları, çıtalar, ızgaralar).</li>
 </ul>

 <p>
 Samsun FK Auto'da krom kaplama uygulamaları, malzemenin hassas yapısı nedeniyle son derece dikkatli ve bir işçilikle gerçekleştirilir. Krom folyoların esneklik yapısı standart renklere göre farklı olduğu için, alanında uzman ekibimiz tarafından kusursuz bir şekilde aracınıza uygulanmaktadır.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
