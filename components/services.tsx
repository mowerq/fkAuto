import { Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const staticServices = [
  {
    title: "Cam Filmi",
    href: "/hizmetler/cam-filmi",
    description: "Araç camlarınız için ısı yalıtımlı ve güvenlik sağlayan profesyonel cam filmi uygulaması.",
  },
  {
    title: "Şeffaf PPF Kaplama",
    href: "/hizmetler/ppf-kaplama",
    description: "Aracınızın boyasını taş çiziklerine ve çevresel hasarlara karşı koruyan şeffaf PPF koruma filmi.",
  },
  {
    title: "Pasta Cila",
    href: "/hizmetler/pasta-cila",
    description: "Aracınızın boyasını canlandıran, çizikleri gideren profesyonel pasta cila uygulaması.",
  },
  {
    title: "Seramik Kaplama",
    href: "/hizmetler/seramik-kaplama",
    description: "Aracınızın boyasına uzun süreli parlaklık ve koruma sağlayan profesyonel seramik kaplama.",
  },
  {
    title: "Boyasız Göçük Düzeltme",
    href: "/hizmetler/boyasiz-gocuk-duzeltme",
    description: "Aracınızın orijinal boyasını bozmadan uygulanan profesyonel göçük düzeltme (PDR) işlemi.",
  },
  {
    title: "Detaylı Araç Temizliği (Familya)",
    href: "/hizmetler/detayli-arac-temizligi",
    description: "Aracınızın iç mekanında hijyen sağlayan kapsamlı detaylı temizlik ve familya uygulaması.",
  },
  {
    title: "VIP Oto Yıkama",
    href: "/hizmetler/vip-oto-yikama",
    description: "Aracınıza özel, standartların ötesinde özenli ve detaylı VIP oto yıkama hizmeti.",
  },
  {
    title: "Renkli Kaplama",
    href: "/hizmetler/renkli-kaplama",
    description: "Premium vinil filmler kullanarak aracınızı tamamen yeni bir renge dönüştürme.",
  },
  {
    title: "Krom Kaplama",
    href: "/hizmetler/krom-kaplama",
    description: "Aracınızın detaylarına veya tamamına lüks ve göz alıcı bir görünüm kazandıran krom kaplama hizmetleri.",
  },
  {
    title: "Çekici Hizmeti",
    href: "/iletisim",
    description: "Aracınızın güvenli bir şekilde taşınması için profesyonel çekici hizmeti.",
  },
]

export default function Services({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const HeadingTag = headingAs

  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <HeadingTag className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Hizmetlerimiz</HeadingTag>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Her türlü araç için profesyonel kaplama ve bakım hizmetleri
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staticServices.map((service, index) => (
            <Link href={service.href} key={index} className="block group">
              <Card className="h-full border-2 transition-all hover:border-primary/50 group-hover:border-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Circle className="h-5 w-5 fill-primary text-primary" />
                    <CardTitle>{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
