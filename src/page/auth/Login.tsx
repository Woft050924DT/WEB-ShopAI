'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login, normalizeApiError } from '@/src/lib/api';
import { setStoredAddress, setStoredAuth } from '@/src/lib/storage';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData);

      setStoredAuth({
        token: response.token,
        user: response.user,
      });

      setStoredAddress({
        fullName: response.user.fullName,
        email: response.user.email,
        phone: '',
        line1: '',
        line2: '',
        city: '',
        district: '',
        ward: '',
        postalCode: '',
        country: 'Vietnam',
        notes: '',
      });

      router.push('/account');
    } catch (err) {
      setError(normalizeApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F5F6FA] to-[#FFFFFF] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#EF3D32] text-xl text-white">V</div>
            <span className="text-2xl font-bold text-[#1F2937]">VietShop</span>
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-[#1F2937]">Dang nhap</h1>
          <p className="text-gray-500">Chao mung quay lai VietShop</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-8 shadow-lg">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-[#1F2937] placeholder-gray-400 transition-all focus:border-[#EF3D32] focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Mat khau</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-[#1F2937] placeholder-gray-400 transition-all focus:border-[#EF3D32] focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'An' : 'Hien'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#EF3D32]" />
              <span className="text-sm text-gray-600">Ghi nho toi</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm font-semibold text-[#EF3D32] transition-colors hover:text-[#D83027]">
              Quen mat khau?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-12 w-full rounded-lg bg-[#EF3D32] font-bold text-white transition-colors hover:bg-[#D83027] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Dang xu ly...' : 'Dang nhap'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Chua co tai khoan?{' '}
            <Link href="/auth/register" className="font-bold text-[#EF3D32] transition-colors hover:text-[#D83027]">
              Dang ky ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
