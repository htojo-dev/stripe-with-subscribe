import { redirectIfAuthenticated } from "@/utils/guards";
import GithubLoginBtn from "@/components/auth/GithubLoginBtn";
import GoogleLoginBtn from "@/components/auth/GoogleLoginBtn";
import Eamilform from "@/components/auth/Eamilform";

const page = async () => {
  await redirectIfAuthenticated();

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div>
        <Eamilform />
        <GithubLoginBtn />
        <GoogleLoginBtn />
      </div>
    </div>
  );
};

export default page;
