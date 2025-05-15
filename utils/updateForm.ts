"use server";

import { getProfileData } from "@/lib/supabase/profile/profile-server";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export const updateForm = async (formData: FormData) => {
  const name = formData.get("name") as string;

  const supabase = await createClient();

  const result = await getProfileData();
  const user = result;

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("profile")
    .update({ name })
    .eq("id", user.id);

  if (error) {
    throw new Error("更新に失敗");
  }
};

export default updateForm;
