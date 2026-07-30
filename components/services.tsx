import { Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const staticServices = [
  {
    title: "Cam Filmi",
    description:
      "Araç camlarınız için UV korumalı, ısı yalıtımlı ve güvenlik sağlayan profesyonel cam filmi uygulaması.",
  },
  {
    title: "PPF Kaplama",
    description:
      "Aracınızın boyasını taş çiziklerine, çiziklere ve çevresel hasarlara karşı koruyacak şeffaf koruma filmi uygulaması.",
  },
  {
    title: "Seramik (Pasta, Cila) Uygulama",
    description:
      "Aracınızın boyasına uzun süreli parlaklık ve koruma sağlayan profesyonel seramik kaplama, pasta ve cila uygulamaları.",
  },
  {
    title: "Renkli Kaplama",
    description:
      "Aracınızı mat, parlak, saten veya özel yüzeylerle premium vinil filmler kullanarak tamamen yeni bir renge dönüştürme.",
  },
  {
    title: "Krom Kaplama",
    description:
      "Aracınızın detaylarına veya tamamına lüks ve göz alıcı bir görünüm kazandıran krom kaplama hizmetleri.",
  },
  {
    title: "Çekici Hizmeti",
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
            <Card key={index} className="border-2 transition-all hover:border-primary/50">
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
          ))}
        </div>
      </div>
    </section>
  )
}
