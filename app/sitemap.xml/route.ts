export async function GET() {
  const baseUrl = "https://www.fkautosamsun.com"

  const routes = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/hizmetler", priority: "0.9", changefreq: "weekly" },
    { path: "/hakkimizda", priority: "0.8", changefreq: "monthly" },
    { path: "/galeri", priority: "0.9", changefreq: "weekly" },
    { path: "/yorumlar", priority: "0.8", changefreq: "weekly" },
    { path: "/iletisim", priority: "0.9", changefreq: "monthly" },
    { path: "/hizmetler/cam-filmi", priority: "0.8", changefreq: "monthly" },
    { path: "/hizmetler/ppf-kaplama", priority: "0.8", changefreq: "monthly" },
    { path: "/hizmetler/pasta-cila", priority: "0.8", changefreq: "monthly" },
    { path: "/hizmetler/seramik-kaplama", priority: "0.8", changefreq: "monthly" },
    { path: "/hizmetler/boyasiz-gocuk-duzeltme", priority: "0.8", changefreq: "monthly" },
    { path: "/hizmetler/detayli-arac-temizligi", priority: "0.8", changefreq: "monthly" },
    { path: "/hizmetler/vip-oto-yikama", priority: "0.8", changefreq: "monthly" },
    { path: "/hizmetler/renkli-kaplama", priority: "0.8", changefreq: "monthly" },
    { path: "/hizmetler/krom-kaplama", priority: "0.8", changefreq: "monthly" },
  ]

  const urls = routes.map(route => `
        <url>
            <loc>${baseUrl}${route.path}</loc>
            <changefreq>${route.changefreq}</changefreq>
            <priority>${route.priority}</priority>
        </url>`).join("")

  // Create XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
    </urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
