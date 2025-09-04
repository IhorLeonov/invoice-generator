"use server";

import { createClient } from "@/utils/supabase/server";
import { InvoiceDetails } from "./types";

export async function saveInvoice(invoice: InvoiceDetails) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authorized" };

  const { error: insertError } = await supabase.from("invoices").insert({
    invoice_data: invoice,
    user_id: user.id,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return { error: "This invoice number already exists" };
    }
    console.log("Error", insertError.message);
    return { error: "Inserting invoice error" };
  }

  return { success: true };
}
