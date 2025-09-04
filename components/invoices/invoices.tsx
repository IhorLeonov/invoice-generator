"use client";

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
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InvoiceRow } from "./types";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { MyPagination } from "../my-pagination";

const PAGE_SIZE = 5;

type InvoicesPageProps = {};

export default function InvoicesPage({}: InvoicesPageProps) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [invoices, setInvoices] = useState<InvoiceRow[] | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserData(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!userData) return;

    const fetchData = async () => {
      setLoading(true);

      const from = (currentPage - 1) * PAGE_SIZE;
      const to = currentPage * PAGE_SIZE - 1;

      const { data, count, error } = await supabase
        .from("invoices")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to)
        .eq("user_id", userData.id);

      setLoading(false);

      if (data) {
        setInvoices(data as InvoiceRow[] | null);
        setTotalPages(count ? Math.ceil(count / PAGE_SIZE) : 0);
      }
      if (error) return toast.error("Error fetching invoices");
    };

    fetchData();
  }, [userData, currentPage]);

  return (
    <>
      <Table className={cn("border rounded-md mt-4")}>
        {!!invoices?.length && (
          <TableCaption className="text-left pl-1">
            - A list of existing invoices
          </TableCaption>
        )}

        {!!invoices?.length ? (
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
              {invoices.map(({ invoice_data: data, order }) => (
                <TableRow key={order}>
                  <TableCell>
                    {new Date(data.invoice_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {data.due_date
                      ? new Date(data.due_date).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>{data.invoice_from}</TableCell>
                  <TableCell>{data.invoice_to}</TableCell>
                  <TableCell>{data.item_name}</TableCell>
                  <TableCell>{data.pay_terms || "-"}</TableCell>
                  <TableCell>{data.po_number || "-"}</TableCell>
                  <TableCell>{data.price}</TableCell>
                  <TableCell>{data.quantity}</TableCell>
                  <TableCell>{data.rate_type}</TableCell>
                  <TableCell>{data.currency}</TableCell>
                  <TableCell>{data.tax_rate || "-"}</TableCell>
                  <TableCell>{data.discount_rate || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        ) : (
          <>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      {" "}
                      No invoices yet.{" "}
                      <Link
                        className="hover:text-blue-400 underline"
                        href="/protected/invoices/new"
                      >
                        Create new?
                      </Link>
                    </>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </>
        )}
      </Table>

      {totalPages > 1 && (
        <MyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={(p) => setCurrentPage(p)}
        />
      )}
    </>
  );
}
