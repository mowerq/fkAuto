"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ImageIcon, Settings, MessageSquare, FileText, LogOut, Star, Menu, X } from "lucide-react"
import { signOut } from "@/lib/auth"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Galeri",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    title: "Hizmetler",
    href: "/admin/services",
    icon: FileText,
  },
  {
    title: "Yorumlar",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Mesajlar",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "İçerik",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Ayarlar",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleSignOut = async () => {
    await signOut()
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-3 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}

      {/* Sidebar - Desktop (always visible) and Mobile (conditionally visible) */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 flex-col border-r bg-card transition-transform duration-300 ease-in-out",
          isMobile ? "flex transform lg:translate-x-0" : "flex",
          isMobileMenuOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold text-primary">FK Auto</span>
            <span className="text-sm">Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && isMobile && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}

