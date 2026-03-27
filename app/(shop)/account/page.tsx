'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { formatCurrency } from '@/src/lib/api';
import { clearStoredAuth, getStoredAuth, getStoredOrders, type StoredAuth } from '@/src/lib/storage';

function getStatusTone(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-[#FEF3C7] text-[#D97706]';
    case 'completed':
      return 'bg-[#DCFCE7] text-[#16A34A]';
    case 'cancelled':
      return 'bg-[#FEE2E2] text-[#DC2626]';
    default:
      return 'bg-[#DBEAFE] text-[#2563EB]';
  }
}

export default function AccountPage() {
  const [auth, setAuth] = useState<StoredAuth | null>(null);
  const [orders, setOrders] = useState(getStoredOrders());

  useEffect(() => {
    const syncState = () => {
      setAuth(getStoredAuth());
      setOrders(getStoredOrders());
    };

    syncState();
    window.addEventListener('storage', syncState);
    window.addEventListener('vietshop-storage', syncState);

    return () => {
      window.removeEventListener('storage', syncState);
      window.removeEventListener('vietshop-storage', syncState);
    };
  }, []);

  const stats = useMemo(() => {
    const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
    const pendingOrders = orders.filter((order) => order.status === 'pending').length;
    const completedOrders = orders.filter((order) => order.status === 'completed').length;

    return [
      { label: 'Tong don', value: String(orders.length), tone: 'text-[#2563EB]' },
      { label: 'Cho xu ly', value: String(pendingOrders), tone: 'text-[#F59E0B]' },
      { label: 'Da chi tieu', value: formatCurrency(totalSpent), tone: 'text-[#EF3D32]' },
      { label: 'Da hoan tat', value: String(completedOrders), tone: 'text-[#16A34A]' },
    ];
  }, [orders]);

  const initials = auth?.user.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'VS';

  return (
    <div className="bg-[#F4F6FB]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[24px] border border-[#DDE3EE] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <div className="border-b border-[#E7ECF3] px-6 py-7 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#2563EB] text-lg font-black text-white">
                {initials}
              </div>
              <h2 className="mt-4 text-2xl font-black text-[#111827]">{auth?.user.fullName || 'Khach hang'}</h2>
              <p className="mt-1 text-sm text-[#667085]">{auth?.user.email || 'Chua dang nhap'}</p>
            </div>

            <nav className="space-y-1 py-3">
              <Link href="/account" className="flex items-center justify-between bg-[#FFF5F4] px-4 py-3 font-medium text-[#EF3D32]">
                Tong quan
              </Link>
              <Link href="/account/address" className="flex items-center justify-between px-4 py-3 font-medium text-[#111827] hover:bg-[#F8FAFC]">
                Dia chi
              </Link>
              <button
                onClick={() => {
                  clearStoredAuth();
                  setAuth(null);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-[#EF3D32] hover:bg-[#F8FAFC]"
              >
                Dang xuat
              </button>
            </nav>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[24px] bg-gradient-to-r from-[#1F66C1] to-[#2E83E6] px-6 py-6 text-white shadow-[0_18px_50px_rgba(37,99,235,0.22)]">
              <h1 className="text-3xl font-black md:text-[34px]">Xin chao, {auth?.user.fullName?.split(' ').slice(-1)[0] || 'ban'}!</h1>
              <p className="mt-2 text-base text-white/80">
                {auth?.user.createdAt ? `Thanh vien tu ${new Date(auth.user.createdAt).toLocaleDateString('vi-VN')}` : 'Dang dung tai khoan khach'}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[22px] border border-[#DDE3EE] bg-white px-5 py-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <p className={`text-3xl font-black ${stat.tone}`}>{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-[#667085]">{stat.label}</p>
                </article>
              ))}
            </div>

            <section className="overflow-hidden rounded-[24px] border border-[#DDE3EE] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between gap-4 border-b border-[#E7ECF3] px-5 py-4">
                <h2 className="text-2xl font-black text-[#111827]">Don hang gan day</h2>
                <Link href="/cart" className="text-sm font-semibold text-[#2563EB]">Tao don moi</Link>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead className="bg-[#F8FAFC] text-sm text-[#667085]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Ma don</th>
                      <th className="px-5 py-3 font-semibold">Ngay</th>
                      <th className="px-5 py-3 font-semibold">San pham</th>
                      <th className="px-5 py-3 font-semibold">Tong tien</th>
                      <th className="px-5 py-3 font-semibold">Trang thai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t border-[#EEF2F7] text-sm text-[#111827]">
                        <td className="px-5 py-4 font-semibold text-[#2563EB]">{order.orderNumber}</td>
                        <td className="px-5 py-4 text-[#667085]">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                        <td className="px-5 py-4 text-[#667085]">{order.items.length} san pham</td>
                        <td className="px-5 py-4 font-semibold">{formatCurrency(order.totalAmount)}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusTone(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {!orders.length ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-sm text-[#667085]">
                          Chua co don hang nao. Vao <Link href="/products" className="font-semibold text-[#2563EB]">danh sach san pham</Link> de mua sam.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
