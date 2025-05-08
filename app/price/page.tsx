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

const page = async () => {
  const plans = await getAllPlans();

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
            <CardContent>{plan.price}円 / {plan.interval}</CardContent>
            <CardFooter>
              <Button>サブスク契約</Button>
            </CardFooter>
          </Card>
        </li>
        ))}
      </ul>
  );
};

export default page;
