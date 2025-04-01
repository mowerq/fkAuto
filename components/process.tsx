import { CheckCircle2 } from "lucide-react"

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Danışma",
      description:
        "Tam olarak ne aradığınızı anlamak için vizyonunuzu, tercihlerinizi ve gereksinimlerinizi görüşürüz.",
    },
    {
      number: "02",
      title: "Tasarım ve Malzeme Seçimi",
      description:
        "Ekibimiz dijital maketler oluşturur ve projeniz için mükemmel vinil malzemeyi seçmenize yardımcı olur.",
    },
    {
      number: "03",
      title: "Hazırlık",
      description: "Mükemmel yapışma ve kusursuz bir yüzey için aracınızın yüzeyini iyice temizler ve hazırlarız.",
    },
    {
      number: "04",
      title: "Profesyonel Montaj",
      description:
        "Sertifikalı teknisyenlerimiz vinil kaplamayı hassasiyet ve detaylara dikkat ederek dikkatlice uygular.",
    },
    {
      number: "05",
      title: "Kalite Kontrolü",
      description:
        "Her detayın yüksek kalite standartlarımızı karşıladığından emin olmak için kapsamlı bir inceleme gerçekleştiririz.",
    },
    {
      number: "06",
      title: "Teslim",
      description: "Dönüştürülmüş aracınızı teslim etmeden önce bakım talimatları ve garanti bilgilerini sağlarız.",
    },
  ]

  return (
    <section id="process" className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Çalışma Sürecimiz</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">Aracınızı hassasiyet ve özenle nasıl dönüştürüyoruz</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <span className="text-3xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

