"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function updateSettings(formData: FormData) {
  const supabase = getSupabaseServer()

  // Get all form data
  const formEntries = Array.from(formData.entries())

  // Process each setting
  for (const [key, value] of formEntries) {
    // Check if setting already exists
    const { data: existingSetting } = await supabase.from("settings").select("*").eq("key", key).single()

    if (existingSetting) {
      // Update existing setting
      await supabase
        .from("settings")
        .update({
          value: value as string,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingSetting.id)
    } else {
      // Create new setting
      await supabase.from("settings").insert({
        key,
        value: value as string,
        type: "text",
      })
    }
  }

  revalidatePath("/admin/settings")

  return { success: true }
}

