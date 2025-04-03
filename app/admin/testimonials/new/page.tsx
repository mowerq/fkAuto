"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function NewTestimonialPage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    imageUrl: string;
    stars: number;
    quote: string;
    displayOrder: number;
    isActive: boolean;
  }>({
    name: "",
    role: "",
    imageUrl: "",
    stars: 5,
    quote: "",
    displayOrder: 0,
    isActive: true,
  })

  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/admin/login")
        return
      }

      setLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked, // assert the type as HTMLInputElement
      }));
    } else if (name === "displayOrder") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value), // safely convert to number for 'displayOrder'
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // for other input types like text, textarea, etc.
      }));
    }
  }
  

  const handleStarsChange = (value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      stars: value[0],
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase.from("testimonials").insert({
        name: formData.name,
        role: formData.role,
        image_url: formData.imageUrl,
        stars: formData.stars,
        quote: formData.quote,
        display_order: Number(formData.displayOrder) || 0,
        is_active: formData.isActive,
      })

      if (error) throw error

      router.push("/admin/testimonials")
    } catch (error) {
      console.error("Error creating testimonial:", error)
      alert("Müşteri yorumu oluşturulurken bir hata oluştu.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Yükleniyor...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Yeni Müşteri Yorumu Ekle</h2>
            <p className="text-muted-foreground">Müşteri yorumları bölümüne yeni bir yorum ekleyin.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Müşteri Yorumu Bilgileri</CardTitle>
              <CardDescription>Lütfen aşağıdaki bilgileri doldurun.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Müşteri Adı</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Ünvan/Rol</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="Örn: BMW Sahibi"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Profil Resmi URL'si</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Resim yüklemek için önce bir görsel yükleme servisine yükleyin ve URL'sini buraya girin.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Yıldız Sayısı: {formData.stars}</Label>
                  <Slider
                    defaultValue={[5]}
                    max={5}
                    min={1}
                    step={1}
                    value={[formData.stars]}
                    onValueChange={handleStarsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quote">Yorum Metni</Label>
                  <Textarea id="quote" name="quote" rows={4} value={formData.quote} onChange={handleChange} required />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="displayOrder">Görüntüleme Sırası</Label>
                    <Input
                      id="displayOrder"
                      name="displayOrder"
                      type="number"
                      value={formData.displayOrder}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-8">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                    <Label htmlFor="isActive">Aktif</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                  <Link href="/admin/testimonials">
                    <Button variant="outline" type="button">
                      İptal
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
