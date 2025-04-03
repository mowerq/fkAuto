"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function createGalleryItem(formData: FormData) {
  const supabase = getSupabaseServer()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const imageUrl = formData.get("imageUrl") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string) || 0

  const { error } = await supabase.from("gallery").insert({
    title,
    description,
    category,
    image_url: imageUrl,
    display_order: displayOrder,
  })

  if (error) {
    console.error("Error creating gallery item:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/gallery")
  redirect("/admin/gallery")
}

export async function updateGalleryItem(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const imageUrl = formData.get("imageUrl") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string) || 0

  const { error } = await supabase
    .from("gallery")
    .update({
      title,
      description,
      category,
      image_url: imageUrl,
      display_order: displayOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating gallery item:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/gallery")
  redirect("/admin/gallery")
}

export async function deleteGalleryItem(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string

  const { error } = await supabase.from("gallery").delete().eq("id", id)

  if (error) {
    console.error("Error deleting gallery item:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/gallery")
}

