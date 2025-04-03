"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getSupabaseClient } from "@/lib/supabase/client"

// Define the gallery item type
type GalleryItem = {
  id: number
  title: string
  description: string
  image_url: string
  category: string
  display_order: number
}

export default function GalleryPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]) // Define the type of galleryItems
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

      // Fetch gallery items
      const { data } = await supabase.from("gallery").select("*").order("display_order", { ascending: true })

      setGalleryItems(data || [])
      setLoading(false)
    }

    fetchData()
  }, [router, supabase])

  const handleDelete = async (id: number) => { // Add parameter type
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id)

      if (error) throw error

      // Update the UI
      setGalleryItems(galleryItems.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting gallery item:", error)
      alert("Silme işlemi başarısız oldu.")
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Galeri Yönetimi</h2>
              <p className="text-muted-foreground">Galeri fotoğraflarını ekleyin, düzenleyin veya silin.</p>
            </div>
            <Link href="/admin/gallery/new">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Yeni Fotoğraf Ekle
              </Button>
            </Link>
          </div>

          {galleryItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">Henüz galeri öğesi yok</h3>
              <p className="mb-4 mt-1 text-sm text-muted-foreground">
                Galeriye fotoğraf eklemek için "Yeni Fotoğraf Ekle" butonuna tıklayın.
              </p>
              <Link href="/admin/gallery/new">
                <Button>Fotoğraf Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={item.image_url || "/placeholder.svg?height=600&width=800"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground">Kategori: {item.category}</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link href={`/admin/gallery/${item.id}`}>
                      <Button variant="secondary" size="sm" className="flex items-center gap-1">
                        <Pencil className="h-3 w-3" />
                        Düzenle
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      Sil
                    </Button>
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
