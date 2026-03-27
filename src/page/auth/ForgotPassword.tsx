'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Step = 'email' | 'otp' | 'password' | 'success';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1 || !/^[0-9]*$/.test(value)) {
      return;
    }

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
      prevInput?.focus();
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      setStep('otp');
    } catch {
      setError('Khong the gui ma OTP. Vui long thu lai.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.join('').length !== 6) {
      setError('Vui long nhap du 6 chu so.');
      return;
    }

    setLoading(true);

    try {
      setStep('password');
    } catch {
      setError('Ma OTP khong chinh xac. Vui long thu lai.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Mat khau phai co it nhat 6 ky tu.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mat khau khong khop.');
      return;
    }

    setLoading(true);

    try {
      setStep('success');
    } catch {
      setError('Khong the dat lai mat khau. Vui long thu lai.');
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
          <h1 className="mb-2 text-3xl font-bold text-[#1F2937]">Quen mat khau</h1>
          <p className="text-gray-500">Chung toi se giup ban khoi phuc tai khoan</p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          {['Email', 'Xac minh', 'Mat khau'].map((label, index) => {
            const activeIndex = step === 'email' ? 0 : step === 'otp' ? 1 : 2;

            return (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${activeIndex >= index ? 'bg-[#EF3D32] text-white' : 'bg-gray-300 text-white'}`}>
                    {index + 1}
                  </div>
                  <span className="mt-1 text-xs text-gray-600">{label}</span>
                </div>
                {index < 2 ? <div className="mx-2 h-1 flex-1 bg-gray-300" /> : null}
              </React.Fragment>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          {error ? <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          {step === 'email' ? (
            <form onSubmit={handleSendEmail} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="your@email.com"
                  className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-[#1F2937] placeholder-gray-400 transition-all focus:border-[#EF3D32] focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-lg bg-[#EF3D32] font-bold text-white transition-colors hover:bg-[#D83027] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Dang gui...' : 'Gui ma xac minh'}
              </button>
            </form>
          ) : null}

          {step === 'otp' ? (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Nhap ma xac minh</label>
                <p className="mb-4 text-sm text-gray-500">Chung toi da gui ma xac minh den {email}</p>
                <div className="flex gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      maxLength={1}
                      className="h-12 w-12 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-center text-xl font-bold transition-all focus:border-[#EF3D32] focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20"
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-lg bg-[#EF3D32] font-bold text-white transition-colors hover:bg-[#D83027] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Dang xac minh...' : 'Xac minh'}
              </button>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="h-12 w-full rounded-lg border border-[#E5E7EB] font-semibold text-[#1F2937] transition-colors hover:bg-gray-50"
              >
                Quay lai
              </button>
            </form>
          ) : null}

          {step === 'password' ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Mat khau moi</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError('');
                    }}
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
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1F2937]">Xac nhan mat khau</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-[#1F2937] placeholder-gray-400 transition-all focus:border-[#EF3D32] focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? 'An' : 'Hien'}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 h-12 w-full rounded-lg bg-[#EF3D32] font-bold text-white transition-colors hover:bg-[#D83027] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Dang xu ly...' : 'Dat lai mat khau'}
              </button>
            </form>
          ) : null}

          {step === 'success' ? (
            <div className="space-y-6 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9] text-3xl text-[#16A34A]">
                ✓
              </div>
              <div>
                <h2 className="mb-2 text-2xl font-bold text-[#1F2937]">Thanh cong</h2>
                <p className="text-gray-500">Mat khau cua ban da duoc dat lai thanh cong.</p>
              </div>
              <Link
                href="/auth/login"
                className="flex h-12 items-center justify-center rounded-lg bg-[#EF3D32] font-bold text-white transition-colors hover:bg-[#D83027]"
              >
                Dang nhap ngay
              </Link>
            </div>
          ) : null}
        </div>

        {step !== 'success' ? (
          <div className="mt-4 text-center">
            <Link href="/auth/login" className="text-sm font-semibold text-[#EF3D32] transition-colors hover:text-[#D83027]">
              Quay lai dang nhap
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
