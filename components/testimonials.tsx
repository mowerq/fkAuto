import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const staticTestimonials = [
  {
    id: "1",
    name: "Ali Yılmaz",
    role: "BMW Sahibi",
    image_url: "/placeholder.svg?height=100&width=100",
    stars: 5,
    quote:
      "BMW'min üzerindeki mat siyah kaplama kesinlikle muhteşem görünüyor. Detaylara gösterilen özen ve işin kalitesi beklentilerimi aştı. Kesinlikle tavsiye ederim!",
  },
  {
    id: "2",
    name: "Ayşe Kaya",
    role: "İşletme Sahibi",
    image_url: "/placeholder.svg?height=100&width=100",
    stars: 5,
    quote:
      "FK Auto, teslimat filomuzu göz alıcı marka kaplamalarıyla dönüştürdü. Süreç sorunsuzdu ve sonuçlar marka görünürlüğümüzü önemli ölçüde artırdı.",
  },
  {
    id: "3",
    name: "Mehmet Demir",
    role: "Audi Sahibi",
    image_url: "/placeholder.svg?height=100&width=100",
    stars: 5,
    quote:
      "Audi'me özel tasarım kaplama yaptırdım ve sonuçlardan daha mutlu olamazdım. Ekip profesyoneldi ve montaj kusursuzdu.",
  },
]

export default function Testimonials({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const HeadingTag = headingAs

  return (
    <section id="testimonials" className="bg-muted py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <HeadingTag className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Müşterilerimiz Ne Diyor</HeadingTag>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Sadece bizim sözümüze güvenmeyin - memnun müşterilerimizden dinleyin
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {staticTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-2 transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-6 italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image_url || "/placeholder.svg?height=100&width=100"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
