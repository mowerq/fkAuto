"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black text-white backdrop-blur supports-[backdrop-filter]:bg-black/95">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled_design_2_optimized-UL7OG9rq4lCG6xMwQJLGeAzQw1Mvy8.png"
            alt="FK Auto Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="hidden text-xl font-bold text-primary sm:inline-block">FK Auto</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="#services" className="text-sm font-medium text-white/80 transition-colors hover:text-primary">
            Hizmetler
          </Link>
          <Link href="#gallery" className="text-sm font-medium text-white/80 transition-colors hover:text-primary">
            Galeri
          </Link>
          <Link href="#process" className="text-sm font-medium text-white/80 transition-colors hover:text-primary">
            Süreç
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-white/80 transition-colors hover:text-primary">
            Yorumlar
          </Link>
          <Link href="#contact" className="text-sm font-medium text-white/80 transition-colors hover:text-primary">
            İletişim
          </Link>
          <Button variant="default" size="sm">
            Teklif Al
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menüyü aç/kapat</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("fixed inset-0 z-50 bg-black text-white md:hidden", isMenuOpen ? "flex flex-col" : "hidden")}>
        <div className="flex h-16 items-center justify-between border-b border-gray-800 bg-black px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled_design_2_optimized-UL7OG9rq4lCG6xMwQJLGeAzQw1Mvy8.png"
              alt="FK Auto Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-primary">FK Auto</span>
          </Link>
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800" onClick={toggleMenu}>
            <X className="h-6 w-6" />
            <span className="sr-only">Menüyü kapat</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-4 p-4 bg-black text-white">
          <Link
            href="#services"
            className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-black"
            onClick={toggleMenu}
          >
            Hizmetler
          </Link>
          <Link
            href="#gallery"
            className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-black"
            onClick={toggleMenu}
          >
            Galeri
          </Link>
          <Link
            href="#process"
            className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-black"
            onClick={toggleMenu}
          >
            Süreç
          </Link>
          <Link
            href="#testimonials"
            className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-black"
            onClick={toggleMenu}
          >
            Yorumlar
          </Link>
          <Link
            href="#contact"
            className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-black"
            onClick={toggleMenu}
          >
            İletişim
          </Link>
          <Button className="mt-2">Teklif Al</Button>
        </nav>
      </div>
    </header>
  )
}

