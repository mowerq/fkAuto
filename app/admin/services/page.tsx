"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2, Circle } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"

// Define types for service data
type Service = {
  id: number
  title: string
  description: string
  display_order: number
  is_active: boolean
}

export default function ServicesPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [services, setServices] = useState<Service[]>([])
  const [error, setError] = useState<string | null>(null) // To handle error messages
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          router.push("/admin/login")
          return
        }

        const { data, error } = await supabase.from("services").select("*").order("display_order", { ascending: true })
        
        if (error) throw error
        setServices(data || [])
        setLoading(false)
      } catch (error) {
        setError("Hizmetler yüklenirken bir hata oluştu.")
        console.error(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) {
      try {
        const { error } = await supabase.from("services").delete().eq("id", id)
        if (error) throw error

        setServices((prev) => prev.filter((service) => service.id !== id))
      } catch (error) {
        setError("Silme işlemi başarısız oldu.")
        console.error(error)
      }
    }
  }

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("services")
        .update({
          is_active: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      // Update the UI with the new status
      setServices((prev) =>
        prev.map((service) =>
          service.id === id ? { ...service, is_active: !currentStatus } : service
        )
      )
    } catch (error) {
      setError("Durum değiştirme işlemi başarısız oldu.")
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-lg">Yükleniyor...</span>
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
              <h2 className="text-3xl font-bold tracking-tight">Hizmet Yönetimi</h2>
              <p className="text-muted-foreground">Sunduğunuz hizmetleri ekleyin, düzenleyin veya silin.</p>
            </div>
            <Link href="/admin/services/new">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Yeni Hizmet Ekle
              </Button>
            </Link>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error display */}

          {services.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">Henüz hizmet yok</h3>
              <p className="mb-4 mt-1 text-sm text-muted-foreground">
                Hizmet eklemek için "Yeni Hizmet Ekle" butonuna tıklayın.
              </p>
              <Link href="/admin/services/new">
                <Button>Hizmet Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">Sıra</th>
                    <th className="p-3 text-left font-medium">Başlık</th>
                    <th className="p-3 text-left font-medium">Açıklama</th>
                    <th className="p-3 text-left font-medium">Durum</th>
                    <th className="p-3 text-right font-medium">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b">
                      <td className="p-3">{service.display_order}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Circle className="h-4 w-4 fill-primary text-primary" />
                          {service.title}
                        </div>
                      </td>
                      <td className="p-3 max-w-md truncate">{service.description}</td>
                      <td className="p-3">
                        <Switch
                          checked={service.is_active}
                          onCheckedChange={() => handleToggleStatus(service.id, service.is_active)}
                        />
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/services/${service.id}`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Pencil className="h-3 w-3" />
                              Düzenle
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                            Sil
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
