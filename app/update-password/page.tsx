"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import { validationUpdatePassword } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

type FormVal = z.infer<typeof validationUpdatePassword>;

const UpdatePassword = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormVal>({
    mode: "onChange",
    resolver: zodResolver(validationUpdatePassword),
  });

  const onSubmit = async (updatePasswordData: FormVal) => {
    setErrorMsg("");
    setSuccessMsg("");

    const supabase = await createClient();
    const { error: passwordError } = await supabase.auth.updateUser({
      password: updatePasswordData.password,
    });

    if (passwordError) {
      setErrorMsg("パスワードの更新に失敗しました。");
    } else {
      setSuccessMsg(
        "パスワードの更新に成功しました。3秒後にログイン画面へ移動します。"
      );
      setTimeout(() => router.push("/login"), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        新しいパスワードを入力してください
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}
        <input
          type="password"
          autoComplete="new-password"
          className="w-full p-2 mb-4 border"
          placeholder="New password"
          {...register("password")}
        />
        <p className="text-red-500 mb-4">{errors.password?.message}</p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "更新中..." : "パスワード更新"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
