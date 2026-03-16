'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Step = 'email' | 'otp' | 'password' | 'success';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(0);

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  // Handle backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  // Step 1: Send email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Gọi API gửi OTP
      console.log('Send OTP to:', email);
      setStep('otp');
      setTimer(300); // 5 minutes
    } catch (err) {
      setError('Không thể gửi mã OTP. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Vui lòng nhập đủ 6 chữ số');
      return;
    }

    setLoading(true);

    try {
      // TODO: Gọi API xác minh OTP
      console.log('Verify OTP:', otpCode);
      setStep('password');
    } catch (err) {
      setError('Mã OTP không chính xác. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    setLoading(true);

    try {
      // TODO: Gọi API reset password
      console.log('Reset password for:', email);
      setStep('success');
    } catch (err) {
      setError('Không thể đặt lại mật khẩu. Vui lòng thử lại.');
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
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Quên mật khẩu</h1>
          <p className="text-gray-500">Chúng tôi sẽ giúp bạn khôi phục tài khoản</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full grid place-items-center font-bold text-sm ${
              ['email', 'otp', 'password', 'success'].indexOf(step) >= 0
                ? 'bg-[#EF3D32] text-white'
                : 'bg-gray-300 text-white'
            }`}>
              1
            </div>
            <span className="text-xs text-gray-600 mt-1">Email</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-300" />
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full grid place-items-center font-bold text-sm ${
              ['otp', 'password', 'success'].indexOf(step) >= 0
                ? 'bg-[#EF3D32] text-white'
                : 'bg-gray-300 text-white'
            }`}>
              2
            </div>
            <span className="text-xs text-gray-600 mt-1">Xác minh</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-300" />
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full grid place-items-center font-bold text-sm ${
              ['password', 'success'].indexOf(step) >= 0
                ? 'bg-[#EF3D32] text-white'
                : 'bg-gray-300 text-white'
            }`}>
              3
            </div>
            <span className="text-xs text-gray-600 mt-1">Mật khẩu</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <form onSubmit={handleSendEmail} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Email hoặc số điện thoại</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="your@email.com"
                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#EF3D32] hover:bg-[#D83027] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang gửi...' : 'Gửi mã xác minh'}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Nhập mã xác minh</label>
                <p className="text-sm text-gray-500 mb-4">Chúng tôi đã gửi mã xác minh đến {email}</p>
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
                      className="w-12 h-12 text-center text-xl font-bold rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#EF3D32] hover:bg-[#D83027] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang xác minh...' : 'Xác minh'}
              </button>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full h-12 border border-[#E5E7EB] text-[#1F2937] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Quay lại
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 'password' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Mật khẩu mới</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError('');
                    }}
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
                <p className="text-xs text-gray-500 mt-1">Tối thiểu 6 ký tự</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Xác nhận mật khẩu</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3D32]/20 focus:border-[#EF3D32] transition-all"
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
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#EF3D32] hover:bg-[#D83027] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
              </button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E8F5E9] rounded-full">
                <span className="text-3xl">✓</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Thành công!</h2>
                <p className="text-gray-500">Mật khẩu của bạn đã được đặt lại thành công</p>
              </div>
              <Link
                href="/auth/login"
                className="block h-12 bg-[#EF3D32] hover:bg-[#D83027] text-white font-bold rounded-lg transition-colors flex items-center justify-center"
              >
                Đăng nhập ngay
              </Link>
            </div>
          )}
        </div>

        {/* Footer Link */}
        {step !== 'success' && (
          <div className="mt-4 text-center">
            <Link href="/auth/login" className="text-sm text-[#EF3D32] hover:text-[#D83027] font-semibold transition-colors">
              Quay lại đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;