import { createClient } from "@/utils/supabase/server";

export async function getAllLessons() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("lesson").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSingleLesson(idNum: number) {
  if (isNaN(idNum)) {
    throw new Error("Invalid lesson ID");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", idNum)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
