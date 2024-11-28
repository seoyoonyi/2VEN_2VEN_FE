import { useEffect } from 'react';

import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

import defaultImage from '@/assets/images/default_avatar.png';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import GlobalNav from '@/components/navigation/GlobalNav';
import SearchInput from '@/components/page/search/SearchInput';
import AdminSessionTimer from '@/components/page/signup/AdminSessionTimer';
import { ROUTES } from '@/constants/routes';
import { useFetchProfileImage } from '@/hooks/queries/useFetchPofileImage';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';
import { isAdminUser } from '@/types/auth';
const Header = () => {
  const LOGO = 'SYSMETIC';
  const { user } = useAuthStore();
  console.log('Current user:', user); // user 객체 전체 확인
  console.log('Profile image ID:', user?.profile_image); // 프로필 이미지 ID 확인
  console.log('Member ID:', user?.member_id); // 회원 ID 확인
  const {
    data: base64Image,
    isError,
    error,
    isSuccess,
  } = useFetchProfileImage(user?.profile_image || null, user?.member_id || null);
  const { adminAuth } = useAdminAuthStore();
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    if (isError) {
      console.error('Error fetching profile image:', error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      console.log('Profile image fetched successfully:', base64Image);
    }
  }, [isSuccess, base64Image]);
  // const isAdminRoute = location.pathname.startsWith('/admin'); // /admin으로 시작하는 경로인지 확인
  // const isAdmin = user?.role === 'MEMBER_ROLE_ADMIN'; // 사용자의 role이 ROLE_ADMIN인지 확인
  // const isAuthorizedAdmin = isAdmin && adminAuth?.is_authorized; // 사용자가 ROLE_ADMIN이고 adminAuth의 is_authorized가 true인지 확인

  const handleButtonClick = (value: string) => {
    console.log(value);
  };
  const handleLoginButtonClick = () => {
    navigate(ROUTES.AUTH.SIGNIN);
  };
  const handleAdminAuthButtonClick = () => {
    navigate(ROUTES.AUTH.ADMIN.VERIFY);
  };

  const renderRightSection = () => {
    // 비로그인 상태
    if (!user) {
      return (
        <>
          <div css={searchAndMyPageContainer}>
            <SearchInput onSearchSubmit={handleButtonClick} />
            <Button variant='secondary' size='xs' width={100} onClick={handleLoginButtonClick}>
              로그인
            </Button>
          </div>
        </>
      );
    }

    // 관리자로 로그인한 경우
    if (isAdminUser(user)) {
      return (
        <div css={searchAndMyPageContainer}>
          <SearchInput onSearchSubmit={handleButtonClick} />
          {!adminAuth?.is_authorized ? (
            <Button variant='accent' size='xs' width={100} onClick={handleAdminAuthButtonClick}>
              관리자 인증
            </Button>
          ) : (
            <Link to={ROUTES.AUTH.ADMIN.VERIFY}>
              <AdminSessionTimer />
            </Link>
          )}
        </div>
      );
    }

    // 투자자, 트레이더로 로그인한 경우
    return (
      <>
        <div css={searchAndMyPageContainer}>
          <SearchInput onSearchSubmit={handleButtonClick} />
          <Link
            to={
              user.role === 'ROLE_INVESTOR'
                ? ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS
                : ROUTES.MYPAGE.TRADER.STRATEGIES.LIST
            }
          >
            <Avatar
              src={base64Image ? `data:image/png;base64,${base64Image}` : defaultImage}
              alt={user.nickname}
            />
          </Link>
        </div>
      </>
    );
  };

  return (
    <header css={headerStyle}>
      <div css={containerStyle}>
        <div css={logoNavContainerStyle}>
          <h1>
            <Link to={ROUTES.HOME.PATH}>
              <img src='/logo.svg' alt={LOGO} />
            </Link>
          </h1>
          <GlobalNav />
        </div>
        <div>
          {/* 스타일수정 필요 */}
          {renderRightSection()}
        </div>
      </div>
    </header>
  );
};

const headerStyle = css`
  height: 95px;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${theme.layout.width.content};
  height: 100%;
  padding: 0px 20px;
  margin: 0 auto;
`;

const logoNavContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 47px;
`;

const searchAndMyPageContainer = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export default Header;
