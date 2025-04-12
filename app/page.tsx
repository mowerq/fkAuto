"use client"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Gallery from "@/components/gallery"
import Process from "@/components/process"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import About from "@/components/about"
import StructuredData from "@/components/structured-data"
import LocalSEO from "@/components/local-seo"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    fetch("/api/visitor/increment").catch((err) => {
      console.error("Visitor count failed:", err)
    })
  }, [])
  
  return (
    <main className="min-h-screen bg-background">
      <StructuredData />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <LocalSEO />
    </main>
  )
}

