import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
 title: "Samsun Cam Filmi Uygulaması | FK Auto",
 description: "Samsun'da aracınız için ısı yalıtımlı ve güvenlik sağlayan cam filmi uygulaması. FK Auto kalitesiyle tanışın.",
 alternates: {
 canonical: "https://www.fkautosamsun.com/hizmetler/cam-filmi",
 },
}

export default function CamFilmiPage() {
 const schema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "serviceType": "Cam Filmi Uygulaması",
 "provider": {
 "@id": "https://www.fkautosamsun.com/#organization"
 },
 "areaServed": {
 "@type": "City",
 "name": "Samsun"
 },
 "description": "Araç camlarınız için ısı yalıtımlı ve güvenlik sağlayan cam filmi uygulaması."
 };

 const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.fkautosamsun.com" },
 { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.fkautosamsun.com/hizmetler" },
 { "@type": "ListItem", "position": 3, "name": "Cam Filmi", "item": "https://www.fkautosamsun.com/hizmetler/cam-filmi" }
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
 <span className="text-foreground">Cam Filmi</span>
 </nav>
 <div className="max-w-3xl">
 <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
 Samsun Cam Filmi Uygulaması
 </h1>
 <p className="text-lg text-muted-foreground">
 Araç camlarınız için ısı yalıtımlı ve güvenlik sağlayan cam filmi uygulaması ile sürüş konforunuzu artırın.
 </p>
 </div>
 </div>
 </section>

 <section className="py-16 md:py-24">
 <div className="container">
 <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
 <h2> Cam Filmi Hizmeti</h2>
 <p>
 Aracınızın camlarına uygulanan cam filmleri, sadece estetik bir görünüm kazandırmakla kalmaz, aynı zamanda sürüş konforunuzu ve güvenliğinizi önemli ölçüde artırır. FK Auto olarak Samsun'da sunduğumuz cam filmi uygulamalarında malzemeler ve uzman işçilik kullanıyoruz.
 </p>
 
 <h3>Cam Filminin Avantajları</h3>
 <ul>
 <li><strong>Isı Yalıtımı:</strong> Güneşin yakıcı etkisini azaltarak araç içinin daha serin kalmasını sağlar.</li>
 <li><strong>Güvenlik:</strong> Olası bir kaza anında camın dağılmasını engelleyerek güvenliğe katkıda bulunur.</li>
 <li><strong>Gizlilik:</strong> Araç içinin dışarıdan görünmesini zorlaştırarak özel hayatınızı korur.</li>
 <li><strong>Estetik:</strong> Aracınıza daha sportif ve şık bir görünüm katar.</li>
 </ul>

 <p>
 Cam filmi uygulamamız, ekibimiz tarafından titizlikle uygulanır. Uygulama esnasında aracınızın döşemelerine veya elektronik aksamına zarar verilmemesi için maksimum özen gösterilir.
 </p>
 </div>
 </div>
 </section>

 <Contact />
 <Footer />
 </main>
 )
}
