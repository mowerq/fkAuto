import { getSupabaseServer } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = getSupabaseServer()

  // Call the PostgreSQL function
  const { error } = await supabase.rpc("update_visitor_count")

  if (error) {
    console.error("Visitor count update failed:", error)
    return NextResponse.json({ success: false, error })
  }

  return NextResponse.json({ success: true })
}
