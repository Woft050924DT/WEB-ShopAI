'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getStoredAddress, getStoredAuth, setStoredAddress, type StoredAddress } from '@/src/lib/storage';

function getInitialFormData(): StoredAddress {
  const auth = getStoredAuth();
  const address = getStoredAddress();

  return {
    ...address,
    fullName: address.fullName || auth?.user.fullName || '',
    email: address.email || auth?.user.email || '',
  };
}

export default function AddressPage() {
  const [formData, setFormData] = useState<StoredAddress>(getInitialFormData);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setSuccessMessage('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStoredAddress(formData);
    setSuccessMessage('Da luu thong tin giao hang.');
  };

  return (
    <div className="bg-[#F4F6FB]">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#111827]">Dia chi giao hang</h1>
            <p className="mt-2 text-sm text-[#667085]">Thong tin nay se duoc dien san trong trang gio hang va checkout.</p>
          </div>
          <Link href="/account" className="text-sm font-semibold text-[#2563EB]">Ve tai khoan</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-[28px] border border-[#DDE3EE] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Ho va ten</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1F2937]">So dien thoai</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Quoc gia</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Dia chi</label>
            <input
              name="line1"
              value={formData.line1}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Dia chi bo sung</label>
            <input
              name="line2"
              value={formData.line2}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Thanh pho</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Quan/Huyen</label>
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Phuong/Xa</label>
              <input
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Ma buu chinh</label>
              <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Ghi chu giao hang</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          {successMessage ? <p className="text-sm text-[#16A34A]">{successMessage}</p> : null}

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="h-12 rounded-2xl bg-[#EF3D32] px-6 font-bold text-white">
              Luu dia chi
            </button>
            <Link href="/cart" className="flex h-12 items-center rounded-2xl border border-[#D6DDE8] px-6 font-semibold text-[#2563EB]">
              Den gio hang
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
