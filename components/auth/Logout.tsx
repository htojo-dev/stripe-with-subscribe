"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const Logout = () => {
  const router = useRouter();
  const supabase = createClient();

  const handlelogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return <Button onClick={handlelogout}>ログアウト</Button>
}

export default Logout