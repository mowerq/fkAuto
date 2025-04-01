import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Gallery() {
  const categories = [
    { id: "all", label: "Tüm Projeler" },
    { id: "color-change", label: "Renk Değişimi" },
    { id: "custom", label: "Özel Tasarımlar" },
    { id: "commercial", label: "Ticari" },
  ]

  // Sample gallery items - in a real project, this would come from a database
  const galleryItems = [
    {
      id: 1,
      category: "color-change",
      title: "Mat Siyah BMW",
      image: "/placeholder.svg?height=600&width=800",
      description: "BMW M4 üzerine tam mat siyah kaplama",
    },
    {
      id: 2,
      category: "color-change",
      title: "Saten Kırmızı Mercedes",
      image: "/placeholder.svg?height=600&width=800",
      description: "Mercedes C-Serisi üzerine saten kırmızı kaplama",
    },
    {
      id: 3,
      category: "custom",
      title: "Yarış Şeritleri",
      image: "/placeholder.svg?height=600&width=800",
      description: "Mustang GT üzerine özel yarış şeritleri",
    },
    {
      id: 4,
      category: "custom",
      title: "Geometrik Desen",
      image: "/placeholder.svg?height=600&width=800",
      description: "Özel geometrik desen kaplama",
    },
    {
      id: 5,
      category: "commercial",
      title: "Kargo Aracı Kaplaması",
      image: "/placeholder.svg?height=600&width=800",
      description: "Bir kargo şirketi için tam ticari kaplama",
    },
    {
      id: 6,
      category: "commercial",
      title: "Yemek Kamyonu Markalaması",
      image: "/placeholder.svg?height=600&width=800",
      description: "Tam markalama ile özel yemek kamyonu kaplaması",
    },
  ]

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
                <TabsTrigger key={category.id} value={category.id}>
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

function GalleryItem({ item }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
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

