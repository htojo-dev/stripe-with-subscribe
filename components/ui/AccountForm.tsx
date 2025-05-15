"use client";

import { getProfileData } from "@/lib/supabase/profile/profile-client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import updateForm from "@/utils/updateForm";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

const AccountForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [canChangeEmail, setCanChangeEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // サーバー関数だけでは更新後にヘッダーのnser.nameが変更されないため、
  // onSubmitでhandleSubmit関数を呼び、routerが使用できるようにする
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      await updateForm(formData);
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.log("更新に失敗", err);
      setErrorMsg("更新に失敗しました");
    }
  };

  // useSWRはキャッシュを前提としていて反映にラグが出やすいため、useEffectで処理
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProfileData({ redirectOnFail: false });

        if (!result) {
          router.push("/login");
          return;
        }

        const { profile, user } = result;

        setName(profile.name || "");
        setEmail(profile.email || "");
        setCanChangeEmail(user.app_metadata?.provider === "email");

        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMsg("情報の取得中に問題が発生しました");
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      <div className="mb-5">
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          {canChangeEmail ? (
            <input
              type="email"
              id="email"
              className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{email}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isPending} >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        更新
      </Button>
    </form>
  );
};

export default AccountForm;
