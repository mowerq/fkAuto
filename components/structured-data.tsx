import Script from "next/script"

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    name: "FK Auto - Araç Kaplama Merkezi",
    image: "https://www.fkautosamsun.com/logo.png",
    url: "https://www.fkautosamsun.com",
    telephone: "+90 531 434 16 04",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Derebahçe, Gümüşeşik Sk No:3/1 D:1, 55060 İlkadım/Samsun",
      addressLocality: "Samsun",
      postalCode: "55060",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.262947,
      longitude: 36.337743,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:30",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:30",
        closes: "18:00",
      },
    ],
    sameAs: ["https://www.instagram.com/fk__auto/"],
    priceRange: "₺₺",
    areaServed: {
      "@type": "City",
      name: "Samsun",
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Araç Kaplama Hizmetleri",
    provider: {
      "@type": "AutoBodyShop",
      name: "FK Auto - Araç Estetik Merkezi",
      url: "https://www.fkautosamsun.com",
    },
    areaServed: {
      "@type": "City",
      name: "Samsun",
    },
    description: "Profesyonel araç kaplama, cam filmi, PPF kaplama ve seramik kaplama hizmetleri sunuyoruz.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "TRY",
      },
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Araç kaplaması ne kadar sürer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Araç kaplama işlemi genellikle 1-3 gün arasında tamamlanır. Kaplama türüne ve aracın boyutuna göre bu süre değişebilir.",
        },
      },
      {
        "@type": "Question",
        name: "Araç kaplaması aracın orijinal boyasına zarar verir mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hayır, profesyonel olarak uygulanan araç kaplamaları aracın orijinal boyasına zarar vermez, aksine korur.",
        },
      },
      {
        "@type": "Question",
        name: "En iyi araç kaplama firması hangisidir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FK Auto, uzman kadrosu ve kaliteli malzemeleriyle en iyi araç kaplama hizmetini sunmaktadır.",
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
