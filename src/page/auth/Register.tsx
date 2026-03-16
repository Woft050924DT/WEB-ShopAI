'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

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
    setError('');

    // Validation
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (!agreedTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    setLoading(true);

    try {
      // TODO: Gọi API đăng ký
      console.log('Register with:', formData);
      // router.push('/auth/login');
      setError('Tính năng này sắp ra mắt!');
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
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
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Đăng ký</h1>
          <p className="text-gray-500">Tạo tài khoản để bắt đầu mua sắm</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
              className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
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
            <p className="text-xs text-gray-500 mt-1">Tối thiểu 6 ký tự</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">Xác nhận mật khẩu</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 mt-4">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#EF3D32] cursor-pointer"
            />
            <span className="text-sm text-gray-600">
              Tôi đồng ý với{' '}
              <Link href="#" className="text-[#EF3D32] hover:underline">
                Điều khoản sử dụng
              </Link>
              {' '}và{' '}
              <Link href="#" className="text-[#EF3D32] hover:underline">
                Chính sách bảo mật
              </Link>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-[#EF3D32] hover:bg-[#D83027] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Đã có tài khoản?{' '}
            <Link href="/auth/login" className="font-bold text-[#EF3D32] hover:text-[#D83027] transition-colors">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;