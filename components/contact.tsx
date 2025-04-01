"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" })
    // Show success message
    alert("Mesajınız için teşekkürler! En kısa sürede size geri döneceğiz.")
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
                    placeholder="(555) 123 4567"
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
                <Button type="submit" className="w-full">
                  Mesaj Gönder
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
                    <p className="text-muted-foreground">Kaplama Caddesi No: 123, Otomotiv Mahallesi, İstanbul</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Telefon</h4>
                    <p className="text-muted-foreground">(0212) 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">E-posta</h4>
                    <p className="text-muted-foreground">info@fkauto.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Çalışma Saatleri</h4>
                    <p className="text-muted-foreground">Pazartesi - Cuma: 09:00 - 18:00</p>
                    <p className="text-muted-foreground">Cumartesi: 10:00 - 16:00</p>
                    <p className="text-muted-foreground">Pazar: Kapalı</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Teklif Alın</CardTitle>
                <CardDescription>Araç kaplamanız için kişiselleştirilmiş teklif isteyin</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Belirli bir hizmet mi arıyorsunuz veya aklınızda özel bir proje mi var? İhtiyaçlarınıza göre
                  özelleştirilmiş detaylı bir teklif için bizimle iletişime geçin.
                </p>
                <Button className="w-full">Teklif İsteyin</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

