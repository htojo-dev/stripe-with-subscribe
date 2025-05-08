import { createClient } from "@/utils/supabase/server";

export const getSession = async () => {
  const supabase = await createClient();
  
  // セッション情報を取得
  const { data: { session }, error } = await supabase.auth.getSession();

  // セッションがなければnullを返す
  if (error || !session) return null;

  // セッションがあれば、ユーザー情報を取得
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  // ユーザー情報取得に失敗した場合はnullを返す
  if (userError) return null;

  return user; // 認証済みのユーザーを返す
};