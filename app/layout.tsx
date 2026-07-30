import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import StructuredData from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fkautosamsun.com"),
  title: {
    default: "FK Auto | Samsun Araç Kaplama, Cam Filmi, PPF ve Seramik Kaplama",
    template: "%s | FK Auto Samsun",
  },
  description:
    "Samsun'da profesyonel araç kaplama hizmetleri. Cam filmi, PPF kaplama, seramik kaplama, renkli kaplama ve krom kaplama. FK Auto Araç Estetik Merkezi.",
  keywords: [
    "araç kaplama samsun",
    "cam filmi samsun",
    "PPF kaplama samsun",
    "seramik kaplama samsun",
    "renkli kaplama samsun",
    "krom kaplama samsun",
    "araç estetik samsun",
    "FK Auto",
    "araç kaplama",
    "boya koruma filmi",
  ],
  authors: [{ name: "FK Auto Araç Estetik Merkezi" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.fkautosamsun.com",
    siteName: "FK Auto Araç Estetik Merkezi",
    title: "FK Auto | Samsun Araç Kaplama, Cam Filmi, PPF ve Seramik Kaplama",
    description:
      "Samsun'da profesyonel araç kaplama hizmetleri. Cam filmi, PPF kaplama, seramik kaplama, renkli kaplama ve krom kaplama.",
    images: [
      {
        url: "/logo.png",
        width: 300,
        height: 150,
        alt: "FK Auto Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FK Auto | Samsun Araç Kaplama",
    description:
      "Samsun'da profesyonel araç kaplama hizmetleri. Cam filmi, PPF, seramik kaplama ve daha fazlası.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.fkautosamsun.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}