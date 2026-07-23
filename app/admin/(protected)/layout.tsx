import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminSession();
  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream-dim">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 max-w-5xl">{children}</main>
    </div>
  );
}
