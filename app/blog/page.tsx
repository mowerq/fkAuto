import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Blog & Rehber | Samsun FK Auto Araç Estetik Merkezi",
  description:
    "Araç kaplama, cam filmi, seramik kaplama ve araç bakımı hakkında uzman tavsiyeleri, ipuçları ve güncel rehberler. Samsun FK Auto Blog sayfasını keşfedin.",
  alternates: {
    canonical: "https://www.fkautosamsun.com/blog",
  },
  openGraph: {
    title: "Blog & Rehber | FK Auto Araç Estetik - Samsun",
    description: "Araç kaplama, cam filmi ve seramik kaplama hakkında uzman rehberler ve bakım ipuçları.",
    url: "https://www.fkautosamsun.com/blog",
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Blog & Rehber</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Araç estetiği, koruması ve bakımı hakkında uzman ekibimizden en güncel bilgiler ve tavsiyeler.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <CardTitle className="line-clamp-2 text-xl hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 text-xs mt-2">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserIcon className="h-3 w-3" />
                      {post.author}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/blog/${post.slug}`}>
                      Devamını Oku
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
