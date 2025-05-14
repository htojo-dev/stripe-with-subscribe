import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPlans } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";
import { getProfileData } from "@/lib/supabase/profile/profile-server";
import SubscriptionBtn from "@/components/checkout/SubscriptionBtn";
import LoginBtn from "@/components/auth/LoginBtn";
import { getSession } from "@/lib/supabase/session";
import Link from "next/link";

const page = async () => {
  const user = await getSession();

  const supabase = await createClient();
  const { data: sessionUser } = await supabase.auth.getSession();

  const [plans, profile] = await Promise.all([
    await getAllPlans(),
    await getProfileData(),
  ]);

  const loggidIn = !!sessionUser.session && profile?.is_subscribed === false;
  const notLongIn = !sessionUser.session;
  const subscriptionManage =
    !!sessionUser.session && profile?.is_subscribed === true;

  return (
    <ul className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {/* <pre>{JSON.stringify(plans, null, 2)}</pre> */}
      {plans.map((plan) => (
        <li key={plan.id}>
          <Card>
            <CardHeader>
              <CardTitle>{plan.name}プラン</CardTitle>
              <CardDescription>{plan.name}</CardDescription>
            </CardHeader>
            <CardContent>
              {plan.price}円 / {plan.interval}
            </CardContent>
            <CardFooter>
              {loggidIn && <SubscriptionBtn planId={plan.id} />}
              {notLongIn && <LoginBtn user={user} />}
              {subscriptionManage && (
                <Button>
                  <Link href="/dashboard">サブスクリプション管理する</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default page;
