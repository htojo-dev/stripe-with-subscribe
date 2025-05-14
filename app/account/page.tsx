"use client";

import { getProfileData } from "@/lib/supabase/profile/profile-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Account = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [canChangeEmail, setCanChangeEmail] = useState(false);
  const [loading, setLoading] = useState(true);

  // useSWRはキャッシュを前提としていて反映にラグが出やすいため、useEffectで処理
  useEffect (() => {
    const fetchData = async () => {
      try {
        const result = await getProfileData({redirectOnFail: false})

        if(!result) {
          router.push('/login');
          return;
        }

        const {profile, user} = result;

        setName(profile.name || "");
        setEmail(profile.email || "");
        setCanChangeEmail(user.app_metadata?.provider === "email");

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [router])

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <form>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          {canChangeEmail ? (
            <input
              type="email"
              id="email"
              className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{email}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Account;
