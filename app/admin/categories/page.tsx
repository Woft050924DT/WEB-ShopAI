'use client';

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2563EB]">Categories</p>
      <h2 className="text-3xl font-black text-[#111827]">Quan ly danh muc</h2>
      <div className="rounded-[24px] border border-[#D9E0EC] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <p className="text-sm text-[#667085]">
          Trang danh muc admin da duoc tao de login role `admin` co dich den giao dien quan tri hop le.
        </p>
      </div>
    </div>
  );
}
