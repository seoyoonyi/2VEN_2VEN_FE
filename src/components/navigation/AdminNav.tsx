import { css } from '@emotion/react';

import NavigationMenu from '../common/NavigationMenu';

import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const AdminNav = () => {
  const TraderMyPageNavItems = [
    {
      to: `${ROUTES.ADMIN.STRATEGY.APPROVAL}`,
      label: '전략승인관리',
      notificationCount: 1,
    },
    {
      to: `${ROUTES.ADMIN.STOCK_TYPE.LIST}`,
      label: '상품유형관리',
    },
    {
      to: `${ROUTES.ADMIN.TRADING_TYPE.LIST}`,
      label: '매매유형관리',
    },
  ];

  return (
    <div css={navContainerStyle}>
      <NavigationMenu items={TraderMyPageNavItems} />
    </div>
  );
};

const navContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 48px 20px;
  width: 305px;
  height: 285px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

export default AdminNav;
