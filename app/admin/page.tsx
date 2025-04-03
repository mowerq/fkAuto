"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ImageIcon, FileText, Users } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    galleryCount: 0,
    servicesCount: 0,
    testimonialsCount: 0,
    messagesCount: 0,
    unreadMessagesCount: 0,
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

      // Fetch counts for dashboard
      const [
        { count: galleryCount },
        { count: servicesCount },
        { count: testimonialsCount },
        { count: messagesCount },
        { count: unreadMessagesCount },
      ] = await Promise.all([
        supabase.from("gallery").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
      ])

      setStats({
        galleryCount: galleryCount || 0,
        servicesCount: servicesCount || 0,
        testimonialsCount: testimonialsCount || 0,
        messagesCount: messagesCount || 0,
        unreadMessagesCount: unreadMessagesCount || 0,
      })

      setLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Yükleniyor...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">FK Auto web sitesi yönetim paneline hoş geldiniz.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Galeri Öğeleri</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.galleryCount}</div>
                <p className="text-xs text-muted-foreground">Toplam galeri öğesi</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Hizmetler</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.servicesCount}</div>
                <p className="text-xs text-muted-foreground">Aktif hizmet</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Müşteri Yorumları</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.testimonialsCount}</div>
                <p className="text-xs text-muted-foreground">Toplam müşteri yorumu</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Mesajlar</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.messagesCount}</div>
                <p className="text-xs text-muted-foreground">{stats.unreadMessagesCount} okunmamış mesaj</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <a
                  href="/admin/gallery"
                  className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-accent"
                >
                  <ImageIcon className="mb-2 h-6 w-6 text-muted-foreground" />
                  <div className="text-sm font-medium">Galeri Yönetimi</div>
                </a>
                <a
                  href="/admin/services"
                  className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-accent"
                >
                  <FileText className="mb-2 h-6 w-6 text-muted-foreground" />
                  <div className="text-sm font-medium">Hizmetler</div>
                </a>
                <a
                  href="/admin/messages"
                  className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-accent"
                >
                  <MessageSquare className="mb-2 h-6 w-6 text-muted-foreground" />
                  <div className="text-sm font-medium">Mesajlar</div>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yardım</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Admin paneli kullanımı hakkında yardıma mı ihtiyacınız var?
                </p>
                <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-2">
                  <li>Galeri bölümünden fotoğrafları yönetebilirsiniz</li>
                  <li>Hizmetler bölümünden sunduğunuz hizmetleri düzenleyebilirsiniz</li>
                  <li>İçerik bölümünden site metinlerini güncelleyebilirsiniz</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

