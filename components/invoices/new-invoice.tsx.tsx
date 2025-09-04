"use client";

import CreateForm from "@/components/invoices/new-invoice-form";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

type NewInvoicePageProps = {};

export default function NewInvoicePage({}: NewInvoicePageProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <CreateForm setIsLoading={setIsLoading} />
      <Spinner
        className="fixed top-1/2 left-1/2 -translate-1/2"
        show={isLoading}
      />
    </div>
  );
}
