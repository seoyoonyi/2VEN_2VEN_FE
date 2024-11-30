import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import TraderMyPageNav from '@/components/navigation/TraderMyPageNav';
import theme from '@/styles/theme';

const TraderMyPageLayout = () => (
  <div css={wrapperStyle}>
    <Header />
    <main css={mainStyle}>
      <TraderMyPageNav />
      <Outlet />
    </main>
    <Footer />
  </div>
);

const wrapperStyle = css`
  min-height: 100vh;
  background-color: ${theme.colors.gray[100]};
  header {
    background-color: ${theme.colors.main.white};
  }
`;

const mainStyle = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 76px 0;
`;

export default TraderMyPageLayout;
