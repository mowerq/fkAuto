"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define TypeScript types for the content data
type ContentItem = {
  id: number
  key: string
  value: string
  type: string
  section: string
}

export default function ContentPage() {
  const [loading, setLoading] = useState(true)
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [contentBySection, setContentBySection] = useState<Record<string, ContentItem[]>>({})
  const [sections, setSections] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null) // Error handling state
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

        // Fetch content items from Supabase
        const { data, error } = await supabase.from("content").select("*").order("section", { ascending: true })
        if (error) throw error

        setContentItems(data || [])

        // Group content by section
        const bySection: Record<string, ContentItem[]> = data?.reduce((acc: { [x: string]: any[] }, item: { section: string | number }) => {
          if (!acc[item.section]) {
            acc[item.section] = []
          }
          acc[item.section].push(item)
          return acc
        }, {} as Record<string, ContentItem[]>)

        setContentBySection(bySection)
        setSections(Object.keys(bySection))
      } catch (err) {
        setError("Veri alınırken bir hata oluştu. Lütfen tekrar deneyin.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Yükleniyor...</span> {/* You could replace this with a spinner */}
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
              <h2 className="text-3xl font-bold tracking-tight">İçerik Yönetimi</h2>
              <p className="text-muted-foreground">Web sitesindeki metinleri ve içerikleri düzenleyin.</p>
            </div>
            <Link href="/admin/content/new">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Yeni İçerik Ekle
              </Button>
            </Link>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}

          {sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">Henüz içerik yok</h3>
              <p className="mb-4 mt-1 text-sm text-muted-foreground">
                İçerik eklemek için "Yeni İçerik Ekle" butonuna tıklayın.
              </p>
              <Link href="/admin/content/new">
                <Button>İçerik Ekle</Button>
              </Link>
            </div>
          ) : (
            <Tabs defaultValue={sections[0]}>
              <TabsList className="mb-4">
                {sections.map((section) => (
                  <TabsTrigger key={section} value={section}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {sections.map((section) => (
                <TabsContent key={section} value={section}>
                  <div className="rounded-md border">
                    {contentBySection[section].length === 0 ? (
                      <div className="p-6 text-center">Bu bölümde içerik bulunmamaktadır.</div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-3 text-left font-medium">Anahtar</th>
                            <th className="p-3 text-left font-medium">Değer</th>
                            <th className="p-3 text-left font-medium">Tür</th>
                            <th className="p-3 text-right font-medium">İşlemler</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contentBySection[section].map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="p-3 font-medium">{item.key}</td>
                              <td className="p-3 max-w-md truncate">{item.value}</td>
                              <td className="p-3">{item.type}</td>
                              <td className="p-3 text-right">
                                <Link href={`/admin/content/${item.id}`}>
                                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Pencil className="h-3 w-3" />
                                    Düzenle
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </main>
      </div>
    </div>
  )
}
