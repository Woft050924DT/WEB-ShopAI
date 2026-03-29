import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Xác thực - VietShop',
  description: 'Đăng nhập, đăng ký, quên mật khẩu VietShop',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#F5F6FA] text-[#212121] antialiased">{children}</div>;
}
