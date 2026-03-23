import Header from '@/src/layout/Header/Header';
import Sidebar from '@/src/layout/Sidebar/Sidebar';
import Footer from '@/src/layout/Footer/Footer';
import ShopHomePage from './(shop)/page';

export default function HomePage() {
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <ShopHomePage />
      </main>
      <Footer />
    </>
  );
}
