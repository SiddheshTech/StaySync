import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const hideChrome = pathname === '/dashboard';
  return (
    <div className="min-h-screen flex flex-col">
      {!hideChrome && <Header />}
      <main className={hideChrome ? 'flex-1' : 'flex-1 pt-16'}>
        {children}
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
};

export default Layout;