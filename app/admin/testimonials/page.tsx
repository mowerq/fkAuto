"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"

// Type for testimonials
type Testimonial = {
  id: number
  name: string
  role: string
  quote: string
  stars: number
  is_active: boolean
  image_url: string | null
  created_at: string
  updated_at: string
}

export default function TestimonialsPage() {
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [error, setError] = useState<string | null>(null) // For error messages
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/admin/login")
          return
        }

        // Fetch testimonials
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("display_order", { ascending: true })

        if (error) throw error

        setTestimonials(data || [])
      } catch (err) {
        setError("Yorumlar yüklenirken bir hata oluştu.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({
          is_active: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      // Update the UI directly
      setTestimonials((prevTestimonials) =>
        prevTestimonials.map((testimonial) =>
          testimonial.id === id
            ? { ...testimonial, is_active: !testimonial.is_active }
            : testimonial
        )
      )
    } catch (error) {
      setError("Durum değiştirme işlemi başarısız oldu.")
      console.error(error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu yorumu silmek istediğinizden emin misiniz?")) {
      try {
        const { error } = await supabase.from("testimonials").delete().eq("id", id)

        if (error) throw error

        // Remove the testimonial from UI directly
        setTestimonials((prevTestimonials) =>
          prevTestimonials.filter((testimonial) => testimonial.id !== id)
        )
      } catch (error) {
        setError("Silme işlemi başarısız oldu.")
        console.error(error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Yükleniyor...</span> {/* You could replace this with a spinner */}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Müşteri Yorumları</h2>
              <p className="text-muted-foreground">Müşteri yorumlarını ekleyin, düzenleyin veya silin.</p>
            </div>
            <Link href="/admin/testimonials/new">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Yeni Yorum Ekle
              </Button>
            </Link>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error if any */}

          {testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">Henüz müşteri yorumu yok</h3>
              <p className="mb-4 mt-1 text-sm text-muted-foreground">
                Müşteri yorumu eklemek için "Yeni Yorum Ekle" butonuna tıklayın.
              </p>
              <Link href="/admin/testimonials/new">
                <Button>Yorum Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="group relative rounded-lg border p-4">
                  <div className="mb-2 flex">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image_url || "/placeholder.svg?height=100&width=100"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={testimonial.is_active}
                        onCheckedChange={() => handleToggleStatus(testimonial.id, testimonial.is_active)}
                      />
                      <span className="text-sm">{testimonial.is_active ? "Aktif" : "Pasif"}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/admin/testimonials/${testimonial.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Pencil className="h-3 w-3" />
                          Düzenle
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                        Sil
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
