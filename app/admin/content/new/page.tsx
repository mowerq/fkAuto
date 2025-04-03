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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function NewContentPage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    section: "hero",
    key: "",
    value: "",
    type: "text",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase.from("content").insert({
        section: formData.section,
        key: formData.key,
        value: formData.value,
        type: formData.type,
      })

      if (error) throw error

      router.push("/admin/content")
    } catch (error: any) {
      console.error("Error creating content:", error.message)
      alert("İçerik oluşturulurken bir hata oluştu.")
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
            <h2 className="text-3xl font-bold tracking-tight">Yeni İçerik Ekle</h2>
            <p className="text-muted-foreground">Web sitesi içeriklerini yönetin.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>İçerik Bilgileri</CardTitle>
              <CardDescription>Lütfen aşağıdaki bilgileri doldurun.</CardDescription>
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
                  <Input
                    id="key"
                    name="key"
                    placeholder="örn: title, description, buttonText"
                    value={formData.key}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">İçeriği tanımlayan benzersiz bir anahtar girin.</p>
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
                    {submitting ? "Kaydediliyor..." : "Kaydet"}
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
