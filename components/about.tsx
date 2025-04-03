import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight mb-6 sm:text-4xl">Hakkımızda</h2>
            <p className="mb-4 text-muted-foreground">
              FK Auto Araç Estetik Merkezi, Faruk KALAYCI tarafından kurulmuş, araç kaplama ve koruma konusunda
              uzmanlaşmış bir firmadır. Yılların deneyimi ve sektördeki uzmanlığımızla, araçlarınıza en kaliteli hizmeti
              sunmayı hedefliyoruz.
            </p>
            <p className="mb-6 text-muted-foreground">
              Müşteri memnuniyetini ön planda tutarak, her araç için özel çözümler üretiyor ve en kaliteli malzemelerle
              çalışıyoruz. Amacımız, aracınızın görünümünü ve değerini en üst seviyeye çıkarmak.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <Phone className="h-5 w-5 text-primary" />
              <span className="font-medium">+90 531 434 16 04</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Daha Fazla Bilgi</Button>
              <Button variant="outline">İletişime Geçin</Button>
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/fk.png"
              alt="Faruk KALAYCI - FK Auto Kurucusu"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-xl font-bold">Faruk KALAYCI</h3>
              <p className="text-white/80">Kurucu & Uzman</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

