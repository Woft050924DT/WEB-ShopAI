import Header from '@/src/layout/Header/Header';
import Sidebar from '@/src/layout/Sidebar/Sidebar';
import Footer from '@/src/layout/Footer/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
