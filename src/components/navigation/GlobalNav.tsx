import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

const GlobalNav = () => (
  <nav css={navStyle}>
    <ul>
      <li>
        <Link to={ROUTES.STRATEGY.LIST}>전략</Link>
      </li>
      <li>
        <Link to={ROUTES.TRADER.LIST}>트레이더</Link>
      </li>
    </ul>
  </nav>
);

const navStyle = css`
  display: flex;
  ul {
    display: flex;
    gap: 24px;
  }
`;

export default GlobalNav;
