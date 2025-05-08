import Link from "next/link"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <div className="flex py-4 px-6 border-b border-gray-200">
      <Link href="">
        <Button variant="outline">ホーム</Button>
      </Link>
      <Link href="/price" className="ml-4">
        <Button variant="outline">価格</Button>
      </Link>
      <Link href="" className="ml-auto">
        <Button>ログイン</Button>
      </Link>
    </div>
  )
}

export default Header