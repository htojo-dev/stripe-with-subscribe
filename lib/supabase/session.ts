import { createClient } from "@/utils/supabase/server";

export const getSession = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);

  // console.log(data.session)

  return data.session;
};
