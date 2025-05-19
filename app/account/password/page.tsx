import { redirectIfUnauthenticated } from "@/utils/guards";
import { PasswordChange } from "@/components/auth/PasswordChange";

const Page = async () => {
  await redirectIfUnauthenticated();

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <h2 className="mb-10">パスワードの変更</h2>
      <PasswordChange />
    </div>
  );
};

export default Page;
