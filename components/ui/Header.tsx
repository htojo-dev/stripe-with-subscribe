import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/supabase/session";
import LoginBtn from "../auth/LoginBtn";
import ProfileAvatar from "./ProfileAvatar";

const Header = async () => {
  const user = await getSession();
  // console.log(user)

  return (
    <div className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">
        <Button variant="outline">ホーム</Button>
      </Link>
      {user && (
        <Link href="/dashboard" className="ml-4">
          <Button variant="outline">ダッシュボード</Button>
        </Link>
      )}
      <Link href="/price" className="ml-4">
        <Button variant="outline">価格</Button>
      </Link>
      <Link href="/contact" className="ml-4">
        <Button variant="outline">お問い合わせ</Button>
      </Link>
      <div className="ml-auto flex items-center">
        <div className="mr-3">
          <ProfileAvatar width={32} height={32} />
        </div>
        <LoginBtn user={user} />
      </div>
    </div>
  );
};

export default Header;
