import { css } from '@emotion/react';
import { GrLogout } from 'react-icons/gr';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const InvestorMypageNav = () => (
  <nav css={navContainerStyle}>
    <div css={navWrapper}>
      <div css={profileWrapper}>
        <img
          src='https://i.pinimg.com/474x/78/04/d7/7804d73be61366364997b925a613f438.jpg'
          alt='프로필사진'
        />
        <div css={roleStyle}>투자자</div>
        <div css={nicknameStyle}>내가여기서투자짱</div>
        <span css={descStyle}>투자 잘해서 부자가 되는 근라까지 아자아자 홧티이닷!!</span>
      </div>
      <nav>
        <ul>
          <Link to={`${ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS}`}>
            <li css={navMenu}>나의 관심 전략</li>
          </Link>
          <Link to={`${ROUTES.MYPAGE.INVESTOR.MYINQUIRY}`}>
            <li css={navMenu}>나의 문의</li>
          </Link>
          <Link to={`${ROUTES.MYPAGE.INVESTOR.PROFILE}`}>
            <li css={navMenu}>프로필 관리</li>
          </Link>
        </ul>
      </nav>
    </div>
    <div css={logoutWrapper}>
      <GrLogout size={16} />
      <span>로그아웃</span>
    </div>
  </nav>
);

const navContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const navWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 48px 20px;
  width: 305px;
  gap: 48px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

const profileWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 24px;
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

export default InvestorMypageNav;
