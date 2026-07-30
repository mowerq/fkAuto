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
      streetAddress: "Derebahçe, Gümüşeşik Sk No:3",
      addressLocality: "İlkadım",
      addressRegion: "Samsun",
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Araç Kaplama Hizmetleri",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cam Filmi Uygulaması",
            description: "Araç camlarınız için UV korumalı, ısı yalıtımlı profesyonel cam filmi uygulaması.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "PPF Kaplama",
            description: "Aracınızın boyasını taş çiziklerine ve çevresel hasarlara karşı koruyacak şeffaf koruma filmi.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Seramik Kaplama",
            description: "Aracınızın boyasına uzun süreli parlaklık ve koruma sağlayan seramik kaplama uygulaması.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Renkli Kaplama",
            description: "Premium vinil filmler ile aracınızı tamamen yeni bir renge dönüştürme hizmeti.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Krom Kaplama",
            description: "Aracınıza lüks ve göz alıcı bir görünüm kazandıran krom kaplama hizmetleri.",
          },
        },
      ],
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
        name: "Samsun'da en iyi araç kaplama firması hangisidir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FK Auto, Samsun İlkadım'da uzman kadrosu ve kaliteli malzemeleriyle profesyonel araç kaplama hizmeti sunmaktadır.",
        },
      },
      {
        "@type": "Question",
        name: "Cam filmi uygulaması ne kadar sürer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cam filmi uygulaması genellikle 2-4 saat arasında tamamlanır. Aracın cam sayısına ve filmin türüne göre süre değişebilir.",
        },
      },
      {
        "@type": "Question",
        name: "PPF kaplama nedir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PPF (Paint Protection Film), aracınızın boyasını taş çiziklerine, böcek kalıntılarına ve UV ışınlarına karşı koruyan şeffaf bir koruma filmidir.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
