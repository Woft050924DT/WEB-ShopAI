'use client';

import Link from 'next/link';

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2563EB]">Products</p>
          <h2 className="mt-2 text-3xl font-black text-[#111827]">Quan ly san pham</h2>
        </div>
        <Link
          href="/admin/products/create"
          className="rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0B1220]"
        >
          Them san pham
        </Link>
      </div>

      <div className="rounded-[24px] border border-[#D9E0EC] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="text-sm text-[#667085]">
          Khu vuc danh sach san pham admin da san sang cho ban noi tiep API CRUD sau.
        </p>
      </div>
    </div>
  );
}
