import { createClient } from "@/utils/supabase/server";

export async function getProfileData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ユーザーがいない場合（未ログイン）は null を返す
  if (!user) return null;

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
