import { validationContact } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // バリデーション（サーバー側でも行う）
    const parsed = validationContact.safeParse(body);
    if(!parsed.success) {
      return NextResponse.json({err: "バリデーションに失敗しました。"}, {status: 400});
    }

    const {name, email, tel, message} = parsed.data;

    // 【1】管理者宛
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "web.h.tojo1209@gmail.com", // 本番環境はemailでOK
      subject: "お問い合わせがありました",
      html: `
      <h1>新しいお問い合わせ</h1>
      <p><strong>お名前:</strong> ${name}</p>
      <p><strong>メールアドレス:</strong> ${email}</p>
      <p><strong>電話番号:</strong> ${tel}</p>
      <p><strong>内容:</strong><br />${message.replace(/\n/g, "<br />")}</p>
    `,
    })

    // 【2】送信者に自動返信
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "web.h.tojo1209@gmail.com",
      subject: "お問い合わせありがとうございます",
      html: `
        <p>${name} 様</p>
        <p>この度はお問い合わせいただきありがとうございます。</p>
        <p>以下の内容で受け付けました。</p>
        <hr />
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>電話番号:</strong> ${tel}</p>
        <p><strong>お問い合わせ内容:</strong><br />${message.replace(/\n/g, "<br />")}</p>
        <hr />
        <p>後ほど担当者よりご連絡いたします。</p>
        <p>※本メールは自動送信です。</p>
      `,
    });

    return NextResponse.json({success: true, result});

  } catch(err) {
    console.error("メール送信失敗:", err);
    return NextResponse.json({ err: "メール送信に失敗しました" }, { status: 500 });
  }
}