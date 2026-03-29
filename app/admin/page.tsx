'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/src/services/auth.service';

const shortcuts = [
  { label: 'Quan ly san pham', href: '/admin/products', tone: 'bg-[#E0F2FE] text-[#0369A1]' },
  { label: 'Danh muc', href: '/admin/categories', tone: 'bg-[#DCFCE7] text-[#166534]' },
  { label: 'Them san pham', href: '/admin/products/create', tone: 'bg-[#FEE2E2] text-[#B91C1C]' },
];

export default function AdminDashboardPage() {
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    void getCurrentUser()
      .then((user) => {
        if (user.role === 'admin') {
          setAdminName(user.fullName);
        }
      })
      .catch(() => {
        return;
      });
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#0F766E] px-8 py-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.24)]">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">Admin Workspace</p>
        <h2 className="mt-3 text-4xl font-black">Xin chao, {adminName.split(' ').slice(-1)[0] || 'Admin'}.</h2>
        <p className="mt-3 max-w-2xl text-sm text-white/80">
          Day la khu vuc quan tri. Ban co the quan ly san pham, danh muc va cac module khac tu menu ben trai.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {shortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-[24px] px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 ${item.tone}`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">Shortcut</p>
            <h3 className="mt-2 text-2xl font-black">{item.label}</h3>
          </Link>
        ))}
      </section>

      <section className="rounded-[24px] border border-[#D9E0EC] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <h3 className="text-xl font-black text-[#111827]">Trang thai</h3>
        <p className="mt-3 text-sm text-[#667085]">
          Redirect sau login cho tai khoan `admin` da duoc noi vao route `/admin`. Guard role cung da duoc bat o layout admin.
        </p>
      </section>
    </div>
  );
}
=======
import Sidebar from "@/src/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar cố định */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Nội dung chính */}
      <div className="ml-64 flex-1 bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm">Admin</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Nội dung */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
