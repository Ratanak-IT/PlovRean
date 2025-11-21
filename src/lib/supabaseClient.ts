// lib/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

// Fetch environment variables (make sure they are defined in your .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
