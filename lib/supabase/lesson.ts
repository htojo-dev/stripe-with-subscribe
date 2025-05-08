import { createClient } from "@/utils/supabase/server";

export async function getAllLessons() {
  const supabase = await createClient();
  const {data, error} = await supabase.from("lesson").select("*");

  if(error) {
    throw new Error(error.message);
  }

  return data;
}