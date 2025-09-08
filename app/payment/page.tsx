import CheckoutPage from "@/components/checkout-page";

type PageProps = {
  searchParams: Promise<{ amount: number }>;
};

export default async function PaymentPage({ searchParams }: PageProps) {
  const { amount } = await searchParams;

  console.log({ amountServer: amount });

  return <CheckoutPage amount={amount} />;
}
