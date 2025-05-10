import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import Logout from "./Logout";

export const LoginBtn = ({ user }: { user: User | null }) => {
  return (
    <>
      {user ? (
        <Logout />
      ) : (
        <Link href="/login">
          <Button>ログイン</Button>
        </Link>
      )}
    </>
  );
};

export default LoginBtn;
