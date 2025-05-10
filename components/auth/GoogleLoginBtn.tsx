"use client";

import React from 'react'
import { Button } from '../ui/button'
import { createClient } from '@/utils/supabase/client';

const GoogleLoginBtn = () => {
  const supabase = createClient();

  const handlelogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/callback`,
        },
      });
    } catch(error) {
      console.log("ログインに失敗しました。", error)
    }
  };


  return (
    <Button className='w-full cursor-pointer' onClick={handlelogin}>Googleでログイン</Button>
  )
}

export default GoogleLoginBtn