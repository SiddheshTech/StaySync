import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const sidebarRoutes = ['/dashboard', '/profile', '/messages', '/applications', '/billing', '/help', '/student', '/admin'];
  const brandBarRoutes = ['/search', '/listing', '/create-listing'];
  const hideChrome = sidebarRoutes.some((prefix) => pathname.startsWith(prefix));
  const hasBrandBar = brandBarRoutes.some((prefix) => pathname.startsWith(prefix));
  const showHeaderFooter = !hideChrome && !hasBrandBar;
  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && <Header />}
      <main className={showHeaderFooter ? 'flex-1 pt-16' : 'flex-1'}>
        {children}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;