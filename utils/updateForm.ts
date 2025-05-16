"use server";

import { getProfileData } from "@/lib/supabase/profile/profile-server";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export const updateForm = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const supabase = await createClient();
  const result = await getProfileData();
  const user = result;

  if (!user) {
    redirect("/login");
  }

  let emailChanged = false;

  if (email && email !== user.email) {
    const { error: authError } = await supabase.auth.updateUser({ email });

    if (authError) {
      // console.error("メールアドレス更新エラー", authError);

      if (authError.status === 403) {
        throw new Error("再認証が必要です。ログインし直してください。");
      }
      throw new Error("メールアドレスの更新に失敗しました");
    }

    emailChanged = true;
  }

  const { error: profileError } = await supabase
    .from("profile")
    .update({ name, email })
    .eq("id", user.id);

  if (profileError) {
    throw new Error("プロフィールの更新に失敗しました。");
  }

  return {
    success: true,
    emailChanged,
  };
};

export default updateForm;
