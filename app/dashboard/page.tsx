import ManageBtn from "@/components/checkout/ManageBtn";
import { getProfileData } from "@/lib/supabase/profile/profile-server";
import { redirectIfUnauthenticated } from "@/utils/guards";

const DashboardPage = async () => {
  await redirectIfUnauthenticated();

  const profile = await getProfileData();

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">ユーザー管理ダッシュボード</h1>
      <div>
        <div className="mb-3">
          {profile?.is_subscribed
            ? `プラン契約中です: ${profile.interval}`
            : "プラン未加入"}
        </div>
        <ManageBtn />
      </div>
    </div>
  );
};

export default DashboardPage;
