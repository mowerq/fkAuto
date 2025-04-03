import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    // Normal signup kullanarak kullanıcı oluştur
    const supabase = createClient(//+
      process.env.SUPABASE_URL as string,//+
      process.env.SUPABASE_ANON_KEY as string//+
    )//

    // Admin kullanıcısı oluştur
    const { data, error } = await supabase.auth.signUp({
      email: "admin@fkauto.com",
      password: "Admin123!",
    })

    if (error) {
      console.error("Error creating admin user:", error)
      return NextResponse.json({ error: "Failed to create admin user: " + error.message }, { status: 500 })
    }

    // Seed initial services
    const services = [
      {
        title: "Cam Filmi",
        description:
          "Araç camlarınız için UV korumalı, ısı yalıtımlı ve güvenlik sağlayan profesyonel cam filmi uygulaması.",
        icon: "circle",
        display_order: 1,
        is_active: true,
      },
      {
        title: "PPF Kaplama",
        description:
          "Aracınızın boyasını taş çiziklerine, çiziklere ve çevresel hasarlara karşı koruyacak şeffaf koruma filmi uygulaması.",
        icon: "circle",
        display_order: 2,
        is_active: true,
      },
      {
        title: "Seramik (Pasta, Cila) Uygulama",
        description:
          "Aracınızın boyasına uzun süreli parlaklık ve koruma sağlayan profesyonel seramik kaplama, pasta ve cila uygulamaları.",
        icon: "circle",
        display_order: 3,
        is_active: true,
      },
      {
        title: "Renkli Kaplama",
        description:
          "Aracınızı mat, parlak, saten veya özel yüzeylerle premium vinil filmler kullanarak tamamen yeni bir renge dönüştürme.",
        icon: "circle",
        display_order: 4,
        is_active: true,
      },
      {
        title: "Krom Kaplama",
        description:
          "Aracınızın detaylarına veya tamamına lüks ve göz alıcı bir görünüm kazandıran krom kaplama hizmetleri.",
        icon: "circle",
        display_order: 5,
        is_active: true,
      },
      {
        title: "Çekici Hizmeti",
        description: "Aracınızın güvenli bir şekilde taşınması için profesyonel çekici hizmeti.",
        icon: "circle",
        display_order: 6,
        is_active: true,
      },
    ]

    const { error: servicesError } = await supabase.from("services").insert(services)

    if (servicesError) {
      console.error("Error seeding services:", servicesError)
    }

    // Seed initial settings
    const settings = [
      { key: "phone", value: "0531 434 16 04", type: "text" },
      { key: "email", value: "info@fkauto.com", type: "text" },
      { key: "address", value: "Kaplama Caddesi No: 123, Otomotiv Mahallesi, İstanbul", type: "text" },
      { key: "workingHoursWeekday", value: "09:00 - 18:00", type: "text" },
      { key: "workingHoursSaturday", value: "10:00 - 16:00", type: "text" },
      { key: "workingHoursSunday", value: "Kapalı", type: "text" },
      { key: "facebook", value: "https://facebook.com/", type: "text" },
      { key: "instagram", value: "https://instagram.com/", type: "text" },
      { key: "twitter", value: "https://twitter.com/", type: "text" },
      { key: "youtube", value: "https://youtube.com/", type: "text" },
    ]

    const { error: settingsError } = await supabase.from("settings").insert(settings)

    if (settingsError) {
      console.error("Error seeding settings:", settingsError)
    }

    return NextResponse.json({
      success: true,
      message: "Admin user and initial data created successfully. Please check your email to confirm your account.",
      adminEmail: "admin@fkauto.com",
      adminPassword: "Admin123!",
    })
  } catch (error) {
    console.error("Seed admin error:", error)
    return NextResponse.json({ error: "Internal server error: " + (error.message || "Unknown error") }, { status: 500 })
  }
}

