"use client"

import { useEffect, useState } from "react"
import { Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services")
        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error)
        // Fallback to default services
        setServices([
          {
            title: "Cam Filmi",
            description:
              "Araç camlarınız için UV korumalı, ısı yalıtımlı ve güvenlik sağlayan profesyonel cam filmi uygulaması.",
          },
          {
            title: "PPF Kaplama",
            description:
              "Aracınızın boyasını taş çiziklerine, çiziklere ve çevresel hasarlara karşı koruyacak şeffaf koruma filmi uygulaması.",
          },
          {
            title: "Seramik (Pasta, Cila) Uygulama",
            description:
              "Aracınızın boyasına uzun süreli parlaklık ve koruma sağlayan profesyonel seramik kaplama, pasta ve cila uygulamaları.",
          },
          {
            title: "Renkli Kaplama",
            description:
              "Aracınızı mat, parlak, saten veya özel yüzeylerle premium vinil filmler kullanarak tamamen yeni bir renge dönüştürme.",
          },
          {
            title: "Krom Kaplama",
            description:
              "Aracınızın detaylarına veya tamamına lüks ve göz alıcı bir görünüm kazandıran krom kaplama hizmetleri.",
          },
          {
            title: "Çekici Hizmeti",
            description: "Aracınızın güvenli bir şekilde taşınması için profesyonel çekici hizmeti.",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <section id="services" className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Hizmetlerimiz</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Her türlü araç için profesyonel kaplama ve bakım hizmetleri
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="border-2 transition-all hover:border-primary/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
                    <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Hizmetlerimiz</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Her türlü araç için profesyonel kaplama ve bakım hizmetleri
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="border-2 transition-all hover:border-primary/50">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Circle className="h-5 w-5 fill-primary text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

