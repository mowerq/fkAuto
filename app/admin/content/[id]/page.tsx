"use client"

import { useState, useEffect } from "react"
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

// Type for form data to improve type safety
interface ContentFormData {
  section: string
  key: string
  value: string
  type: string
}

export default function EditContentPage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContentFormData>({
    section: "",
    key: "",
    value: "",
    type: "",
  })

  const router = useRouter()
  const params = useParams()
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

      // Fetch content based on params.id
      if (!params.id) {
        console.error("No content ID in URL params.")
        router.push("/admin/content")
        return
      }

      const { data: content, error } = await supabase.from("content").select("*").eq("id", params.id).single()

      if (error || !content) {
        console.error("Error fetching content:", error)
        router.push("/admin/content")
        return
      }

      setFormData({
        section: content.section,
        key: content.key,
        value: content.value || "",
        type: content.type,
      })

      setLoading(false)
    }

    fetchData()
  }, [router, supabase, params.id])

  // Handle change for input and textarea elements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle change for select fields
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Submit the form to update content
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase
        .from("content")
        .update({
          section: formData.section,
          key: formData.key,
          value: formData.value,
          type: formData.type,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      router.push("/admin/content")
    } catch (error) {
      console.error("Error updating content:", error)
      alert("İçerik güncellenirken bir hata oluştu.")
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
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
            <h2 className="text-3xl font-bold tracking-tight">İçerik Düzenle</h2>
            <p className="text-muted-foreground">Web sitesi içeriklerini yönetin.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>İçerik Bilgileri</CardTitle>
              <CardDescription>Lütfen aşağıdaki bilgileri düzenleyin.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="section">Bölüm</Label>
                  <Select value={formData.section} onValueChange={(value) => handleSelectChange("section", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Bölüm seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Ana Sayfa (Hero)</SelectItem>
                      <SelectItem value="about">Hakkımızda</SelectItem>
                      <SelectItem value="services">Hizmetler</SelectItem>
                      <SelectItem value="gallery">Galeri</SelectItem>
                      <SelectItem value="contact">İletişim</SelectItem>
                      <SelectItem value="footer">Alt Bilgi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key">Anahtar</Label>
                  <Input id="key" name="key" value={formData.key} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">İçerik Türü</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="İçerik türü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Metin</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="image">Resim URL</SelectItem>
                      <SelectItem value="link">Bağlantı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">Değer</Label>
                  {formData.type === "html" ? (
                    <Textarea
                      id="value"
                      name="value"
                      rows={6}
                      value={formData.value}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <Input id="value" name="value" value={formData.value} onChange={handleChange} required />
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Güncelleniyor..." : "Güncelle"}
                  </Button>
                  <Link href="/admin/content">
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
