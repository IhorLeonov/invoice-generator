"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import Divider from "../modules/divider";
import { Button } from "../ui/button";
import { ProfileData } from "@/utils/types";

import { useRouter } from "next/navigation";

type PricingPlanProps = {
  profile: ProfileData | undefined;
};

type PlanItemProps = ComponentPropsWithoutRef<"li"> & {
  label: string;
  price?: number;
  benefits: string[];
  isActive?: boolean;
};

export const PlanItem = ({
  className,
  label,
  price,
  benefits,
  isActive,
}: PlanItemProps) => {
  const router = useRouter();

  return (
    <li
      className={cn(
        "w-full md:w-1/3 border rounded-md p-3 pb-5",
        isActive && "border-green-400",
        className
      )}
    >
      <p
        className={cn(
          "font-semibold text-gray-500",
          isActive && "text-green-400"
        )}
      >
        {label}
      </p>
      <p className="font-semibold text-[32px] mt-2">
        ${price}
        <span className="text-[16px] font-normal text-gray-500"> / month</span>
      </p>

      <Divider className="mt-2" />

      <ul className="mt-2">
        {benefits.map((b) => (
          <li key={b}>- {b}</li>
        ))}
      </ul>

      <Button
        onClick={() => router.push(`/payment?amount=${price}`)}
        disabled={isActive}
        className="mt-2 w-full"
      >
        Select
      </Button>
    </li>
  );
};

export default function PricingPlan({ profile }: PricingPlanProps) {
  return (
    <section id="#pricing" className="mt-8">
      <h2 className="text-center text-[28px] font-semibold">Pricing plan</h2>

      <ul className="flex flex-col md:flex-row mt-4 gap-4">
        <PlanItem
          isActive={profile?.subscription === "free"}
          label="Free"
          price={0}
          benefits={["10 invoices available"]}
        />
        <PlanItem
          isActive={profile?.subscription === "basic"}
          label="Basic"
          price={5}
          benefits={["25 invoices available"]}
        />
        <PlanItem
          isActive={profile?.subscription === "pro"}
          label="Pro"
          price={10}
          benefits={["Unlimited amount available"]}
        />
      </ul>
    </section>
  );
}
