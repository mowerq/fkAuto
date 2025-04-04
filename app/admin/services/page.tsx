import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2, Circle } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

// Define the type for a service object
type Service = {
  id: number
  title: string
  description: string
  display_order: number
  is_active: boolean
  updated_at: string
}

export default function ServicesPage() {
  const [loading, setLoading] = useState(true)
  // Define the services state with the Service type
  const [services, setServices] = useState<Service[]>([]) // Ensuring TypeScript knows the shape of services
  const router = useRouter()
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

      // Fetch services
      const { data } = await supabase.from("services").select("*").order("display_order", { ascending: true })

      setServices(data || [])
      setLoading(false)
    }

    fetchData()
  }, [router, supabase])

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id)

      if (error) throw error

      // Update the UI
      setServices(services.filter((service) => service.id !== id))
    } catch (error) {
      console.error("Error deleting service:", error)
      alert("Silme işlemi başarısız oldu.")
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

      // Update the UI
      setServices(
        services.map((service) => (service.id === id ? { ...service, is_active: !service.is_active } : service)),
      )
    } catch (error) {
      console.error("Error toggling service status:", error)
      alert("Durum değiştirme işlemi başarısız oldu.")
    }
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Yükleniyor...</div>
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-4 pt-0 lg:p-6 lg:pl-72">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hizmet Yönetimi</h2>
              <p className="text-muted-foreground">Sunduğunuz hizmetleri ekleyin, düzenleyin veya silin.</p>
            </div>
            <Link href="/admin/services/new">
              <Button className="flex items-center gap-2 w-full sm:w-auto">
                <PlusCircle className="h-4 w-4" />
                Yeni Hizmet Ekle
              </Button>
            </Link>
          </div>

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
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block rounded-md border">
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

              {/* Mobile Card View */}
              <div className="grid gap-4 md:hidden">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Circle className="h-4 w-4 fill-primary text-primary" />
                          <h3 className="font-semibold">{service.title}</h3>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground mr-2">Sıra: {service.display_order}</span>
                          <Switch
                            checked={service.is_active}
                            onCheckedChange={() => handleToggleStatus(service.id, service.is_active)}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/services/${service.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Pencil className="h-3 w-3 mr-1" />
                            Düzenle
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Sil
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
