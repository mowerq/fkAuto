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
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function NewServicePage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "circle",
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

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    // Handle different types of inputs (checkbox vs text inputs)
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase.from("services").insert({
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        display_order: Number.parseInt(formData.displayOrder.toString()) || 0,
        is_active: formData.isActive,
      })

      if (error) throw error

      router.push("/admin/services")
    } catch (error) {
      console.error("Error creating service:", error)
      alert("Hizmet oluşturulurken bir hata oluştu.")
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
            <h2 className="text-3xl font-bold tracking-tight">Yeni Hizmet Ekle</h2>
            <p className="text-muted-foreground">Sunduğunuz hizmetlere yeni bir hizmet ekleyin.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hizmet Bilgileri</CardTitle>
              <CardDescription>Lütfen aşağıdaki bilgileri doldurun.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">İkon</Label>
                  <Input
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Varsayılan olarak "circle" kullanılır. Lucide React ikonları kullanılabilir.
                  </p>
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
                  <Link href="/admin/services">
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
