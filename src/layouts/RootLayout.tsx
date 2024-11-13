import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import { usePageHeader } from '@/hooks/usePageHeader';
import theme from '@/styles/theme';

const RootLayout = () => {
  const currentHeader = usePageHeader();

  return (
    <div>
      <Header />
      {currentHeader && <PageHeader title={currentHeader.title} desc={currentHeader.desc} />}
      <main css={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const mainStyle = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
`;

export default RootLayout;
