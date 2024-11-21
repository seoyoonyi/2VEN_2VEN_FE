import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import theme from '@/styles/theme';

interface NavMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  to: string;
  label: string;
  isActive: boolean;
  notificationCount?: number;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({ to, label, isActive, notificationCount }) => (
  <li css={[navMenuStyle, isActive && activeMenuStyle]}>
    <Link to={to}>
      <span>{label}</span>
      {notificationCount && notificationCount > 0 ? (
        <span css={badgeStyle}>{notificationCount}</span>
      ) : null}
    </Link>
  </li>
);

const navMenuStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 265px;
  font-size: 18px;
  color: ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.sm};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.main.black};
  }

  a {
    padding: 20px;
    width: 100%;
    height: 100%;
  }
`;

const activeMenuStyle = css`
  background-color: ${theme.colors.gray[50]};
  color: ${theme.colors.main.black};
`;

const badgeStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  padding: 0 6px;
  height: 20px;
  min-width: 20px;
  font-size: 12px;
  font-weight: bold;
  color: ${theme.colors.main.white};
  background-color: ${theme.colors.main.alert};
  border-radius: 10px;
  line-height: 1;
`;

export default NavMenuItem;
