"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function createService(formData: FormData) {
  const supabase = getSupabaseServer()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string) || 0
  const isActive = formData.get("isActive") === "on"

  const { error } = await supabase.from("services").insert({
    title,
    description,
    icon,
    display_order: displayOrder,
    is_active: isActive,
  })

  if (error) {
    console.error("Error creating service:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/services")
  redirect("/admin/services")
}

export async function updateService(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string) || 0
  const isActive = formData.get("isActive") === "on"

  const { error } = await supabase
    .from("services")
    .update({
      title,
      description,
      icon,
      display_order: displayOrder,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating service:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/services")
  redirect("/admin/services")
}

export async function deleteService(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string

  const { error } = await supabase.from("services").delete().eq("id", id)

  if (error) {
    console.error("Error deleting service:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/services")
}

export async function toggleServiceStatus(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string
  const currentStatus = formData.get("currentStatus") === "true"

  const { error } = await supabase
    .from("services")
    .update({
      is_active: !currentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error toggling service status:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/services")
}

