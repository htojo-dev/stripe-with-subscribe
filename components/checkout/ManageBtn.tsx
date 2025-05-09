"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ManageBtn = () => {
  const router = useRouter();

  const openPortal = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/api/portal`);
    const data = await res.json();

    router.push(data.url);
  };

  return <Button onClick={openPortal}>更新・キャンセル</Button>;
};

export default ManageBtn;
