import { getProfileData } from "@/lib/supabase/profile/profile-server";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
}

const ProfileAvatar = async ({width = 32, height = 32}: Props) => {
  const profile = await getProfileData();
  // console.log(profile);

  if (!profile) return null;

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();
  // console.log(user)

  const avatarUrl = profile.avatar_url || user?.user_metadata.avatar_url || "/default-avatar.png";
  // console.log(avatarUrl);

  return (
    <div className="rounded-full overflow-hidden relative" style={{ width: `${width}px`, height: `${height}px`}}>
      <Image
        src={avatarUrl}
        alt="プロフィール画像"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default ProfileAvatar;
