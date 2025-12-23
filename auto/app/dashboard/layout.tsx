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
    <div className="h-screen w-screen bg-gray-100 overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />

          <main
            className="flex-1 overflow-y-auto p-6 transition-all duration-300"
            role="main"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
