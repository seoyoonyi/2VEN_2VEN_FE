import { useState } from 'react';

import { css } from '@emotion/react';
import { GrLogout } from 'react-icons/gr';

import Button from '@/components/common/Button';
import NavigationMenu from '@/components/common/NavigationMenu';
import ProfileSection from '@/components/page/mypage/ProfileSection';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const TraderMyPageNav = () => {
  // 사진이 없을때
  // const [userImage, setUserImage] = useState(null);
  const [userImage] = useState(
    'https://i.pinimg.com/736x/2b/4c/91/2b4c913711c4a8be893aa873b3b23193.jpg'
  );

  const TraderMyPageNavItems = [
    {
      to: `${ROUTES.MYPAGE.TRADER.STRATEGIES.LIST}`,
      label: '나의 전략',
    },
    {
      to: `${ROUTES.MYPAGE.TRADER.INQUIRIES.LIST}`,
      label: '문의 관리',
    },
    {
      to: `${ROUTES.MYPAGE.TRADER.PROFILE}`,
      label: '프로필 관리',
    },
  ];

  return (
    <div css={navContainerStyle}>
      <div css={navWrapper}>
        <ProfileSection
          userImage={userImage}
          userRole='트레이더'
          nickname='내가여기서투자짱'
          desc='주도주로 매매하면 수익은 크고 손실은 작다! 믿는 종목에 발등 찍힌다.'
        />
        <NavigationMenu items={TraderMyPageNavItems} />
      </div>
      <Button variant='ghostGray' customStyle={logoutStyle} size='sm'>
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

export default TraderMyPageNav;
