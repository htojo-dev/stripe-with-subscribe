import Logout from "@/components/auth/Logout";
import PasswordBtn from "@/components/auth/PasswordBtn";
import AccountForm from "@/components/ui/AccountForm";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import AvatarUploadForm from "@/components/ui/AvatarUploadForm";
import { redirectIfUnauthenticated } from "@/utils/guards";

const Account = async () => {
  await redirectIfUnauthenticated();

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <h2 className="mb-10">ユーザープロフィール画面</h2>

      <div className="mb-10">
        <ProfileAvatar width={92} height={92} />
        <AvatarUploadForm />
      </div>
      <div className="mb-10">
        <AccountForm />
      </div>
      <PasswordBtn />
      <Logout />
    </div>
  );
};

export default Account;
