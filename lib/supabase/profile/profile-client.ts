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
