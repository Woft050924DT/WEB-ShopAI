'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/src/admin/sidebar';
import { normalizeApiError } from '@/src/services/api-client.service';
import { getCurrentUser, logout } from '@/src/services/auth.service';
import { clearSessionStorage, getStoredAuth, setStoredAuth, type StoredAuth } from '@/src/lib/storage';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState<StoredAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const bootstrapAdmin = async () => {
      try {
        const user = await getCurrentUser();

        if (user.role !== 'admin') {
          router.replace('/');
          return;
        }

        setStoredAuth({ user, token: getStoredAuth()?.token });
        setAuth({ user });
      } catch {
        clearSessionStorage();
        router.replace(`/auth/login?redirect=${encodeURIComponent(pathname || '/admin')}`);
        return;
      } finally {
        setLoading(false);
      }
    };

    void bootstrapAdmin();
  }, [pathname, router]);

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
    } catch (err) {
      setError(normalizeApiError(err));
    } finally {
      clearSessionStorage();
      router.replace('/auth/login');
    }
  };

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-[#0F172A] text-sm text-white">Dang tai khu vuc admin...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F3F6FB] text-[#111827]">
      <Sidebar />
      <div className="min-h-screen pl-64">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#D9E0EC] bg-white px-8 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2563EB]">Admin Panel</p>
            <h1 className="text-2xl font-black">Quan tri he thong</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">{auth?.user.fullName || 'Admin'}</p>
              <p className="text-xs text-[#667085]">{auth?.user.email || 'Dang tai...'}</p>
            </div>
            <Link href="/" className="rounded-full border border-[#D9E0EC] px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-[#F8FAFC]">
              Ve shop
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full bg-[#EF3D32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D83027]"
            >
              Dang xuat
            </button>
          </div>
        </header>

        {error ? <p className="px-8 pt-6 text-sm text-red-600">{error}</p> : null}

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
