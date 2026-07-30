"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/galeri", label: "Galeri" },
  { href: "/yorumlar", label: "Yorumlar" },
  { href: "/iletisim", label: "İletişim" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black text-white backdrop-blur supports-[backdrop-filter]:bg-black/95 dark:bg-black dark:text-white">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo boyutunu artırın ve kenarlarını metinle hizalayın */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FK Auto - Samsun Araç Kaplama Merkezi" width={180} height={75} className="h-14 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Ana menü">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-primary dark:text-white/80 dark:hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/iletisim"><Button variant="default" size="sm">
            Teklif Al
          </Button></Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menüyü aç/kapat</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black text-white md:hidden dark:bg-black dark:text-white",
          isMenuOpen ? "flex flex-col" : "hidden",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-800 bg-black px-4 dark:border-gray-800 dark:bg-black">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="FK Auto - Samsun Araç Kaplama Merkezi" width={180} height={75} className="h-14 w-auto" />
          </Link>
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800" onClick={toggleMenu}>
            <X className="h-6 w-6" />
            <span className="sr-only">Menüyü kapat</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-4 p-4 bg-black text-white dark:bg-black dark:text-white" aria-label="Mobil menü">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-gray-800"
              onClick={toggleMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/iletisim" onClick={toggleMenu}>
            <Button className="mt-2 w-full">Teklif Al</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
