"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getSupabaseClient } from "@/lib/supabase/client"

// Define the shape of the testimonial data
interface Testimonial {
  id: string
  name: string
  role: string
  image_url: string
  stars: number
  quote: string
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true })

        if (error) throw error

        setTestimonials(data || [])
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        // Fallback to default testimonials
        setTestimonials([
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
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [supabase])

  if (loading) {
    return (
      <section id="testimonials" className="bg-muted py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Müşterilerimiz Ne Diyor</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Sadece bizim sözümüze güvenmeyin - memnun müşterilerimizden dinleyin
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
                    ))}
                  </div>
                  <div className="mb-6 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
                    <div className="space-y-1">
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
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

  return (
    <section id="testimonials" className="bg-muted py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Müşterilerimiz Ne Diyor</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Sadece bizim sözümüze güvenmeyin - memnun müşterilerimizden dinleyin
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
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
