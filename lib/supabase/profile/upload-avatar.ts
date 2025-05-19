import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

export const uploadAvatarImage = async (file: File): Promise<string | null> => {
  const supabase = createClient();
  const fileExt = (file.name.split(".").pop() || "png").toLowerCase(); // 拡張子だけを取り出す
  const fileName = `${uuidv4()}.${fileExt}`; // 一意なファイル名に変更
  const filePath = fileName;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false, // 同じファイル名が存在した場合、上書きをエラーとする
    });

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return publicUrlData?.publicUrl || null;
};
