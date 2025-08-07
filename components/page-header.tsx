"use client";

import { cn } from "@/lib/utils";
import {
  LucideLayoutDashboard,
  Package,
  UsersIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PageHeaderProps = {};

const LINKS = [
  { href: "/protected/invoices/new", label: "New invoice", Icon: <Package /> },

  {
    href: "/protected/invoices",
    label: "My invoices",
    Icon: <LucideLayoutDashboard />,
  },
  { href: "/protected/profile", label: "Profile page", Icon: <UsersIcon /> },
];

export default function PageHeader({}: PageHeaderProps) {
  let title = "Home page";

  const pathname = usePathname();

  if (pathname === "/protected/invoices") title = "Invoices";
  if (pathname === "/protected/invoices/new") title = "Create new";
  if (pathname === "/protected/profile") title = "Profile";

  return (
    <>
      <nav className="bg-white border w-full text-sm p-3 px-5 rounded-md text-foreground flex gap-2 items-center justify-between">
        <h1
          className={cn(
            "text-xl max-sm:sr-only flex gap-2 text-gray-700 items-center font-medium"
          )}
        >
          {title}
        </h1>{" "}
        <ul className="flex gap-4 max-sm:w-full max-sm:justify-around">
          {LINKS.map(({ label, href, Icon }) => {
            return (
              <li key={label}>
                <Link
                  prefetch
                  className={cn(
                    "flex items-center transition-colors [&>svg]:w-4 gap-1 hover:text-foreground text-gray-500",
                    pathname === href && label !== "Home" && "text-foreground",
                    pathname === "/protected" &&
                      label === "Home" &&
                      "text-foreground"
                  )}
                  href={href}
                >
                  {label}
                  {Icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
