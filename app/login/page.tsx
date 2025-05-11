import GithubLoginBtn from "@/components/auth/GithubLoginBtn";
import GoogleLoginBtn from "@/components/auth/GoogleLoginBtn";
import React from "react";
import Eamilform from "@/components/auth/Eamilform";

const page = () => {
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
