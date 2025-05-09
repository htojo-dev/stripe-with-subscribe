"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";

const SubscriptionBtn = ({ planId }: { planId: string }) => {
  const processSubscription = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT}/api/subscription/${planId}`
    );
    // const json = await res.json();
    // console.log(json);
    const data = await res.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return <Button onClick={processSubscription}>サブスク</Button>;
};

export default SubscriptionBtn;
