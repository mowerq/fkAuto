import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled_design_2_optimized-UL7OG9rq4lCG6xMwQJLGeAzQw1Mvy8.png"
                alt="FK Auto Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-primary">FK Auto</span>
            </Link>
            <p className="mb-4 text-muted-foreground">
              Premium araç kaplama hizmetleri. Uzman montaj ve kaliteli malzemelerle aracınızı dönüştürün.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-muted-foreground hover:text-primary">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-muted-foreground hover:text-primary">
                  Süreç
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-muted-foreground hover:text-primary">
                  Yorumlar
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Hizmetler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Renk Değişim Kaplamaları
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Özel Tasarımlar
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Boya Koruma Filmi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Ticari Kaplamalar
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Kısmi Kaplamalar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">İletişim</h3>
            <address className="not-italic text-muted-foreground">
              <p className="mb-2">Kaplama Caddesi No: 123</p>
              <p className="mb-2">Otomotiv Mahallesi, İstanbul</p>
              <p className="mb-2">Telefon: (0212) 456 7890</p>
              <p className="mb-4">E-posta: info@fkauto.com</p>
            </address>
            <p className="text-sm text-muted-foreground">Çalışma Saatleri: Pzt-Cuma 09:00-18:00, Cmt 10:00-16:00</p>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FK Auto Araç Kaplama. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

