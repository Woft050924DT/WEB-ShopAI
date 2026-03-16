'use client';

import React from "react";
import { useRouter } from "next/navigation";


const Sidebar = () => {
  const router = useRouter();
  const Navbar = [
    { label: "Tất cả danh mục", path: "/products" },
    { label: "Điện tử", path: "/products?cat=electronics" },
    { label: "Thời trang", path: "/products?cat=fashion" },
    { label: "Nhà cửa", path: "/products?cat=home" },
    { label: "Flash Sale 🔥", path: "/products?sale=true", red: true },
  ];

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="bg-white/95 border-b border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 h-12 overflow-x-auto whitespace-nowrap">
          {Navbar.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-[15px] hover:text-[#EF3D32] transition-colors shrink-0 font-semibold ${
                link.red ? "text-[#EF3D32]" : "text-[#111827]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
