import { css } from '@emotion/react';
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import GlobalNav from '@/components/navigation/GlobalNav';
import SearchInput from '@/components/page/search/SearchInput';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const Header = () => {
  const LOGO = 'SYSMETIC';

  const handleButtonClick = (value: string) => {
    console.log(value);
  };

  return (
    <header css={headerStyle}>
      <div css={containerStyle}>
        <div css={logoNavContainerStyle}>
          <h1>
            <Link to={ROUTES.HOME.PATH}>
              <img src='/logo.svg' alt={LOGO} />
            </Link>
          </h1>
          <GlobalNav />
        </div>
        <div css={searchAndMyPageContainer}>
          <SearchInput onSearch={handleButtonClick} />
          <Link to={ROUTES.MYPAGE.TRADER.STRATEGIES.LIST} css={myPageStyle}>
            <BsPerson size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

const headerStyle = css`
  height: 95px;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${theme.layout.width.content};
  height: 100%;
  padding: 0px 20px;
  margin: 0 auto;
`;

const logoNavContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 47px;
`;

const searchAndMyPageContainer = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const myPageStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export default Header;
