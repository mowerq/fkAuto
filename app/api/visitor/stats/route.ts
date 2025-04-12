import { getSupabaseServer } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = getSupabaseServer()

  // Get today's date (YYYY-MM-DD format)
  const today = new Date().toISOString().split("T")[0]

  // Get today's visitor count
  const { data: dailyData, error: dailyError } = await supabase
    .from("visitor_counts")
    .select("count")
    .eq("visit_date", today)
    .single()

  if (dailyError && dailyError.code !== "PGRST116") {
    // Not a "No rows found" error — return as error
    return NextResponse.json({ success: false, error: dailyError.message })
  }

  // Get total visitor count using RPC
  const { data: totalVisitors, error: totalError } = await supabase.rpc("get_total_visitors")

  if (totalError) {
    return NextResponse.json({ success: false, error: totalError.message })
  }

  return NextResponse.json({
    success: true,
    dailyVisitors: dailyData?.count || 0,
    totalVisitors: totalVisitors || 0,
  })
}
