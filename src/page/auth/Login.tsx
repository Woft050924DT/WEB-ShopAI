'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      // TODO: Gọi API đăng nhập
      console.log('Login with:', formData);
      // router.push('/dashboard');
      setError('Tính năng này sắp ra mắt!');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] to-[#FFFFFF] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#EF3D32] rounded-lg grid place-items-center text-white text-xl">⚡</div>
            <span className="text-2xl font-bold text-[#1F2937]">VietShop</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Đăng nhập</h1>
          <p className="text-gray-500">Chào mừng quay lại VietShop</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">Email hoặc số điện thoại</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#EF3D32]" />
              <span className="text-sm text-gray-600">Ghi nhớ tôi</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm font-semibold text-[#EF3D32] hover:text-[#D83027] transition-colors">
              Quên mật khẩu?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#EF3D32] hover:bg-[#D83027] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-[#F5F6FA] to-[#FFFFFF] text-gray-500">Hoặc tiếp tục với</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="h-12 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700 flex items-center justify-center gap-2">
            <span className="text-xl">f</span> Facebook
          </button>
          <button className="h-12 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700 flex items-center justify-center gap-2">
            <span className="text-xl">G</span> Google
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/auth/register" className="font-bold text-[#EF3D32] hover:text-[#D83027] transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;