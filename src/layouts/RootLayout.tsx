import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import theme from '@/styles/theme';

const RootLayout = () => (
  <div css={wrapperStyle}>
    <Header />
    <main css={mainStyle}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default RootLayout;

const wrapperStyle = css`
  min-height: 100vh;
`;
const mainStyle = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
`;
