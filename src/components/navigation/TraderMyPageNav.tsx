import { css } from '@emotion/react';
import { GrLogout } from 'react-icons/gr';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const TraderMyPageNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav>
      <div css={navWrapper}>
        <div css={profileWrapper}>
          <div css={profileImageStyle}>
            <img
              src='https://i.pinimg.com/736x/2b/4c/91/2b4c913711c4a8be893aa873b3b23193.jpg'
              alt='프로필사진'
            />
          </div>
          <div css={roleStyle}>트레이더</div>
          <div css={nicknameStyle}>내가여기서투자짱</div>
          <span css={descStyle}>
            주도주로 매매하면 수익은 크고 손실은 작다! 믿는 종목에 발등 찍힌다.
          </span>
        </div>
        <nav>
          <ul>
            <li css={[navMenu, isActive(ROUTES.MYPAGE.TRADER.STRATEGIES.LIST) && activeMenuStyle]}>
              <Link to={`${ROUTES.MYPAGE.TRADER.STRATEGIES.LIST}`}>나의 전략</Link>
            </li>
            <li css={[navMenu, isActive(ROUTES.MYPAGE.TRADER.INQUIRIES) && activeMenuStyle]}>
              <Link to={`${ROUTES.MYPAGE.TRADER.INQUIRIES}`}>문의 관리</Link>
            </li>
            <li css={[navMenu, isActive(ROUTES.MYPAGE.TRADER.PROFILE) && activeMenuStyle]}>
              <Link to={`${ROUTES.MYPAGE.TRADER.PROFILE}`}>프로필 관리</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div css={logoutWrapper}>
        <GrLogout size={16} />
        <span>로그아웃</span>
      </div>
    </nav>
  );
};

// const navContainerStyle = css`
//   display: flex;
//   flex-direction: column;
//   gap: 32px;
// `;

const navWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 48px 20px;
  margin-bottom: 32px;
  width: 305px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

const profileWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
`;

const profileImageStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 24px;
  overflow: hidden;
  background-color: ${theme.colors.gray[300]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const roleStyle = css`
  display: flex;
  padding: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 130%;
  color: ${theme.colors.teal[700]};
  background-color: ${theme.colors.teal[50]};
  margin-bottom: 8px;
`;

const nicknameStyle = css`
  color: ${theme.colors.main.black};
  font-size: 24px;
  font-weight: 700;
  line-height: 140%;
  margin-bottom: 8px;
`;

const descStyle = css`
  text-align: center;
  width: 225px;
  font-weight: 400;
  color: ${theme.colors.gray[700]};
`;

const navMenu = css`
  display: flex;
  width: 265px;
  padding: 20px;
  align-items: center;
  gap: 8px;
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
    width: 100%;
    height: 100%;
  }
`;

const activeMenuStyle = css`
  background-color: ${theme.colors.gray[50]};
  color: ${theme.colors.main.black};
`;

const logoutWrapper = css`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  gap: 4px;
  color: ${theme.colors.gray[400]};

  span {
    font-size: 14px;
    font-weight: 700;
    line-height: 130%;
    cursor: pointer;
  }
`;

export default TraderMyPageNav;
