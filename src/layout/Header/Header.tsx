'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/src/services/auth.service';
import { getStoredAuth, getStoredCart, setStoredAuth } from '@/src/lib/storage';

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [initials, setInitials] = useState('VS');
  const [accountLabel, setAccountLabel] = useState('Tai khoan');

  useEffect(() => {
    const syncState = () => {
      const auth = getStoredAuth();
      const cart = getStoredCart();

      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

      if (auth?.user) {
        const nextInitials = auth.user.fullName
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase())
          .join('');

        setInitials(nextInitials || 'VS');
        setAccountLabel(auth.user.fullName);
      } else {
        setInitials('VS');
        setAccountLabel('Tai khoan');
      }
    };

    syncState();
    void getCurrentUser()
      .then((user) => {
        const auth = getStoredAuth();
        if (!auth || auth.user.id !== user.id || auth.user.role !== user.role) {
          setStoredAuth({ user, token: auth?.token });
        }
      })
      .catch(() => {
        return;
      });
    window.addEventListener('storage', syncState);
    window.addEventListener('vietshop-storage', syncState);

    return () => {
      window.removeEventListener('storage', syncState);
      window.removeEventListener('vietshop-storage', syncState);
    };
  }, []);

  const handleSearch = () => {
    router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E9EE] bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EF3D32] text-white">V</div>
          <span className="hidden text-xl font-bold leading-none text-[#1F2937] md:block">VietShop</span>
        </Link>

        <div className="flex-1">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[#9CA3AF]">Tim</span>
            <input
              type="text"
              placeholder="Tim kiem san pham..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-full border border-[#E5E7EB] bg-[#F9FAFB] pl-11 pr-24 text-sm focus:border-[#1565C0] focus:outline-none focus:ring-2 focus:ring-[#1565C0]/25"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-1.5 h-8 rounded-full bg-[#EF3D32] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#D83027]"
            >
              Tim
            </button>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-gray-100">
            <span className="text-[#212121]">!</span>
            <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF3D32] text-[9px] font-bold text-white">1</span>
          </button>
          <button
            className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-gray-100"
            onClick={() => router.push('/cart')}
          >
            <span className="text-[#212121]">Cart</span>
            {cartCount > 0 ? (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#EF3D32] px-1 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
          <button
            className="hidden items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-gray-100 sm:flex"
            onClick={() => router.push(getStoredAuth()?.user.role === 'admin' ? '/admin' : '/account')}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1976D2] text-xs font-bold text-white">
              {initials}
            </div>
            <span className="max-w-[140px] truncate text-sm text-[#111827]">{accountLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
