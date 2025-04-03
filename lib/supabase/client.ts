import { createClient } from "@supabase/supabase-js"

// Singleton pattern to avoid multiple instances
let supabaseClient

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  }
  return supabaseClient
}

