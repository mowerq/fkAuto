import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-32">
      <div className="absolute inset-0 z-0 opacity-40">
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-80"
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Premium <span className="text-primary">Araç Kaplama</span> Hizmetleri
          </h1>
          <p className="mb-8 text-lg text-gray-300 md:text-xl">
            Aracınızı profesyonel vinil kaplama hizmetlerimizle dönüştürün. Özel tasarımlar, renk değişimleri ve koruma
            filmleri uzman montajıyla.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto">
              Çalışmalarımızı Görün
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Teklif Alın
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}

