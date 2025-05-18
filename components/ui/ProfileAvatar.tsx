import { getProfileData } from "@/lib/supabase/profile/profile-server";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

const ProfileAvatar = async () => {
  const profile = await getProfileData();
  // console.log(profile);

  if (!profile) return null;

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();
  // console.log(user)

  const avatarUrl = profile.avatar_url || user?.user_metadata.avatar_url || "/default-avatar.png";
  // console.log(avatarUrl);

  return (
    <div className="mr-3">
      <Image
        src={avatarUrl}
        alt="プロフィール画像"
        width={32}
        height={32}
        className="rounded-full"
      />
    </div>
  );
};

export default ProfileAvatar;
