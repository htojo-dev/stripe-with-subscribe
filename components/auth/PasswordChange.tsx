"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { validationPassword } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormVal = z.infer<typeof validationPassword>;

export const PasswordChange = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormVal>({
    mode: "onChange",
    resolver: zodResolver(validationPassword),
  });

  const onSubmit = async (passwordData: FormVal) => {
    setErrorMsg("");

    const supabase = await createClient();
    const {
      data: { user },
      error: useError,
    } = await supabase.auth.getUser();

    // ユーザーがいない場合（未ログイン）は null を返す
    if (useError || !user) {
      redirect("/login");
    }

    const { current_password, new_password } = passwordData;

    // if (new_password !== confirm_password) {
    //   setErrorMsg("新しいパスワードと確認用パスワードが一致しません。");
    //   return;
    // }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: current_password,
    });

    if (signInError) {
      setErrorMsg("現在のパスワードが正しくありません。");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: new_password,
    });

    if (updateError) {
      setErrorMsg("パスワードの更新に失敗しました。");
      return;
    }

    router.push("/");
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMsg && (
        <p className="text-red-700 font-semibold mb-4 bg-red-100 border border-red-300 p-2 rounded">
          {errorMsg}
        </p>
      )}
      <div className="mb-5">
        <label htmlFor="current_password">現在のパスワード :</label>
        <input
          type="password"
          id="current_password"
          className="w-full bg-gray-100 py-2 px-4 rounded-sm cursor-pointer"
          {...register("current_password")}
        />
        <p className="text-red-500 mb-4">{errors.current_password?.message}</p>
      </div>
      <div className="mb-5">
        <label htmlFor="new_password">新しいパスワード :</label>
        <input
          type="password"
          id="new_password"
          className="w-full bg-gray-100 py-2 px-4 rounded-sm cursor-pointer"
          {...register("new_password")}
        />
        <p className="text-red-500 mb-4">{errors.new_password?.message}</p>
      </div>
      <div className="mb-5">
        <label htmlFor="confirm_password">新しいパスワード（確認） :</label>
        <input
          type="password"
          id="confirm_password"
          className="w-full bg-gray-100 py-2 px-4 rounded-sm cursor-pointer"
          {...register("confirm_password")}
        />
        <p className="text-red-500 mb-4">{errors.confirm_password?.message}</p>
      </div>
      <Button type="submit">送信</Button>
    </form>
  );
};
