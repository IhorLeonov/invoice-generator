import { InvoiceData } from "@/components/invoices/invoice-page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";

type InvoicesProps = {};

export default async function Invoices({}: InvoicesProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data } = await supabase
    .from("invoices")
    .select("invoice_data, order")
    .eq("user_id", user.id);

  const invoices = (data ?? []).map((row) => ({
    ...(row.invoice_data as InvoiceData),
    order: row.order,
  }));

  return (
    <Table className={cn("border rounded-md mt-4")}>
      {!!invoices.length && (
        <TableCaption className="text-left pl-1">
          - A list of existing invoices
        </TableCaption>
      )}

      {!!invoices.length ? (
        <>
          <TableHeader>
            <TableRow>
              <TableHead>invoice_date</TableHead>
              <TableHead>due_date</TableHead>
              <TableHead>invoice_from</TableHead>
              <TableHead>invoice_to</TableHead>
              <TableHead>item_name</TableHead>
              <TableHead>pay_terms</TableHead>
              <TableHead>po_number</TableHead>
              <TableHead>price</TableHead>
              <TableHead>quantity</TableHead>
              <TableHead>rate_type</TableHead>
              <TableHead>currency</TableHead>
              <TableHead>tax_rate</TableHead>
              <TableHead>discount_rate</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((i) => (
              <TableRow key={i.order}>
                <TableCell>
                  {new Date(i.invoice_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {i.due_date ? new Date(i.due_date).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>{i.invoice_from}</TableCell>
                <TableCell>{i.invoice_to}</TableCell>
                <TableCell>{i.item_name}</TableCell>
                <TableCell>{i.pay_terms || "-"}</TableCell>
                <TableCell>{i.po_number || "-"}</TableCell>
                <TableCell>{i.price}</TableCell>
                <TableCell>{i.quantity}</TableCell>
                <TableCell>{i.rate_type}</TableCell>
                <TableCell>{i.currency}</TableCell>
                <TableCell>{i.tax_rate || "-"}</TableCell>
                <TableCell>{i.discount_rate || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      ) : (
        <>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">
                No invoices yet.{" "}
                <Link
                  className="hover:text-blue-400 underline"
                  href="/protected/invoices/new"
                >
                  Create new?
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </>
      )}
    </Table>
  );
}
