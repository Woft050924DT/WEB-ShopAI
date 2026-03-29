import Sidebar from "@/src/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar cố định */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Nội dung chính */}
      <div className="ml-64 flex-1 bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm">Admin</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Nội dung */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}