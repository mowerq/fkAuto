"use client"

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

export default function Gallery({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const HeadingTag = headingAs

  const categories = [
    { id: "all", label: "Tüm Projeler" },
    { id: "ppf-wrapping", label: "PPF Kaplama" },
    { id: "ceramic", label: "Seramik (Pasta, Cila) Uygulama" },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: "ppf-wrapping",
      title: "Mercedes",
      image_url: "/mercedes.jpg",
      description: "Kapı direkleri şeffaf PPF kaplama, Seramik kaplama, 3 aşamalı pasta cila, Demir tozu, Kil, Detaylı ön yıkama",
    },
    {
      id: 2,
      category: "ceramic",
      title: "BMW",
      image_url: "/bmw.jpg",
      description: "Pasta cila, Fireball seramik kaplama, Demir tozu, Kil, Detaylı ön yıkama",
    },
    {
      id: 3,
      category: "ceramic",
      title: "Honda",
      image_url: "/honda.jpg",
      description: "Farlar , stoplar şeffaf PPF kaplama, Fireball seramik wax, Detaylı ön yıkama",
    },
    {
      id: 4,
      category: "ceramic",
      title: "Ford",
      image_url: "/ford.jpg",
      description: "Komple şeffaf PPF kaplama, Kaplama öncesi pasta cila yüzey düzeltme, Demir tozu, Kil, Detaylı ön yıkama",
    },
    {
      id: 5,
      category: "ceramic",
      title: "Peugeot",
      image_url: "/peugeot.jpg",
      description: "Pasta cila ( Boya koruma ), Demir tozu, Kil, Detaylı ön yıkama",
    },
    {
      id: 6,
      category: "ceramic",
      title: "Yamaha",
      image_url: "/yamaha.jpg",
      description: "Pasta cila ( Boya koruma ), Fireball wax",
    },
  ]

  return (
    <section id="gallery" className="bg-muted py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <HeadingTag className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Çalışmalarımız</HeadingTag>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tamamlanmış vinil kaplama projelerimiz galerisine göz atın
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto">
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
            alt={`${item.title} - ${item.description} | FK Auto Samsun`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
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

