"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GalleryItem {
  id: number
  category: string
  title: string
  image_url: string
  description: string
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: "all", label: "Tüm Projeler" },
    { id: "color-change", label: "Renk Değişimi" },
    { id: "custom", label: "Özel Tasarımlar" },
    { id: "commercial", label: "Ticari" },
  ]

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch("/api/gallery")
        if (!response.ok) {
          throw new Error("Failed to fetch gallery")
        }
        const data = await response.json()
        setGalleryItems(data)
      } catch (error) {
        console.error("Error fetching gallery:", error)
        // Fallback to default gallery items
        setGalleryItems([
          {
            id: 1,
            category: "color-change",
            title: "Mat Siyah BMW",
            image_url: "/placeholder.svg?height=600&width=800",
            description: "BMW M4 üzerine tam mat siyah kaplama",
          },
          {
            id: 2,
            category: "color-change",
            title: "Saten Kırmızı Mercedes",
            image_url: "/placeholder.svg?height=600&width=800",
            description: "Mercedes C-Serisi üzerine saten kırmızı kaplama",
          },
          {
            id: 3,
            category: "custom",
            title: "Yarış Şeritleri",
            image_url: "/placeholder.svg?height=600&width=800",
            description: "Mustang GT üzerine özel yarış şeritleri",
          },
          {
            id: 4,
            category: "custom",
            title: "Geometrik Desen",
            image_url: "/placeholder.svg?height=600&width=800",
            description: "Özel geometrik desen kaplama",
          },
          {
            id: 5,
            category: "commercial",
            title: "Kargo Aracı Kaplaması",
            image_url: "/placeholder.svg?height=600&width=800",
            description: "Bir kargo şirketi için tam ticari kaplama",
          },
          {
            id: 6,
            category: "commercial",
            title: "Yemek Kamyonu Markalaması",
            image_url: "/placeholder.svg?height=600&width=800",
            description: "Tam markalama ile özel yemek kamyonu kaplaması",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  if (loading) {
    return (
      <section id="gallery" className="bg-muted py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Çalışmalarımız</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Tamamlanmış vinil kaplama projelerimiz galerisine göz atın
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
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
    <section id="gallery" className="bg-muted py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Çalışmalarımız</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tamamlanmış vinil kaplama projelerimiz galerisine göz atın
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <GalleryItem key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {galleryItems
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <GalleryItem key={item.id} item={item} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function GalleryItem({ item }: { item: GalleryItem }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.image_url || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

