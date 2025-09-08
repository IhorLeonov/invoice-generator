import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  }
  return stripePromise;
};

export default getStripe;

function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export { getStripe, convertToSubcurrency };
