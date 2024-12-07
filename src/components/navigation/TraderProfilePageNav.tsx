import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

import NavigationMenu from '@/components/common/NavigationMenu';
import ProfileSection from '@/components/page/mypage/ProfileSection';
import { ROUTES } from '@/constants/routes';
import { useProfileImage } from '@/hooks/queries/useProfileImage';
import { useSidebarProfileQuery } from '@/hooks/queries/useSidebarProfile';
import theme from '@/styles/theme';

const TraderProfileNav = () => {
  const { traderId } = useParams();
  const { data: profileImageData } = useProfileImage(traderId || ''); // 프로필 이미지 가져오기
  const imageSrc = profileImageData?.fileUrl;
  const { data: profileData } = useSidebarProfileQuery(traderId);

  const TraderMyPageNavItems = [
    {
      to: `${ROUTES.TRADER.PROFILE(String(traderId))}`,
      label: '나의 전략',
    },
  ];

  return (
    <div css={navContainerStyle}>
      <div css={navWrapper}>
        <ProfileSection
          userImage={imageSrc}
          userRole={profileData?.data.memberType === 'TRADER' ? '트레이더' : '투자자'}
          nickname={profileData?.data.nickname || ''}
          desc={profileData?.data.introduction || ''}
        />
        <NavigationMenu items={TraderMyPageNavItems} />
      </div>
    </div>
  );
};

const navContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: calc(100vh - 300px);
`;

const navWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 48px 20px;
  width: 305px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

export default TraderProfileNav;
