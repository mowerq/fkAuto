import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = getSupabaseServer()

    const { data, error } = await supabase.from("gallery").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching gallery:", error)
      return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Gallery API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

