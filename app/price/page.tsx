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
import { getProfileData } from "@/lib/supabase/profile";
import SubscriptionBtn from "@/components/checkout/SubscriptionBtn";

const page = async () => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getSession();

  const [plans, profile] = await Promise.all([
    await getAllPlans(),
    await getProfileData(),
  ]);

  const loggidIn = !!user.session && profile?.is_subscribed === false;
  const notLongIn = !user.session;
  const subscriptionManage = !!user.session && profile?.is_subscribed === true;

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
              {notLongIn && <Button>ログインする</Button>}
              {subscriptionManage && <Button>管理する</Button>}
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default page;
