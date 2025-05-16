import { z } from "zod";

export const validationSchema = z.object({
  name: z
    .string()
    .nonempty("名前は必須です。")
    .min(2, "2文字以上で入力してください。"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .email("正しいメールアドレスで入力してください。")
});

export default validationSchema;
