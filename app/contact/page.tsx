"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { validationContact } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type FormVal = z.infer<typeof validationContact>;

function Contact() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormVal>({
    mode: "onChange",
    resolver: zodResolver(validationContact),
  });

  const onSubmit = async (data: FormVal) => {
    console.log(data);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result?.ok) {
        setSuccessMsg("お問合せを送信しました。");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.log("お問い合わせの送信に失敗", err);
      setErrorMsg("お問い合わせの送信に失敗しました");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <h2>お問い合わせフォーム</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}

        <label htmlFor="name">お名前 :</label>
        <input
          type="text"
          id="name"
          placeholder="お名前"
          className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
          {...register("name")}
        />
        <p className="text-red-500 mb-4">{errors.name?.message}</p>

        <label htmlFor="email">メールアドレス :</label>
        <input
          type="text"
          id="email"
          placeholder="メールアドレス"
          className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
          {...register("email")}
        />
        <p className="text-red-500 mb-4">{errors.email?.message}</p>

        <label htmlFor="tel">電話番号 :</label>
        <input
          type="text"
          id="tel"
          placeholder="電話番号"
          className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
          {...register("tel")}
        />
        <p className="text-red-500 mb-4">{errors.tel?.message}</p>

        <label htmlFor="message">お問い合わせ内容 :</label>
        <textarea
          id="message"
          placeholder="お問い合わせ内容"
          className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
          {...register("message")}
        />
        <p className="text-red-500 mb-4">{errors.message?.message}</p>

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          お問い合わせを送信
        </Button>
      </form>
    </div>
  );
}

export default Contact;
