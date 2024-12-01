import { useState } from 'react';

import { css } from '@emotion/react';
import { GrLogout } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import NavigationMenu from '@/components/common/NavigationMenu';
import ProfileSection from '@/components/page/mypage/ProfileSection';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';

const InvestorMypageNav = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  // 사진이 없을때
  // const [userImage, setUserImage] = useState(null);
  const [userImage] = useState(
    'https://i.pinimg.com/474x/78/04/d7/7804d73be61366364997b925a613f438.jpg'
  );

  const InvestorMypageNavItems = [
    {
      to: `${ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS}`,
      label: '나의 관심 전략',
    },
    {
      to: `${ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST}`,
      label: '나의 문의',
    },
    {
      to: `${ROUTES.MYPAGE.INVESTOR.PROFILE}`,
      label: '프로필 관리',
    },
  ];

  const handleSignout = async () => {
    clearAuth();
    navigate(ROUTES.HOME.PATH, { replace: true });
  };

  return (
    <div css={navContainerStyle}>
      <div css={navWrapper}>
        <ProfileSection
          userImage={userImage}
          userRole='투자자'
          nickname='나는야투자자'
          desc='투자 잘해서 부자가 되는 그날까지 아자아자 화이팅이닷!!'
        />
        <NavigationMenu items={InvestorMypageNavItems} />
      </div>
      <Button variant='ghostGray' customStyle={logoutStyle} size='sm' onClick={handleSignout}>
        <GrLogout size={16} />
        <span>로그아웃</span>
      </Button>
    </div>
  );
};

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
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

const logoutStyle = css`
  width: auto;
  justify-content: flex-start;
  padding: 8px 20px;
  gap: 4px;
`;

export default InvestorMypageNav;
