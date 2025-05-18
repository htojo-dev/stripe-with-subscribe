"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { validationResetPassword } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormVal = z.infer<typeof validationResetPassword>;

const PasswordReset = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormVal>({
    mode: "onChange",
    resolver: zodResolver(validationResetPassword),
  });

  const onSubmit = async (passwordData: FormVal) => {
    setErrorMsg("");
    setSuccessMsg("");

    const supabase = await createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      passwordData.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_PATH}/update-password`,
      }
    );

    if (resetError) {
      console.error("パスワードリセット送信エラー:", resetError.message);
      setErrorMsg("パスワードリセット送信エラー");
      return;
    } else {
      setSuccessMsg("パスワードリセット用のメールを送信しました。");
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {successMsg && <p className="text-green-600">{successMsg}</p>}
      <div>
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
          {...register("email")}
        />
        <p className="text-red-500 mb-4">{errors.email?.message}</p>
      </div>
      <Button type="submit">送信</Button>
      <p>
        <Link href="/login" className="underline">
          ログインページ
        </Link>
        に戻る
      </p>
    </form>
  );
};

export default PasswordReset;
