"use client"

import { useEffect, useState, ChangeEvent } from "react"
import { useRouter, useParams } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

// Define the type for formData state
type FormData = {
  title: string
  description: string
  category: string
  imageUrl: string
  displayOrder: number
}

export default function EditGalleryItemPage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    displayOrder: 0,
  })
  const [error, setError] = useState<string>("") // State to store error messages

  const router = useRouter()
  const { id } = useParams() // Destructure `id` from useParams
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchData() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/admin/login")
        return
      }

      // Fetch gallery item
      const { data: item, error } = await supabase.from("gallery").select("*").eq("id", id).single()

      if (error || !item) {
        console.error("Error fetching gallery item:", error)
        setError("Galeri öğesi alınırken bir hata oluştu.")
        router.push("/admin/gallery")
        return
      }

      setFormData({
        title: item.title,
        description: item.description || "",
        category: item.category,
        imageUrl: item.image_url,
        displayOrder: item.display_order,
      })

      setLoading(false)
    }

    fetchData()
  }, [router, supabase, id])

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select value changes
  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Basic URL validation (for image URL)
  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("") // Clear previous errors

    // Basic validation
    if (!formData.title || !formData.imageUrl || !isValidUrl(formData.imageUrl)) {
      setError("Başlık ve geçerli bir resim URL'si gereklidir.")
      setSubmitting(false)
      return
    }

    try {
      const { error } = await supabase
        .from("gallery")
        .update({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          image_url: formData.imageUrl,
          display_order: Number.parseInt(formData.displayOrder.toString()) || 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      router.push("/admin/gallery")
    } catch (error) {
      console.error("Error updating gallery item:", error)
      setError("Galeri öğesi güncellenirken bir hata oluştu.")
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
            <h2 className="text-3xl font-bold tracking-tight">Galeri Öğesini Düzenle</h2>
            <p className="text-muted-foreground">Galeri öğesinin bilgilerini güncelleyin.</p>
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}

          <Card>
            <CardHeader>
              <CardTitle>Galeri Öğesi Bilgileri</CardTitle>
              <CardDescription>Lütfen aşağıdaki bilgileri düzenleyin.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="color-change">Renk Değişimi</SelectItem>
                      <SelectItem value="custom">Özel Tasarımlar</SelectItem>
                      <SelectItem value="commercial">Ticari</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Resim URL'si</Label>
                  <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                </div>

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

                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Güncelleniyor..." : "Güncelle"}
                  </Button>
                  <Link href="/admin/gallery">
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
