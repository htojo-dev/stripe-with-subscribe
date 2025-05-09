"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export const LoginBtn = ({ user }: {user: User | null}) => {
  const router = useRouter();
  const supabase = createClient();

  const handlelogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handlelogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {user ? (
        <Button onClick={handlelogout}>ログアウト</Button>
      ) : (
        <Button onClick={handlelogin}>ログイン</Button>
      )}
    </>
  );
};

export default LoginBtn;
