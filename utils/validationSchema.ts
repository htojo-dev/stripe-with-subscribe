import { z } from "zod";

export const validationSchema = z.object({
  name: z
    .string()
    .nonempty("名前は必須です。")
    .min(2, "2文字以上で入力してください。"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .email("正しいメールアドレスで入力してください。"),
});
// export default validationSchema;

export const validationPassword = z
  .object({
    current_password: z.string().nonempty("入力は必須です。"),
    new_password: z
      .string()
      .nonempty("パスワードは必須です。")
      .min(6, "6文字以上で入力してください")
      .regex(
        /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
        "パスワードは半角英数字混合で入力してください"
      ),
    confirm_password: z.string().nonempty("確認用パスワードは必須です。"),
  })
  .superRefine(({current_password, new_password, confirm_password}, ctx) => {
    if(new_password !== confirm_password) {
      ctx.addIssue({
        path: ["confirm_password"],
        code: "custom",
        message: "パスワードが一致しません。",
      });
    }
    if(current_password === new_password) {
      ctx.addIssue({
        path: ["new_password"],
        code: "custom",
        message: "現在のパスワードと一緒です。"
      })
    }
  })