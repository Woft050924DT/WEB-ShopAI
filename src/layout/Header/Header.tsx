'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E7E9EE]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#EF3D32] rounded-lg grid place-items-center text-white">
            ⚡
          </div>
          <span className="text-xl leading-none font-bold text-[#1F2937] hidden md:block">VietShop</span>
        </Link>

        <div className="flex-1">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[#9CA3AF]">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-24 rounded-full text-sm border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#1565C0]/25 focus:border-[#1565C0]"
              onKeyDown={(e) => e.key === 'Enter' && router.push(`/products?q=${encodeURIComponent(searchQuery)}`)}
            />
            <button
              onClick={() => router.push(`/products?q=${encodeURIComponent(searchQuery)}`)}
              className="absolute right-1.5 h-8 px-4 bg-[#EF3D32] text-white text-xs rounded-full hover:bg-[#D83027] transition-colors font-semibold"
            >
              Tìm
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="relative w-9 h-9 rounded-full hover:bg-gray-100 grid place-items-center">
            <span className="text-[#212121]">🔔</span>
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#EF3D32] rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span>
          </button>
          <button
            className="relative w-9 h-9 rounded-full hover:bg-gray-100 grid place-items-center"
            onClick={() => router.push('/cart')}
          >
            <span className="text-[#212121]">🛒</span>
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#EF3D32] rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="hidden sm:flex items-center gap-2 pl-1 pr-2 py-1 hover:bg-gray-100 rounded-full"
            onClick={() => router.push('/account')}
          >
            <div className="w-7 h-7 bg-[#1976D2] rounded-full flex items-center justify-center text-white text-xs font-bold">NA</div>
            <span className="text-sm text-[#111827]">Tài khoản</span>
            <span className="text-[#6B7280] text-xs">▾</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
