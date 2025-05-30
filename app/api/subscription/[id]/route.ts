import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const priceId = url.pathname.split("/").pop(); // [priceId] をパスから抽出
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: stripe_customer_data } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user?.id)
    .single();

  if (!stripe_customer_data?.stripe_customer) {
    return NextResponse.json(
      { error: "Stripe customer not found" },
      { status: 400 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer_data?.stripe_customer,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.BASE_PATH}/payment/success`,
    cancel_url: `${process.env.BASE_PATH}/payment/cancel`,
  });
  // console.log("sessionの中身",session);

  return NextResponse.json({ id: session.id });
}
