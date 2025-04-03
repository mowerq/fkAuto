import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-32 dark:bg-black">
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
          <div className="mx-auto mb-8 w-64">
            <Image src="/logo.png" alt="FK Auto Logo" width={300} height={150} className="w-full h-auto" />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl dark:text-white">
            <span className="text-primary">Araç Estetik</span> Merkezi
          </h1>
          <p className="mb-8 text-lg text-gray-300 md:text-xl dark:text-gray-300">
            Aracınızı profesyonel kaplama ve estetik hizmetlerimizle dönüştürün. Özel tasarımlar, renk değişimleri ve
            koruma filmleri uzman montajıyla.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto">
              Çalışmalarımızı Görün
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Teklif Alın
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}

