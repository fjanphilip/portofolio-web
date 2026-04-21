import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFileToSupabase(file: File, bucketPosition: string = "portofolio") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;
  
  const buffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from(bucketPosition)
    .upload(filePath, buffer, { 
      contentType: file.type,
      upsert: false 
    });

  if (error) {
    console.error("Supabase Upload Error:", error);
    throw new Error(error.message || "Unknown Supabase Error");
  }

  const { data: publicData } = supabase.storage
    .from(bucketPosition)
    .getPublicUrl(filePath);

  return publicData.publicUrl;
}
