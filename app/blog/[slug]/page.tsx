import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { blogPosts } from "@/lib/blog-data"
import { CalendarIcon, UserIcon, ArrowLeftIcon } from "lucide-react"

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  
  if (!post) {
    return { title: "Yazı Bulunamadı" }
  }

  return {
    title: `${post.title} | FK Auto Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.fkautosamsun.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://www.fkautosamsun.com/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Generate Table of Contents and inject IDs into h2 tags
  const h2Regex = /<h2>(.*?)<\/h2>/g
  let match
  const toc: { id: string; title: string }[] = []
  let modifiedContent = post.content

  while ((match = h2Regex.exec(post.content)) !== null) {
    const title = match[1]
    // Create a safe ID: remove HTML tags if any, convert to lowercase, replace spaces and non-alphanumerics with dash
    const cleanTitle = title.replace(/<[^>]*>?/gm, '')
    const id = cleanTitle.toLowerCase().replace(/[^a-z0-9çğıöşü]+/g, '-').replace(/(^-|-$)+/g, '')
    toc.push({ id, title: cleanTitle })
    // Replace the exact matched h2 with an h2 containing the id
    modifiedContent = modifiedContent.replace(match[0], `<h2 id="${id}" class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-10 mb-4">${title}</h2>`)
  }

  // Style p and ul/li tags for better reading experience
  modifiedContent = modifiedContent.replace(/<p>/g, '<p class="leading-7 [&:not(:first-child)]:mt-6">')
  modifiedContent = modifiedContent.replace(/<ul>/g, '<ul class="my-6 ml-6 list-disc [&>li]:mt-2">')

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.fkautosamsun.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "FK Auto Araç Estetik Merkezi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fkautosamsun.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-20">
        <div className="container max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Blog'a Dön
          </Link>
          
          <header className="mb-10 text-center">
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                {post.author}
              </span>
            </div>
          </header>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-12 shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-[1fr_250px] gap-10 items-start">
            
            {/* Article Content */}
            <div 
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: modifiedContent }}
            />

            {/* Table of Contents Sidebar */}
            {toc.length > 0 && (
              <aside className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm hidden md:block">
                <h3 className="font-semibold mb-4 text-lg">İçindekiler</h3>
                <ul className="space-y-3 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Mobile TOC */}
            {toc.length > 0 && (
              <div className="md:hidden rounded-xl border bg-card p-6 shadow-sm mb-8 order-first">
                <h3 className="font-semibold mb-4 text-lg">İçindekiler</h3>
                <ul className="space-y-3 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
