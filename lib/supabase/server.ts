import { createClient } from "@supabase/supabase-js"

export const getSupabaseServer = () => {
  return createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
  )
}

