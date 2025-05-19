"use client";

import { useRef, useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { updateAvatarUrl } from "@/lib/supabase/profile/profile-client";
import { uploadAvatarImage } from "@/lib/supabase/profile/upload-avatar";

function AvatarUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const imageUrl = await uploadAvatarImage(file);
      if (!imageUrl) {
        throw new Error("画像のアップロードに失敗しました。");
      }

      await updateAvatarUrl(imageUrl);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("アップロード中にエラーが発生しました。");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:bg-black file:text-white hover:file:bg-gray-800"
      />
      <Button
        className="mt-2 px-4 py-2 text-white rounded disabled:opacity-50"
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "アップロード中..." : "画像を変更"}
      </Button>
    </div>
  );
}

export default AvatarUploadForm;
