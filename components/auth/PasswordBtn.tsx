import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";

const PasswordBtn = async () => {
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();
  const emailUser = user?.app_metadata?.provider === "email";

  return (
    <div className="mb-10">
      {emailUser && (
        <Link href="/account/password">
        <Button className="cursor-pointer">パスワード変更</Button>
      </Link>
      )}
    </div>
  );
};

export default PasswordBtn;