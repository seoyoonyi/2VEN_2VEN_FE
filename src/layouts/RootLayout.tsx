import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const RootLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default RootLayout;
