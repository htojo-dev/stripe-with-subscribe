import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/supabase/session";
import LoginClientBtn from "../auth/LoginBtn";

const Header = async () => {
  const user = await getSession();

  return (
    <div className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">
        <Button variant="outline">ホーム</Button>
      </Link>
      <Link href="/price" className="ml-4">
        <Button variant="outline">価格</Button>
      </Link>
      <div className="ml-auto">
        <LoginClientBtn user={user} />
      </div>
    </div>
  );
};

export default Header;
