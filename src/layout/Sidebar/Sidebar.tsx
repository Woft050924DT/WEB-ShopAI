'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const navbar = [
    { label: 'Tat ca danh muc', path: '/products' },
    { label: 'Dien thoai', path: '/products?q=iphone' },
    { label: 'Thoi trang', path: '/products?q=thoi%20trang' },
    { label: 'Nha cua', path: '/products?q=nha%20cua' },
    { label: 'Flash Sale', path: '/products?featured=true', red: true },
  ];

  return (
    <nav className="border-b border-[#E0E0E0] bg-white/95">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-12 items-center gap-6 overflow-x-auto whitespace-nowrap">
          {navbar.map((link) => (
            <button
              key={link.path}
              onClick={() => router.push(link.path)}
              className={`shrink-0 text-[15px] font-semibold transition-colors hover:text-[#EF3D32] ${
                link.red ? 'text-[#EF3D32]' : 'text-[#111827]'
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
