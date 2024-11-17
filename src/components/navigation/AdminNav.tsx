import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const AdminNav = () => (
  <div css={navWrapper}>
    <ul css={navStyle}>
      <li css={navMenu}>
        <Link to={`${ROUTES.ADMIN.STRATEGY.APPROVAL}`}>전략승인관리</Link>
      </li>
      <li css={navMenu}>
        <Link to={`${ROUTES.ADMIN.STOCK_TYPE.LIST}`}>상품유형관리</Link>
      </li>
      <li css={navMenu}>
        <Link to={`${ROUTES.ADMIN.TRADING_TYPE.LIST}`}>매매유형관리</Link>
      </li>
    </ul>
  </div>
);

const navWrapper = css`
  display: flex;
  padding: 48px 20px;
  width: 305px;
  height: 285px;
  gap: 8px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;
const navStyle = css`
  display: flex;
  flex-direction: column;
`;
const navMenu = css`
  display: flex;
  width: 265px;
  padding: 20px;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: ${theme.colors.gray[500]};
  ${theme.typography.fontWeight.bold};
  ${theme.typography.lineHeights.sm};

  &:hover {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.main.black};
  }
`;

export default AdminNav;
