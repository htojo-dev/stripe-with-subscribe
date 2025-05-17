"use client";

import { getProfileData } from "@/lib/supabase/profile/profile-client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import updateForm from "@/utils/updateForm";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { validationSchema} from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


type FormVal = z.infer<typeof validationSchema>;

const AccountForm = () => {
  const router = useRouter();
  const [canChangeEmail, setCanChangeEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormVal>({mode: "onChange", resolver: zodResolver(validationSchema)});

  // サーバー関数だけでは更新後にヘッダーのnser.nameが変更されないため、
  // onSubmitでhandleSubmit(onSubmit)関数を呼び、routerが使用できるようにする
  const onSubmit = async (data: FormVal) => {
    console.log(data);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("name", data.name ?? "");
    formData.append("email", data.email ?? "");

    try {
      const result = await updateForm(formData);

      if (result?.success) {
        setSuccessMsg(
          result.emailChanged
            ? "プロフィールを更新しました。新しいメールアドレスに確認メールを送信しました。"
            : "プロフィールを更新しました。"
        );
      }

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

        setValue("name", profile.name || "");
        setValue("email", profile.email || "");
        setCanChangeEmail(user.app_metadata?.provider === "email");

        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMsg("情報の取得中に問題が発生しました");
      }
    };

    fetchData();
  }, [router, setValue]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}
      <div className="mb-5">
        <div>
          <label htmlFor="name">Name :</label>
          <input
            id="name"
            className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
            {...register("name")}
          />
          <p className="text-red-500 mb-4">{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          {canChangeEmail ? (
            <input
              id="email"
              className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
              {...register("email")}
            />
          ) : (
            <p>{watch("email")}</p>
          )}
          <p className="text-red-500 mb-4">{errors.email?.message}</p>
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        名前もしくはパスワードを更新
      </Button>
    </form>
  );
};

export default AccountForm;
