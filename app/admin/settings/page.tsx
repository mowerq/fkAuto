"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Settings = {
  phone?: string
  email?: string
  address?: string
  workingHoursWeekday?: string
  workingHoursSaturday?: string
  workingHoursSunday?: string
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [settings, setSettings] = useState<Settings>({})
  const [error, setError] = useState<string | null>(null)
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

        // Fetch settings
        const { data, error } = await supabase.from("settings").select("*")

        if (error) {
          setError("Ayarlar yüklenirken bir hata oluştu.")
          console.error(error)
          return
        }

        // Convert settings array to object
        const settingsObj: Settings = (data || []).reduce((acc: Settings, item: { key: string; value: string | undefined }) => {
          acc[item.key as keyof Settings] = item.value
          return acc
        }, {})

        setSettings(settingsObj)
      } catch (err) {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.")
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  const handleChange = (key: keyof Settings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent, section: string) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Determine which settings to update based on section
      const keysToUpdate =
        section === "contact"
          ? ["phone", "email", "address", "workingHoursWeekday", "workingHoursSaturday", "workingHoursSunday"]
          : ["facebook", "instagram", "twitter", "youtube"]

      // Update each setting
      for (const key of keysToUpdate) {
        const { error } = await supabase
          .from("settings")
          .update({ value: settings[key as keyof Settings] || "" })
          .eq("key", key)

        if (error) throw error
      }

      alert("Ayarlar başarıyla kaydedildi.")
    } catch (error) {
      console.error("Error updating settings:", error)
      alert("Ayarlar kaydedilirken bir hata oluştu.")
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
            <h2 className="text-3xl font-bold tracking-tight">Site Ayarları</h2>
            <p className="text-muted-foreground">Web sitesi genel ayarlarını yönetin.</p>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>İletişim Bilgileri</CardTitle>
                <CardDescription>Web sitesinde görüntülenen iletişim bilgilerini güncelleyin.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "contact")} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon Numarası</Label>
                      <Input
                        id="phone"
                        value={settings.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        value={settings.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      value={settings.address || ""}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="workingHoursWeekday">Hafta İçi Çalışma Saatleri</Label>
                      <Input
                        id="workingHoursWeekday"
                        value={settings.workingHoursWeekday || ""}
                        onChange={(e) => handleChange("workingHoursWeekday", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workingHoursSaturday">Cumartesi Çalışma Saatleri</Label>
                      <Input
                        id="workingHoursSaturday"
                        value={settings.workingHoursSaturday || ""}
                        onChange={(e) => handleChange("workingHoursSaturday", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workingHoursSunday">Pazar Çalışma Saatleri</Label>
                      <Input
                        id="workingHoursSunday"
                        value={settings.workingHoursSunday || ""}
                        onChange={(e) => handleChange("workingHoursSunday", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Kaydediliyor..." : "Ayarları Kaydet"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sosyal Medya</CardTitle>
                <CardDescription>Sosyal medya hesaplarınızın bağlantılarını güncelleyin.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "social")} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={settings.facebook || ""}
                        onChange={(e) => handleChange("facebook", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={settings.instagram || ""}
                        onChange={(e) => handleChange("instagram", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={settings.twitter || ""}
                        onChange={(e) => handleChange("twitter", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input
                        id="youtube"
                        value={settings.youtube || ""}
                        onChange={(e) => handleChange("youtube", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Kaydediliyor..." : "Ayarları Kaydet"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
