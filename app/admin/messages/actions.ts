"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function markMessageAsRead(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string

  const { error } = await supabase
    .from("contact_messages")
    .update({
      is_read: true,
    })
    .eq("id", id)

  if (error) {
    console.error("Error marking message as read:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/messages")
}

export async function deleteMessage(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string

  const { error } = await supabase.from("contact_messages").delete().eq("id", id)

  if (error) {
    console.error("Error deleting message:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/messages")
}

