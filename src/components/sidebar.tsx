"use client";

import Link from "next/link";
import Image from "next/image"; // 👈 Thêm dòng này
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Người dùng", path: "/users" },
    { name: "Câu hỏi", path: "/questions" },
    { name: "Câu trả lời", path: "/answers" },
    { name: "Bài viết", path: "/posts" },
    { name: "Phòng ban", path: "/departments" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex items-center justify-center gap-3 py-5 text-xl font-bold border-b border-gray-700">
        <Image
          src="/favicon.ico" 
          alt="App Icon"
          width={40}  
          height={40} 
          className="rounded-full border-2 border-white shadow-md" 
        />
        <span className="text-2xl font-semibold">HCMUTE Admin</span> {}
      </div>

      <nav className="flex-1 px-4 py-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block py-2 px-3 rounded-md text-sm font-medium ${pathname === item.path
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
