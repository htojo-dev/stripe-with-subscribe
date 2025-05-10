import GithubLoginBtn from "@/components/auth/GithubLoginBtn";
import GoogleLoginBtn from "@/components/auth/GoogleLoginBtn";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div>
        <GithubLoginBtn />
        <GoogleLoginBtn />
      </div>
    </div>
  );
};

export default page;
