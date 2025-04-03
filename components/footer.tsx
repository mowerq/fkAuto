"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { Circle } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"

// Define types for settings and services
type Settings = {
  phone: string
  email: string
  address: string
  workingHoursWeekday: string
  workingHoursSaturday: string
  workingHoursSunday: string
  facebook: string
  instagram: string
  twitter: string
  youtube: string
}

type Service = {
  id: number
  title: string
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    phone: "0531 434 16 04",
    email: "info@fkauto.com",
    address: "Kaplama Caddesi No: 123, Otomotiv Mahallesi, İstanbul",
    workingHoursWeekday: "09:00 - 18:00",
    workingHoursSaturday: "10:00 - 16:00",
    workingHoursSunday: "Kapalı",
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    youtube: "https://youtube.com/",
  })
  
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // For error handling
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch settings
        const { data: settingsData, error: settingsError } = await supabase.from("settings").select("*")
        if (settingsError) {
          throw new Error("Error fetching settings")
        }

        if (settingsData && settingsData.length > 0) {
          const settingsObj = settingsData.reduce((acc: Settings, item: { key: string; value: string }) => {
            acc[item.key as keyof Settings] = item.value
            return acc
          }, {} as Settings)

          setSettings((prev) => ({
            ...prev,
            ...settingsObj,
          }))
        }

        // Fetch services for footer
        const { data: servicesData, error: servicesError } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true })
          .limit(6)

        if (servicesError) {
          throw new Error("Error fetching services")
        }

        if (servicesData) {
          setServices(servicesData)
        }
      } catch (error: any) {
        setError(error.message)
        console.error("Error fetching footer data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="FK Auto Logo"
                width={150}
                height={70}
                className="h-auto w-full max-w-[150px]"
              />
            </Link>
            <p className="mb-4 text-muted-foreground">
              Premium araç kaplama ve estetik hizmetleri. Uzman montaj ve kaliteli malzemelerle aracınızı dönüştürün.
            </p>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{settings.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-muted-foreground">{settings.address}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href={settings.facebook} className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={settings.instagram} className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={settings.twitter} className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href={settings.youtube} className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-muted-foreground hover:text-primary">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-muted-foreground hover:text-primary">
                  Süreç
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-muted-foreground hover:text-primary">
                  Yorumlar
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Hizmetler</h3>
            <ul className="space-y-2">
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Circle className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-muted-foreground">Yükleniyor...</span>
                      </li>
                    ))
                : services.map((service) => (
                    <li key={service.id} className="flex items-center gap-2">
                      <Circle className="h-3 w-3 fill-primary text-primary" />
                      <Link href="#" className="text-muted-foreground hover:text-primary">
                        {service.title}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Çalışma Saatleri</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span>{settings.workingHoursWeekday}</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi:</span>
                <span>{settings.workingHoursSaturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Pazar:</span>
                <span>{settings.workingHoursSunday}</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">İletişim</h4>
              <p className="text-muted-foreground">Telefon: {settings.phone}</p>
              <p className="text-muted-foreground">E-posta: {settings.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FK Auto Araç Estetik Merkezi. Tüm hakları saklıdır. | Kurucu: Faruk KALAYCI
          </p>
        </div>
      </div>
    </footer>
  )
}
