"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Người dùng", path: "/users" },
    { name: "Câu hỏi", path: "/questions" },
    { name: "Bài viết", path: "/posts" },
    { name: "Lĩnh vực", path: "/fields" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="text-center py-4 text-xl font-bold border-b border-gray-700">
        HCMUTE Admin
      </div>
      <nav className="flex-1 px-4 py-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block py-2 px-3 rounded-md text-sm font-medium ${
              pathname === item.path
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
