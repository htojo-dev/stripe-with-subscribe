import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export const redirectIfAuthenticated = async (path = "/") => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect(path);
  }
};
