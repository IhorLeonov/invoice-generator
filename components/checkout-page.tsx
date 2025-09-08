"use client";

import CheckoutForm from "@/components/checkout-form";

import { Elements } from "@stripe/react-stripe-js";
import getStripe, { convertToSubcurrency } from "@/utils/stripe-helpers";

type CheckoutPageProps = {
  amount: number;
};

const stripePromise = getStripe();

export default function CheckoutPage({ amount }: CheckoutPageProps) {
  return (
    <div className="mx-auto w-full p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(1), // cents
          currency: "usd",
        }}
      >
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}
