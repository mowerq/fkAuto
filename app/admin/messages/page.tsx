"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Trash2, MailOpen } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale"

// Type definition for messages
interface Message {
  id: number
  name: string
  email: string
  phone: string | null
  message: string
  created_at: string
  is_read: boolean
}

export default function MessagesPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<Message[]>([])
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

      // Fetch messages
      const { data } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      setMessages(data || [])
      setLoading(false)
    }

    fetchData()
  }, [router, supabase])

  const handleMarkAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({
          is_read: true,
        })
        .eq("id", id)

      if (error) throw error

      // Update the UI
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, is_read: true } : message
        )
      )
    } catch (error) {
      console.error("Error marking message as read:", error)
      alert("İşlem başarısız oldu.")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id)

      if (error) throw error

      // Update the UI
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id))
    } catch (error) {
      console.error("Error deleting message:", error)
      alert("Silme işlemi başarısız oldu.")
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
          <div className="mb-6 mt-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Mesajlar</h2>
            <p className="text-muted-foreground">İletişim formundan gelen mesajları görüntüleyin.</p>
          </div>

          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">Henüz mesaj yok</h3>
              <p className="mb-4 mt-1 text-sm text-muted-foreground">
                İletişim formundan gelen mesajlar burada görüntülenecek.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-lg border p-4 ${message.is_read ? "bg-card" : "bg-primary/5 border-primary/20"}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{message.name}</h3>
                        {!message.is_read && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">Yeni</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {message.email} {message.phone && `• ${message.phone}`}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.created_at), {
                        addSuffix: true,
                        locale: tr,
                      })}
                    </div>
                  </div>
                  <div className="mt-2">{message.message}</div>
                  <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
                    {!message.is_read && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 w-full sm:w-auto"
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        <MailOpen className="h-3 w-3" />
                        Okundu Olarak İşaretle
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1 w-full sm:w-auto"
                      onClick={() => handleDelete(message.id)}
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
