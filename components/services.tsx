import { Car, Palette, Shield, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const services = [
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "Renk Değişim Kaplamaları",
      description:
        "Aracınızı mat, parlak, saten veya özel yüzeylerle premium vinil filmler kullanarak tamamen yeni bir renge dönüştürün.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Özel Tasarımlar",
      description:
        "Özel grafikler, desenler ve markalamayla fark yaratın. Tasarım ekibimiz vizyonunuzu hassasiyet ve yaratıcılıkla hayata geçirmenize yardımcı olacaktır.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Boya Koruma Filmi",
      description:
        "Aracınızın boyasını taş çiziklerine, çiziklere ve çevresel hasarlara karşı görünmez koruma filmlerimizle koruyun.",
    },
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "Ticari Kaplamalar",
      description:
        "Filonuzu ticari kaplama hizmetlerimizle mobil reklam panolarına dönüştürün. Göz alıcı araç grafikleriyle marka görünürlüğünüzü artırın.",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Hizmetlerimiz</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Her türlü araç için profesyonel vinil kaplama hizmetleri
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="border-2 transition-all hover:border-primary/50">
              <CardHeader className="pb-2">
                <div className="mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
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

