import { requireUser } from "@/lib/auth/requireUser";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
