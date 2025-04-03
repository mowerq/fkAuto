"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getSupabaseClient } from "@/lib/supabase/client"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

interface Settings {
  phone: string
  email: string
  address: string
  workingHoursWeekday: string
  workingHoursSaturday: string
  workingHoursSunday: string
}

export default function Contact() {
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [settings, setSettings] = useState<Settings>({
    phone: "0531 434 16 04",
    email: "info@fkauto.com",
    address: "Kaplama Caddesi No: 123, Otomotiv Mahallesi, İstanbul",
    workingHoursWeekday: "09:00 - 18:00",
    workingHoursSaturday: "10:00 - 16:00",
    workingHoursSunday: "Kapalı",
  })

  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await supabase.from("settings").select("*")

        if (data && data.length > 0) {
          const settingsObj = data.reduce((acc: { [key: string]: string }, item: { key: string, value: string }) => {
            acc[item.key] = item.value
            return acc
          }, {})

          setSettings((prev) => ({
            ...prev,
            ...settingsObj,
          }))
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }

    fetchSettings()
  }, [supabase])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Bir hata oluştu")
      }

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" })

      // Show success message
      toast({
        title: "Mesajınız gönderildi",
        description: "En kısa sürede size geri döneceğiz.",
        variant: "default",
      })
    } catch (error: any) {
      console.error("Form submission error:", error)
      toast({
        title: "Hata",
        description: error.message || "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">İletişim</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Ücretsiz danışma ve teklif için bizimle iletişime geçin
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bize Mesaj Gönderin</CardTitle>
              <CardDescription>Aşağıdaki formu doldurun, en kısa sürede size geri döneceğiz.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ahmet Yılmaz"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ahmet@ornek.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon Numarası</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="0531 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Projeniz hakkında bize bilgi verin..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-8">
            <Card>
              <CardHeader>
                <CardTitle>İletişim Bilgileri</CardTitle>
                <CardDescription>Aşağıdaki bilgileri kullanarak doğrudan bize ulaşabilirsiniz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Adres</h4>
                    <p className="text-muted-foreground">{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Telefon</h4>
                    <p className="text-muted-foreground">{settings.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">E-posta</h4>
                    <p className="text-muted-foreground">{settings.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Çalışma Saatleri</h4>
                    <p className="text-muted-foreground">Pazartesi - Cuma: {settings.workingHoursWeekday}</p>
                    <p className="text-muted-foreground">Cumartesi: {settings.workingHoursSaturday}</p>
                    <p className="text-muted-foreground">Pazar: {settings.workingHoursSunday}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11996.44475527692!2d36.3377416!3d41.2629149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4087d89c807d8ebf%3A0x27b584c2aa3ed9bb!2zRGVyZWJhaMOnZSwgR8O8bcO8xZ9lxZ9payBTayBObzozLzEsIDU1MDYwIMSwbGthZMSxbS9TYW1zdW4!5e0!3m2!1sen!2str!4v1743682981514!5m2!1sen!2str" width="100%" height="250" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
