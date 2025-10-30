import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL or Anon Key is missing. Please check your environment variables.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database types
export type GalleryImage = {
  id: string;
  category: "Performances" | "Workshops" | "Socials";
  title: string;
  description: string;
  image_url: string;
  upload_date: string;
  created_by: string;
  created_at: string;
};

export type Class = {
  id: string;
  name: string;
  place: string;
  date_time: string;
  duration: number;
  description: string;
  price?: number;
  image_url?: string;
  is_recurring: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type ContactInfo = {
  id: string;
  email: string;
  phone: string;
  address: string;
  instagram_url?: string;
  twitter_url?: string;
  updated_at: string;
  updated_by?: string;
};
