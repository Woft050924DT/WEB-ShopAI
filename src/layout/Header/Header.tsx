'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-[#E0E0E0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 cursor-pointer shrink-0">
            <div className="w-8 h-8 bg-[#E53935] rounded-lg flex items-center justify-center text-white">
              ⚡
            </div>
            <span className="text-lg font-bold text-[#212121] hidden sm:block">VietShop</span>
          </Link>

          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#757575]">🔍</span>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#E0E0E0] rounded-full text-sm focus:outline-none focus:border-[#1565C0] bg-[#F5F6FA]"
                onKeyDown={(e) => e.key === 'Enter' && router.push(`/products?q=${encodeURIComponent(searchQuery)}`)}
              />
              <button
                onClick={() => router.push(`/products?q=${encodeURIComponent(searchQuery)}`)}
                className="absolute right-1 bg-[#E53935] text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#C62828] transition-colors"
              >
                Tìm
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <span className="text-[#212121] text-base">🔔</span>
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E53935] rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span>
            </button>
            <button
              className="relative p-2 hover:bg-gray-100 rounded-full"
              onClick={() => router.push('/cart')}
            >
              <span className="text-[#212121] text-base">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E53935] rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="hidden sm:flex items-center gap-1.5 pl-1 pr-3 py-1 hover:bg-gray-100 rounded-full"
              onClick={() => router.push('/account')}
            >
              <div className="w-7 h-7 bg-[#1565C0] rounded-full flex items-center justify-center text-white text-xs font-bold">NA</div>
              <span className="text-sm text-[#212121] hidden md:block">Tài khoản</span>
              <span className="text-[#757575] hidden md:block text-xs">▾</span>
            </button>
            <button className="sm:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="text-base">{mobileMenuOpen ? '✖' : '☰'}</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
