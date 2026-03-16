import type { Metadata } from 'next';
import './globals.css';
import Header from '@/src/layout/Header/Header';

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
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
