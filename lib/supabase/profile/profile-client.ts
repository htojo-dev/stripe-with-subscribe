"use client"

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export async function getProfileData({redirectOnFail = true} = {}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: useError,
  } = await supabase.auth.getUser();

  // ユーザーがいない場合（未ログイン）は null を返す
  if (useError || !user) {
    if(redirectOnFail) redirect("/login");
    return null;
  }

  const { data: profile, error: profileError } = await supabase
  .from("profile")
  .select("*")
  .eq("id", user.id)
  .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return {profile, user};
}

export const updateAvatarUrl = async (avatar_url: string) => {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  // console.log("user:", user, userError);

  if(userError) {
    console.error("ユーザー取得エラー:", userError);
    return;
  }
  
  if (!user) {
    console.warn("認証されたユーザーがいません");
    return;
  }

  const {data, error} = await supabase
    .from("profile")
    .update({ avatar_url })
    .eq("id", user.id)
    .select();

    console.log("profile select result:", data, error);

  if(error) {
    console.error("プロフィール更新エラー:", error);
  }
};