"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export const LoginClientBtn = ({ session }: { session: Session | null }) => {
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
      {session ? (
        <Button onClick={handlelogout}>ログアウト</Button>
      ) : (
        <Button onClick={handlelogin}>ログイン</Button>
      )}
    </>
  );
};

export default LoginClientBtn;
