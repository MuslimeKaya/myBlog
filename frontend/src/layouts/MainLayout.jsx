import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import useScrollToTop from '../hooks/useScrollToTop';

const MainLayout = () => {
  useScrollToTop();

  return (
    <div className="main-layout">
      <SEO title="Ana Sayfa" />
      <Header />
      <div className="page-wrapper">
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;