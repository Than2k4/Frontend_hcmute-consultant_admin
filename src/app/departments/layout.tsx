import Sidebar from "@/components/sidebar";

export default function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Nội dung chính */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
