import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import CategoryList from '../components/blog/CategoryList';
import useScrollToTop from '../hooks/useScrollToTop';

const BlogLayout = () => {
  useScrollToTop();
  
  return (
    <div className="blog-layout">
      <SEO title="Blog" />
      <Header />
      <div className="blog-container">
        <aside className="sidebar">
          <CategoryList />
        </aside>
        <main className="blog-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogLayout;