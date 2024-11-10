import { css } from '@emotion/react';

const GlobalNav = () => (
  <nav css={navStyle}>
    <ul>
      <li>전략</li>
      <li>트레이더</li>
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
