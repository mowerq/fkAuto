import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { Circle } from "lucide-react"
import { siteConfig } from "@/lib/config/site"

const services = [
  { id: 1, title: "Cam Filmi Uygulaması" },
  { id: 2, title: "PPF Kaplama" },
  { id: 3, title: "Seramik Kaplama" },
  { id: 4, title: "Renkli Kaplama" },
  { id: 5, title: "Krom Kaplama" },
  { id: 6, title: "Çekici Hizmeti" },
]

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="FK Auto Logo"
                width={150}
                height={70}
                className="h-auto w-full max-w-[150px]"
              />
            </Link>
            <p className="mb-4 text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-muted-foreground">{siteConfig.contact.address}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href={siteConfig.social.facebook} className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={siteConfig.social.instagram} className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={siteConfig.social.twitter} className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href={siteConfig.social.youtube} className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hizmetler" className="text-muted-foreground hover:text-primary">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-muted-foreground hover:text-primary">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-muted-foreground hover:text-primary">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/yorumlar" className="text-muted-foreground hover:text-primary">
                  Yorumlar
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-muted-foreground hover:text-primary">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Hizmetler</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id} className="flex items-center gap-2">
                  <Circle className="h-3 w-3 fill-primary text-primary" />
                  <Link href="/hizmetler" className="text-muted-foreground hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Çalışma Saatleri</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span>{siteConfig.workingHours.weekday}</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi:</span>
                <span>{siteConfig.workingHours.saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Pazar:</span>
                <span>{siteConfig.workingHours.sunday}</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">İletişim</h4>
              <p className="text-muted-foreground">Telefon: {siteConfig.contact.phone}</p>
              <p className="text-muted-foreground">E-posta: {siteConfig.contact.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FK Auto Araç Estetik Merkezi. Tüm hakları saklıdır. | Kurucu: Faruk KALAYCI
          </p>
        </div>
      </div>
    </footer>
  )
}
