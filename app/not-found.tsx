import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center">
      <h1 className="text-4xl font-bold mb-4">ページが見つかりません</h1>
      <p className="text-gray-500 mb-8">
        お探しのページは存在しないか、削除された可能性があります。
      </p>
      <Button>
        <Link href="/">ホームに戻る</Link>
      </Button>
    </div>
  );
}
