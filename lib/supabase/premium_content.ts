import { createClient } from "@/utils/supabase/server";

export async function getPremiumContent(idNum: number) {
  const supabase = await createClient();

  // 認証済みユーザーか確認
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // throw new Error("ログインしていないか、認証情報が取得できません。");
    return null;
  }

  const { data, error } = await supabase
    .from("premium_content")
    .select("video_url")
    .eq("id", idNum)
    .single();

    if (error) {
      // RSL設定(auth.uid() = profile.id) AND (profile.is_subscribed = true)
      // この処理により未契約、且つログインユーザーにはハイドレーションエラーが発生
      // そのため、nullを返す処理を追加
      if(error.code === "PGRST116") {
        return null;
      }
      throw new Error(`データの取得に失敗しました: ${error.message}`);
    }

  return data;
}
