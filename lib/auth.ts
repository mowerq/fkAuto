import { getSupabaseClient } from "./supabase/client"
import { redirect } from "next/navigation"

export async function getSession() {
  const supabase = getSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return session
}

export async function signOut() {
  const supabase = getSupabaseClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

