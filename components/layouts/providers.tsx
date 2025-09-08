"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

type ProvidersProps = { children: ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        // enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster />
    </>
  );
}
