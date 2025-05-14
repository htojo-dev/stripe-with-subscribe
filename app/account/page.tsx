"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Account = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [canChangeEmail, setCanChangeEmail] = useState(false);
  const [loading, setLoading] = useState(true);

  // useSWRはキャッシュを前提としていて反映にラグが出やすいため、useEffectで処理
  useEffect(() => {
    const getUser = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      const user = data.user;

      if (error || !user) {
        router.push("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("name, email")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error(profileError);
        return;
      }

      setName(profile.name || "");
      setEmail(profile.email || "");
      setCanChangeEmail(user.app_metadata?.provider === "email");

      setLoading(false);
    };

    getUser();
  }, [router]);

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
