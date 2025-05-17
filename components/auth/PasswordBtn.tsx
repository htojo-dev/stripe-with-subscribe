import Link from "next/link";
import { Button } from "../ui/button";

const PasswordBtn = () => {
  return (
    <Link href="/account/password">
      <Button className="cursor-pointer">パスワード変更</Button>
    </Link>
  );
};

export default PasswordBtn;
