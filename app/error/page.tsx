import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <>
      <p>メールアドレスかパスワードが間違ってます</p>
      <Button>
        <Link href="/login">ログインに戻る</Link>
      </Button>
    </>
  );
};

export default ErrorPage;
