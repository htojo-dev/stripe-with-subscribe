import { createClient } from "@/utils/supabase/server";

export async function getPremiumContent(idNum: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("premium_content")
    .select("video_url")
    .eq("id", idNum)
    .single();

    if (error) {
      throw new Error(error.message);
    }

  return data;
}
