import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

type HomePageProps = {};

export default async function HomePage({}: HomePageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sigh-in");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*", { head: false })
    .eq("id", user?.id)
    .single();

  return (
    <div className="flex-1 w-full flex items-center justify-center flex-col">
      <h2 className="text-[28px] lg:text-[40px]">
        Welcome, {profile?.full_name || "authorized user"}!
      </h2>

      <Link
        className="underline hover:text-blue-400"
        href="/protected/invoices/new"
      >
        Click to start -&gt;
      </Link>
    </div>
  );
}
