import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { getProfileData } from "@/lib/supabase/profile/profile-server";

export const LoginBtn = async ({ user }: { user: User | null }) => {
  const profile = await getProfileData();

  return (
    <>
      {user ? (
        <Link href="/account" className="underline">
          {profile?.name}
        </Link>
      ) : (
        <Link href="/login">
          <Button>ログイン</Button>
        </Link>
      )}
    </>
  );
};

export default LoginBtn;
