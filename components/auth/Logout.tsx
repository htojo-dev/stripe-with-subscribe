"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const Logout = () => {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return <Button onClick={handleLogout}>ログアウト</Button>
}

export default Logout