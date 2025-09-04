import { NewInvoiceFormValues } from "@/lib/schemas/invoices";

export type InvoiceDetails = NewInvoiceFormValues & {
  logo: File | null;
  total_data: {
    subtotal: number;
    discountPercent: number;
    discountValue: number;
    taxPercent: number;
    taxValue: number;
    total: number;
    symbol: string;
  };
};

export type InvoiceRow = {
  created_at: string;
  id: string;
  invoice_data: InvoiceDetails;
  order: number;
  user_id: string;
};
