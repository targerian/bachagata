import { useQuery } from "@tanstack/react-query";
import { supabase, type ContactInfo } from "@/lib/supabase";

/**
 * Fetch contact information from the database
 */
const fetchContactInfo = async (): Promise<ContactInfo> => {
  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

/**
 * Custom hook to fetch and cache contact information
 * Uses TanStack Query for efficient data fetching and caching
 */
export const useContactInfo = () => {
  return useQuery({
    queryKey: ["contactInfo"],
    queryFn: fetchContactInfo,
  });
};

