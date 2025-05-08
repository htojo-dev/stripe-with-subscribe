import Stripe from "stripe";

interface Plan {
  id: string;
  name: string;
  price: string | null;
  interval: Stripe.Price.Recurring.Interval | null;
  currency: string;
}

export const getAllPlans = async (): Promise<Plan[]> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { data: plansList } = await stripe.plans.list();

  const plans = await Promise.all(
    plansList.map(async (plan) => {
      const product = await stripe.products.retrieve(plan.product as string);
      return {
        id: plan.id,
        name: product.name,
        price: plan.amount_decimal,
        interval: plan.interval,
        currency: plan.currency,
      };
    })
  );

  const sortedPlans = plans.sort(
    (a, b) => parseInt(a.price!) - parseInt(b.price!)
  );

  return sortedPlans;
};
