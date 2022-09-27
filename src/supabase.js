import { createClient } from '@supabase/supabase-js'



const supabaseUrl = process.env.VUE_APP_SUPA_URL
const supabaseAnonKey = process.env.VUE_APP_SUPA_ANON

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


export default function useSupabase (){
  return {supabase}
}

