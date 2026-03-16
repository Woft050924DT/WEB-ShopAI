import type { Metadata } from 'next';
import './globals.css';
import Header from '@/src/layout/Header/Header';
import Sidebar from '@/src/layout/Sidebar/Sidebar';
import Footer from '@/src/layout/Footer/Footer';

export const metadata: Metadata = {
  title: 'VietShop',
  description: 'Cửa hàng trực tuyến VietShop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#F5F6FA] text-[#212121] min-h-screen antialiased">
        <Header />
        <Sidebar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
