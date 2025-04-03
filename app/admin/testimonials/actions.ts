"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function createTestimonial(formData: FormData) {
  const supabase = getSupabaseServer()

  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const imageUrl = formData.get("imageUrl") as string
  const stars = Number.parseInt(formData.get("stars") as string) || 5
  const quote = formData.get("quote") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string) || 0
  const isActive = formData.get("isActive") === "on"

  const { error } = await supabase.from("testimonials").insert({
    name,
    role,
    image_url: imageUrl,
    stars,
    quote,
    display_order: displayOrder,
    is_active: isActive,
  })

  if (error) {
    console.error("Error creating testimonial:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/testimonials")
  redirect("/admin/testimonials")
}

export async function updateTestimonial(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const imageUrl = formData.get("imageUrl") as string
  const stars = Number.parseInt(formData.get("stars") as string) || 5
  const quote = formData.get("quote") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string) || 0
  const isActive = formData.get("isActive") === "on"

  const { error } = await supabase
    .from("testimonials")
    .update({
      name,
      role,
      image_url: imageUrl,
      stars,
      quote,
      display_order: displayOrder,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating testimonial:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/testimonials")
  redirect("/admin/testimonials")
}

export async function deleteTestimonial(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string

  const { error } = await supabase.from("testimonials").delete().eq("id", id)

  if (error) {
    console.error("Error deleting testimonial:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/testimonials")
}

export async function toggleTestimonialStatus(formData: FormData) {
  const supabase = getSupabaseServer()

  const id = formData.get("id") as string
  const currentStatus = formData.get("currentStatus") === "true"

  const { error } = await supabase
    .from("testimonials")
    .update({
      is_active: !currentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error toggling testimonial status:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/testimonials")
}

