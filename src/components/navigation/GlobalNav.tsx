import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';
import { isAdminUser } from '@/types/auth';
import { withOpacity } from '@/utils/color';

const GlobalNav = () => {
  const { user } = useAuthStore();
  const { adminAuth } = useAdminAuthStore();
  const isAdmin = user && isAdminUser(user); // 사용자의 role이 ROLE_ADMIN인지 확인
  const isAuthorizedAdmin = adminAuth?.is_authorized; // 사용자가 ROLE_ADMIN이고 adminAuth의 is_authorized가 true인지 확인

  return (
    <nav css={navStyle}>
      <ul>
        <li>
          <Link to={ROUTES.STRATEGY.LIST}>전략</Link>
        </li>
        <li>
          <Link to={ROUTES.TRADER.LIST}>트레이더</Link>
        </li>
        {isAdmin && (
          <li css={!isAuthorizedAdmin && disabledLinkStyle}>
            <Link
              to={isAuthorizedAdmin ? ROUTES.ADMIN.STRATEGY.APPROVAL : '#'}
              onClick={(e) => {
                if (!isAuthorizedAdmin) {
                  e.preventDefault();
                }
              }}
              title={!isAuthorizedAdmin ? '관리자 인증이 필요합니다.' : ''}
            >
              관리자
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

const navStyle = css`
  display: flex;
  ul {
    display: flex;
    gap: 24px;
  }
`;

const disabledLinkStyle = css`
  a {
    color: ${withOpacity.disabled(theme.colors.main.black)};
    cursor: not-allowed;
    pointer-events: none;
  }
`;
export default GlobalNav;
