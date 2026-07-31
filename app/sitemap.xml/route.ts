export async function GET() {
  const baseUrl = "https://www.fkautosamsun.com"
  const lastUpdated = "2026-07-31T00:00:00.000Z"

  // Create XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}</loc>
            <lastmod>${lastUpdated}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>${baseUrl}/hizmetler</loc>
            <lastmod>${lastUpdated}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
        <url>
            <loc>${baseUrl}/hakkimizda</loc>
            <lastmod>${lastUpdated}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>${baseUrl}/galeri</loc>
            <lastmod>${lastUpdated}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
        <url>
            <loc>${baseUrl}/yorumlar</loc>
            <lastmod>${lastUpdated}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>${baseUrl}/iletisim</loc>
            <lastmod>${lastUpdated}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
        </url>
    </urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
