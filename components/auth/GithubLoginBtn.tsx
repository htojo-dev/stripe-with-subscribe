"use client";

import React from 'react'
import { Button } from '../ui/button'
import { createClient } from '@/utils/supabase/client';

const GithubLoginBtn = () => {
  const supabase = createClient();

  const handlelogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/callback`,
        },
      });
    } catch(error) {
      console.log("ログインに失敗しました。", error)
    }
  };


  return (
    <Button className='w-full mb-3 cursor-pointer' onClick={handlelogin}>Githubでログイン</Button>
  )
}

export default GithubLoginBtn